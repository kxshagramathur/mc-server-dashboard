import { User } from "lucide-react";

interface PlayerNamesCardProps {
  players: any[];
}

export function PlayerNamesCard({ players }: PlayerNamesCardProps) {
  // Normalize players array to always be an array of strings
  const normalizedPlayers = Array.isArray(players)
    ? players.map(p => (typeof p === 'string' ? p : p.name)).filter(Boolean)
    : [];

  return (
    <div className="bg-white/5 border border-white/10 hover:border-[#B89000] backdrop-blur-lg rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 flex flex-col items-center justify-center shadow-2xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(184,144,0,0.4)] w-full flex-1 min-h-[200px] text-center">
      <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4 w-full">
        <User size={16} className="text-white/60" />
        <h2 className="font-mono text-xs sm:text-sm tracking-[0.2em] text-white/60 uppercase">
          Player Names
        </h2>
      </div>
      
      <div className="bg-black/20 rounded-xl p-4 w-full flex-1 overflow-y-auto border border-white/5">
        {normalizedPlayers.length > 0 ? (
          <ul className="space-y-2 flex flex-col items-center">
            {normalizedPlayers.map((name, idx) => (
              <li key={idx} className="text-white sm:text-lg flex items-center justify-center gap-3 py-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                {name}
              </li>
            ))}
          </ul>
        ) : (
          <div className="h-full flex items-center justify-center text-white/40 italic text-sm">
            No players online
          </div>
        )}
      </div>
    </div>
  );
}
