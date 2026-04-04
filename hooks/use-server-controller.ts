import { useState, useEffect, useRef, useCallback } from "react";

export type ServerStatus = "Offline" | "Starting" | "Online" | "Checking";

const POLL_INTERVAL_MS = 10_000;

// All Lambda calls go through our Next.js proxy → no CORS, no browser restrictions
async function fetchEc2Status(): Promise<"running" | "stopped" | "pending" | "stopping"> {
  const res = await fetch("/api/ec2?action=status", { cache: "no-store" });
  if (!res.ok) throw new Error(`EC2 status API returned ${res.status}`);
  const data = await res.json();
  // Lambda returns { "state": "running" | "stopped" | "pending" | ... }
  const state: string = (data.state ?? "").toLowerCase();
  if (state.includes("running")) return "running";
  if (state.includes("pending")) return "pending";
  if (state.includes("stopping")) return "stopping";
  return "stopped";
}

async function fetchMcStatus(): Promise<{ online: boolean; playersOnline: number; maxPlayers: number; players: any[] }> {
  const res = await fetch("/api/mc-status", { cache: "no-store" });
  if (!res.ok) throw new Error(`MC Status API returned ${res.status}`);
  const data = await res.json();
  return {
    online: !!data.online,
    playersOnline: data.playersOnline ?? 0,
    maxPlayers: data.maxPlayers ?? 5,
    players: data.players ?? [],
  };
}

export function useServerController() {
  const [serverStatus, setServerStatus] = useState<ServerStatus>("Checking");
  const [playersOnline, setPlayersOnline] = useState(0);
  const [maxPlayers, setMaxPlayers] = useState(20);
  const [players, setPlayers] = useState<any[]>([]);
  const [actionLoading, setActionLoading] = useState(true);

  const isMounted = useRef(true);

  const pollStatus = useCallback(async () => {
    try {
      let ec2Status: "running" | "stopped" | "pending" | "stopping";

      try {
        ec2Status = await fetchEc2Status();
        console.log("[poll] EC2 state:", ec2Status);
      } catch (err) {
        console.warn("[poll] EC2 proxy unreachable:", err);
        // Proxy is our own Next.js server — if this fails something is very wrong,
        // but default to Offline so UI doesn't hang on "Checking"
        ec2Status = "stopped";
      }

      if (!isMounted.current) return;

      // AWS EC2 state is sole source of truth for server status
      if (ec2Status === "stopped" || ec2Status === "stopping") {
        setServerStatus("Offline");
        setPlayersOnline(0);
        return;
      }

      if (ec2Status === "pending") {
        setServerStatus("Starting");
        setPlayersOnline(0);
        return;
      }

      if (ec2Status === "running") {
        setServerStatus("Online");

        // craftping is used ONLY for player count — never for server status
        try {
          const mc = await fetchMcStatus();
          console.log("[poll] craftping:", mc);
          if (!isMounted.current) return;
          setPlayersOnline(mc.online ? mc.playersOnline : 0);
          setMaxPlayers(mc.maxPlayers);
          setPlayers(mc.online ? mc.players : []);
        } catch (mcErr) {
          console.warn("[poll] craftping failed (server still Online):", mcErr);
          if (isMounted.current) {
            setPlayersOnline(0);
            setPlayers([]);
          }
        }
      }
    } finally {
      if (isMounted.current) setActionLoading(false);
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    pollStatus();
    const id = setInterval(pollStatus, POLL_INTERVAL_MS);
    return () => {
      isMounted.current = false;
      clearInterval(id);
    };
  }, [pollStatus]);

  const startServer = async () => {
    if (serverStatus === "Online" || serverStatus === "Starting") return;
    try {
      setActionLoading(true);
      setServerStatus("Starting");
      await fetch("/api/ec2?action=start", { cache: "no-store" });
      // Poll after 3s to catch the state transition from pending → running
      setTimeout(pollStatus, 3000);
    } catch (err) {
      console.error("Failed to start server:", err);
      setActionLoading(false);
    }
  };

  const stopServer = async () => {
    if (serverStatus === "Offline" || serverStatus === "Starting") return;
    try {
      setActionLoading(true);
      await fetch("/api/ec2?action=stop", { cache: "no-store" });
      setTimeout(pollStatus, 3000);
    } catch (err) {
      console.error("Failed to stop server:", err);
      setActionLoading(false);
    }
  };

  return { serverStatus, playersOnline, maxPlayers, players, actionLoading, startServer, stopServer };
}
