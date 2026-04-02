import { NextResponse } from "next/server";
import { QueryClient, JavaPingClient } from "craftping";

const MC_HOST = process.env.MC_HOST as string;
const MC_PORT = 25565;
const TIMEOUT_MS = 5000;

export async function GET() {
  const queryClient = new QueryClient();
  const pingClient = new JavaPingClient();

  try {
    // 1. Try UDP Query (Full) for best detail and names
    try {
      const queried = await queryClient.queryFull(
        MC_HOST,
        MC_PORT,
        AbortSignal.timeout(TIMEOUT_MS)
      );

      return NextResponse.json({
        online: true,
        playersOnline: queried.players?.length || queried.numplayers || 0,
        maxPlayers: queried.maxplayers || 20,
        players: queried.players || [],
        source: "query",
      }, {
        headers: { "Cache-Control": "no-store, max-age=0" }
      });
    } catch (queryErr) {
      console.warn("[api/mc-status] Query failed, falling back to Ping:", queryErr);
    }

    // 2. Fallback to TCP Ping (Standard)
    try {
      const pinged = await pingClient.ping(
        MC_HOST,
        MC_PORT,
        { signal: AbortSignal.timeout(TIMEOUT_MS) }
      );

      return NextResponse.json({
        online: true,
        playersOnline: pinged.players?.online || pinged.players?.sample?.length || 0,
        maxPlayers: pinged.players?.max || 20,
        players: pinged.players?.sample || [],
        source: "ping",
      }, {
        headers: { "Cache-Control": "no-store, max-age=0" }
      });
    } catch (pingErr) {
      console.error("[api/mc-status] Ping also failed:", pingErr);
      return NextResponse.json({
        online: false,
        playersOnline: 0,
        maxPlayers: 20,
        players: [],
        error: "Server unreachable",
      }, {
        headers: { "Cache-Control": "no-store, max-age=0" }
      });
    }
  } finally {
    // Cleanup UDP socket
    queryClient.close().catch(() => { });
  }
}
