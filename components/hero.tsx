"use client";

import { GL } from "./gl";
import { useState } from "react";
import { useServerController } from "@/hooks/use-server-controller";
import { ServerStatusCard } from "./server-status";
import { PlayerInfoCard } from "./player-info";
import { ControlButtons } from "./control-buttons";
import { IpAddressCard } from "./ip-address";
import { PlayerNamesCard } from "./player-names";

export function Hero() {
  const [hovering, setHovering] = useState(false);

  const {
    serverStatus,
    playersOnline,
    maxPlayers,
    players,
    actionLoading,
    startServer,
    stopServer,
  } = useServerController();

  return (
    <div className="flex flex-col min-h-[100dvh] w-full justify-center items-center relative overflow-x-hidden overflow-y-auto">
      <GL hovering={hovering} />

      {/* Tightened padding so everything fits in one viewport */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 py-4 w-full max-w-6xl">
        <div className="mb-3 md:mb-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-sentient text-white drop-shadow-md leading-tight whitespace-nowrap">
            <i className="font-light">Kush&apos;s</i> Minecraft Server <i className="font-light">Dashboard</i>
          </h1>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 w-full items-stretch pb-4 lg:pb-0">
          
          {/* Left Column */}
          <div className="flex flex-col gap-3 sm:gap-4 w-full h-full">
            <ServerStatusCard status={serverStatus} />
            <IpAddressCard />
            <ControlButtons
              status={serverStatus}
              onStart={startServer}
              onStop={stopServer}
              actionLoading={actionLoading}
              setHovering={setHovering}
            />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-3 sm:gap-4 w-full h-full">
            <PlayerInfoCard 
              playersOnline={playersOnline} 
              maxPlayers={maxPlayers} 
            />
            <PlayerNamesCard players={players} />
          </div>

        </div>
      </main>
    </div>
  );
}
