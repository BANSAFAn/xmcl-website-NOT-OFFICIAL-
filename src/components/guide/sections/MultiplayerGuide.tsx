
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function MultiplayerGuide() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold mb-6">Multiplayer Guide</h2>
      <Badge className="bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 mb-6">Under Construction</Badge>
      
      <section className="space-y-4">
        <h3 className="text-2xl font-bold">Quick Start</h3>
        <ol className="list-decimal pl-6 space-y-4">
          <li>Go to the Multiplayer On LAN page.</li>
          <li>Click the Join/Create Group button on the top right.</li>
          <li>You should create a group if you internet connection is good. Click the Group ID to copy it.</li>
          <li>Your peer should input this Group ID to join your group. Once he joined, you should see his/her connected status below.</li>
          <li>Then you should start the game and open the game to LAN, and your friend should see your game even if you are not in same LAN.</li>
        </ol>
      </section>

      <Separator className="my-8 bg-white/10" />
      
      <section className="space-y-4">
        <h3 className="text-2xl font-bold">How to use forwarding services</h3>
        <Badge className="bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30">Under Construction</Badge>
      </section>

      <Separator className="my-8 bg-white/10" />
      
      <section className="space-y-4">
        <h3 className="text-2xl font-bold">Offline Skins</h3>
        <Badge className="bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30">Under Construction</Badge>
      </section>
    </div>
  );
}
