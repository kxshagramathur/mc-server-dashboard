import { useState } from "react";
import { Copy, Check, Globe } from "lucide-react";

interface IpAddressCardProps {
  ipAddress: string | null;
}

export function IpAddressCard({ ipAddress }: IpAddressCardProps) {
  const [copied, setCopied] = useState(false);
  const displayIp = ipAddress ? `${ipAddress}:25565` : "Server Offline";

  const handleCopy = async () => {
    try {
      if (!ipAddress) return;
      await navigator.clipboard.writeText(displayIp);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy IP address:", err);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 hover:border-[#B89000] backdrop-blur-lg rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 flex flex-col items-center justify-center shadow-2xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(184,144,0,0.4)] w-full text-center">
      <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4 w-full">
        <Globe size={16} className="text-white/60" />
        <h2 className="font-mono text-xs sm:text-sm tracking-[0.2em] text-white/60 uppercase">
          IP Address
        </h2>
      </div>
      <div className="flex items-stretch justify-center gap-3 w-full h-12 sm:h-auto max-w-[400px]">
        <div className="flex-1 bg-black/30 rounded-xl px-4 py-3 border border-white/5 flex items-center justify-center shadow-inner overflow-hidden">
          <span className={`text-sm sm:text-lg font-medium truncate ${!ipAddress ? 'text-white/40 italic' : 'text-white'}`}>
            {displayIp}
          </span>
        </div>
        <button
          onClick={handleCopy}
          disabled={!ipAddress}
          className={`bg-black/30 hover:bg-white/10 transition-colors rounded-xl px-4 py-3 border border-white/5 flex items-center justify-center shrink-0 shadow-inner group ${!ipAddress ? 'opacity-50 cursor-not-allowed' : ''}`}
          title={ipAddress ? "Copy IP Address" : "Server Offline"}
        >
          {copied ? (
            <Check size={18} className="text-green-500" />
          ) : (
            <Copy size={18} className="text-white/60 group-hover:text-white transition-colors" />
          )}
        </button>
      </div>
    </div>
  );
}
