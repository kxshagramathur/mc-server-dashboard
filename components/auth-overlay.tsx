import { useState, useRef, useEffect } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

interface AuthOverlayProps {
  onAuthorize: () => void;
}

export function AuthOverlay({ onAuthorize }: AuthOverlayProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus the input when mounted
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (password === "bsdk") {
      setError(false);
      onAuthorize();
    } else {
      setError(true);
      // Reset error state after animation
      setTimeout(() => setError(false), 400);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dynamic Keyframes for shake animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}} />
      
      <div 
        className={`bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2rem] p-8 sm:p-10 w-full max-w-sm flex flex-col items-center shadow-2xl transition-all duration-300 ${
          error ? "animate-shake border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)]" : ""
        }`}
      >
        <div className="mb-8">
          <Lock size={32} className="text-white/60" />
        </div>
        
        <div className="relative w-full">
          <input
            ref={inputRef}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(false);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Enter Password"
            className="w-full bg-black/30 border border-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3 outline-none transition-all duration-300 focus:border-[#B89000] hover:border-white/20 shadow-inner"
          />
          
          {password.length > 0 && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-1"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        
        {/* Subtle invisible placeholder to prevent layout shift if we wanted an error message, but user specifically requested shake. I'll add a subtle red text below. */}
        <div className="h-6 w-full mt-2 flex justify-center">
          {error && (
            <p className="text-red-400 text-sm font-medium animate-pulse">
              Incorrect Password
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
