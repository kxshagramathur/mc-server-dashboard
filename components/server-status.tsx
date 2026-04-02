import { ServerStatus } from "@/hooks/use-server-controller";

interface ServerStatusProps {
  status: ServerStatus;
}

export function ServerStatusCard({ status }: ServerStatusProps) {
  return (
    <div className="bg-white/5 border border-white/10 hover:border-[#B89000] backdrop-blur-lg rounded-[2rem] p-8 flex flex-col items-center justify-center shadow-2xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(184,144,0,0.4)]">
      <h2 className="font-mono text-sm tracking-[0.2em] text-white/60 mb-4 uppercase">
        Status
      </h2>
      <div className="flex items-center gap-3 text-3xl font-medium text-white">
        <div
          className={`w-3.5 h-3.5 rounded-full shadow-[0_0_10px_currentColor] ${
            status === "Online"
              ? "bg-green-500 text-green-500"
              : status === "Starting"
              ? "bg-yellow-500 text-yellow-500 animate-pulse"
              : status === "Checking"
              ? "bg-slate-400 text-slate-400 animate-pulse"
              : "bg-red-500 text-red-500"
          }`}
        />
        <span>{status}</span>
      </div>
    </div>
  );
}
