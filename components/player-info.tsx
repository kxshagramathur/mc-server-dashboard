import { Layers } from "lucide-react";

export function VersionInfoCard() {
  return (
    <div className="bg-white/5 border border-white/10 hover:border-[#B89000] backdrop-blur-lg rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 flex flex-col items-center justify-center shadow-2xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(184,144,0,0.4)] text-center w-full">
      <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3 w-full">
        <Layers size={16} className="text-white/60" />
        <h2 className="font-mono text-xs sm:text-sm tracking-[0.2em] text-white/60 uppercase">
          Version
        </h2>
      </div>
      <div className="flex items-baseline gap-2 text-white">
        <span className="text-2xl sm:text-3xl font-medium tracking-wide">1.21.11</span>
      </div>
    </div>
  );
}
