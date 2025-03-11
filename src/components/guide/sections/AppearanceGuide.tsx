import React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Image, CodepenIcon, Monitor, AlertCircle } from "lucide-react";
import { TipAlert, NoteAlert } from "../GuideAlerts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AppearanceGuide() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Appearance Guide</h2>
        <Badge
          variant="outline"
          className="bg-amber-500/10 text-amber-300 border-amber-300/20"
        >
          Under Construction
        </Badge>
      </div>

      <Card className="mb-8 border border-white/10 bg-black/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Color Palette and Themes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            XMCL supports customized colors, which include:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-gradient-to-r from-blue-400 to-blue-600 flex-shrink-0"></div>
              <span>Card color</span>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-gradient-to-r from-purple-400 to-purple-600 flex-shrink-0"></div>
              <span>Top bar color</span>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-gradient-to-r from-gray-700 to-gray-900 flex-shrink-0"></div>
              <span>Sidebar color</span>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-gradient-to-r from-gray-800 to-gray-950 flex-shrink-0"></div>
              <span>Background color</span>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-gradient-to-r from-cyan-400 to-cyan-600 flex-shrink-0"></div>
              <span>Basic component highlight color</span>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-gradient-to-r from-red-400 to-red-600 flex-shrink-0"></div>
              <span>Error color</span>
            </div>
          </div>

          <p className="mb-4">
            At the same time, XMCL has 2 default color schemes: Light mode and
            Dark mode.
          </p>

          <div className="flex items-start gap-3 bg-amber-500/10 p-4 rounded-lg border border-amber-300/20">
            <AlertCircle className="h-5 w-5 text-amber-300 mt-0.5" />
            <div>
              <strong className="text-amber-300">Note:</strong> The colors of
              the Dark mode and Light mode are stored separately in each mode,
              and switching the mode will switch the overall color palette.
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-white/10 bg-black/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Background Effects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">XMCL backgrounds support setting as:</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex flex-col items-center gap-3 hover:bg-white/10 transition-colors">
              <Image className="w-10 h-10 text-blue-400" />
              <span className="text-center">Image</span>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex flex-col items-center gap-3 hover:bg-white/10 transition-colors">
              <Monitor className="w-10 h-10 text-purple-400" />
              <span className="text-center">Video</span>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex flex-col items-center gap-3 hover:bg-white/10 transition-colors">
              <CodepenIcon className="w-10 h-10 text-cyan-400" />
              <span className="text-center">Particle effects</span>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-amber-500/10 p-4 rounded-lg border border-amber-300/20">
            <AlertCircle className="h-5 w-5 text-amber-300 mt-0.5" />
            <div>
              <strong className="text-amber-300">Important:</strong> The
              launcher will only save the file path of the background video. If
              the video is moved after selection, the background setting will be
              invalid.
              <div className="mt-2">
                This is not an issue with images, as image data is stored.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
