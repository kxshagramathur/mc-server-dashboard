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
    <div className="flex flex-col h-svh w-full justify-center items-center relative overflow-hidden">
      <GL hovering={hovering} />

      <main className="relative z-10 flex flex-col items-center justify-center p-6 sm:p-12 w-full max-w-6xl h-full">
        <div className="mb-12 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-sentient text-white drop-shadow-md">
            Minecraft Server <br />
            <i className="font-light">Dashboard</i>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-stretch">
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
