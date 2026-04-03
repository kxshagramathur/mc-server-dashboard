interface PlayerInfoProps {
  playersOnline: number;
  maxPlayers: number;
}

export function PlayerInfoCard({
  playersOnline,
  maxPlayers,
}: PlayerInfoProps) {
  return (
    <div className="bg-white/5 border border-white/10 hover:border-[#B89000] backdrop-blur-lg rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 flex flex-col items-center justify-center shadow-2xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(184,144,0,0.4)]">
      <h2 className="font-mono text-xs sm:text-sm tracking-[0.2em] text-white/60 mb-3 sm:mb-4 uppercase">
        Players
      </h2>
      <div className="flex items-baseline gap-2 text-white">
        <span className="text-4xl sm:text-5xl font-medium">{playersOnline}</span>
        <span className="text-xl sm:text-2xl text-white/40">/ {maxPlayers}</span>
      </div>
    </div>
  );
}
