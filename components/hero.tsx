"use client";

import { GL } from "./gl";
import { useState } from "react";
import { useServerController } from "@/hooks/use-server-controller";
import { ServerStatusCard } from "./server-status";
import { PlayerInfoCard } from "./player-info";
import { ControlButtons } from "./control-buttons";

export function Hero() {
  const [hovering, setHovering] = useState(false);

  const {
    serverStatus,
    playersOnline,
    maxPlayers,
    actionLoading,
    startServer,
    stopServer,
  } = useServerController();

  return (
    <div className="flex flex-col min-h-[100dvh] w-full justify-center items-center relative overflow-x-hidden overflow-y-auto">
      <GL hovering={hovering} />

      <main className="relative z-10 flex flex-col items-center justify-center p-4 sm:p-6 md:p-12 w-full max-w-6xl py-12 md:py-0 min-h-max">
        <div className="mb-8 md:mb-12 text-center mt-12 md:mt-0">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-sentient text-white drop-shadow-md leading-tight">
            Minecraft Server <br />
            <i className="font-light">Dashboard</i>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full items-stretch pb-12 md:pb-0">
          <ServerStatusCard status={serverStatus} />
          
          <PlayerInfoCard 
            playersOnline={playersOnline} 
            maxPlayers={maxPlayers} 
          />
          
          <ControlButtons
            status={serverStatus}
            onStart={startServer}
            onStop={stopServer}
            actionLoading={actionLoading}
            setHovering={setHovering}
          />
        </div>
      </main>
    </div>
  );
}
