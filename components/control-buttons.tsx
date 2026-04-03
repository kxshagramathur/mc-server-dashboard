import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { ServerStatus } from "@/hooks/use-server-controller";

interface ControlButtonsProps {
  status: ServerStatus;
  onStart: () => void;
  onStop: () => void;
  actionLoading: boolean;
  setHovering: (hover: boolean) => void;
}

export function ControlButtons({
  status,
  onStart,
  onStop,
  actionLoading,
  setHovering,
}: ControlButtonsProps) {
  // isStarting handles the UI loading state of the start button, independent from generic api loading. 
  // We can just rely on actionLoading and the target state.
  const isStarting = actionLoading && status === "Offline";
  const isStopping = actionLoading && status !== "Offline";

  return (
    <div className="bg-white/5 border border-white/10 hover:border-[#B89000] backdrop-blur-lg rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 flex flex-col items-center justify-center shadow-2xl col-span-1 md:col-span-2 lg:col-span-1 transition-all duration-300 hover:shadow-[0_0_20px_rgba(184,144,0,0.4)]">
      <h2 className="font-mono text-xs sm:text-sm tracking-[0.2em] text-white/60 mb-4 sm:mb-6 uppercase">
        Controls
      </h2>
      <div className="flex flex-col gap-3 sm:gap-4 w-full">
        <Button
          className="w-full h-12 sm:h-16 text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 sm:gap-3 uppercase transition-all"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onClick={onStart}
          disabled={actionLoading || status !== "Offline"}
        >
          {isStarting && <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />}
          <span>{isStarting ? "[STARTING...]" : "[START SERVER]"}</span>
        </Button>
        <Button
          className="w-full h-12 sm:h-16 text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 sm:gap-3 uppercase transition-all"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onClick={onStop}
          disabled={actionLoading || status === "Offline" || status === "Checking"}
        >
          {isStopping && <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />}
          <span>{isStopping ? "[STOPPING...]" : "[STOP SERVER]"}</span>
        </Button>
      </div>
    </div>
  );
}
