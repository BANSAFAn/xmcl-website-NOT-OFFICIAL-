import React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export function MultiplayerGuide() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Multiplayer Guide</h2>
        <Badge
          variant="outline"
          className="bg-amber-500/10 text-amber-300 border-amber-300/20"
        >
          Under Construction
        </Badge>
      </div>

      <Card className="mb-8 border border-white/10 bg-black/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Quick Start</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="windows" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 rounded-lg bg-slate-800/50">
              <TabsTrigger value="windows" className="rounded-md">
                Windows
              </TabsTrigger>
              <TabsTrigger value="linux" className="rounded-md">
                Linux
              </TabsTrigger>
              <TabsTrigger value="macos" className="rounded-md">
                MacOS
              </TabsTrigger>
            </TabsList>

            <TabsContent value="windows" className="space-y-4 mt-2">
              <ol className="list-decimal pl-6 space-y-4 text-slate-200">
                <li>Go to the Multiplayer On LAN page.</li>
                <li>Click the Join/Create Group button on the top right.</li>
                <li>
                  You should create a group if your internet connection is good.
                  Click the Group ID to copy it.
                </li>
                <li>
                  Your peer should input this Group ID to join your group. Once
                  they join, you should see their connected status below.
                </li>
                <li>
                  Then start the game and open it to LAN, and your friend should
                  see your game even if you are not on the same LAN.
                </li>
              </ol>
            </TabsContent>

            <TabsContent value="linux" className="space-y-4 mt-2">
              <ol className="list-decimal pl-6 space-y-4 text-slate-200">
                <li>Go to the Multiplayer On LAN page.</li>
                <li>Click the Join/Create Group button on the top right.</li>
                <li>
                  You should create a group if your internet connection is good.
                  Click the Group ID to copy it.
                </li>
                <li>
                  Your peer should input this Group ID to join your group. Once
                  they join, you should see their connected status below.
                </li>
                <li>
                  Then start the game and open it to LAN, and your friend should
                  see your game even if you are not on the same LAN.
                </li>
                <li className="bg-amber-500/10 p-4 rounded-lg border border-amber-300/20">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-300 mt-0.5" />
                    <div>
                      <strong className="text-amber-300">Firewall Note:</strong>{" "}
                      If you have a firewall installed (ufw, firewalld, etc.),
                      it's recommended to disable it temporarily as we haven't
                      yet determined which ports are required.
                      <div className="mt-2 bg-slate-800/50 p-3 rounded font-mono text-sm">
                        <div className="mb-1">
                          <span className="text-slate-400"># For UFW</span>
                          <br />
                          sudo ufw disable
                        </div>
                        <div>
                          <span className="text-slate-400">
                            # For Firewalld
                          </span>
                          <br />
                          sudo systemctl stop firewalld
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-slate-300">
                        Remember to re-enable your firewall after successfully
                        connecting.
                      </div>
                    </div>
                  </div>
                </li>
              </ol>
            </TabsContent>

            <TabsContent value="macos" className="mt-2">
              <div className="flex justify-center items-center h-40 bg-amber-500/10 rounded-lg border border-amber-300/20">
                <Badge
                  variant="outline"
                  className="text-amber-300 border-amber-300/20"
                >
                  Under Construction
                </Badge>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="mb-8 border border-white/10 bg-black/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            How to use forwarding services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-40 bg-amber-500/10 rounded-lg border border-amber-300/20">
            <Badge
              variant="outline"
              className="text-amber-300 border-amber-300/20"
            >
              Under Construction
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-white/10 bg-black/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Offline Skins
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-40 bg-amber-500/10 rounded-lg border border-amber-300/20">
            <Badge
              variant="outline"
              className="text-amber-300 border-amber-300/20"
            >
              Under Construction
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
