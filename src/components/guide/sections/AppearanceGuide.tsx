
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Image, CodepenIcon, Monitor } from "lucide-react";
import { TipAlert, NoteAlert } from "../GuideAlerts";

export function AppearanceGuide() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-6">Appearance Guide</h2>
        <Badge className="bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 mb-6">Under Construction...</Badge>
      </div>

      <section className="space-y-4">
        <h3 className="text-2xl font-bold">Color Palette and Themes</h3>
        <p>XMCL supports customized colors, which include:</p>
        
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
        
        <p>At the same time, XMCL has 2 default color schemes: Light mode and Dark mode.</p>
        
        <TipAlert>
          The colors of the Dark mode and Light mode are stored separately in each mode, and switching the mode will switch the overall color palette.
        </TipAlert>
      </section>
      
      <Separator className="my-8 bg-white/10" />
      
      <section className="space-y-4">
        <h3 className="text-2xl font-bold">Background Effects</h3>
        <p>XMCL backgrounds support setting as:</p>
        
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
        
        <NoteAlert>
          The launcher will only save the file path of the background video. If the video is moved after selection, the background setting will be invalid.
          <br /><br />
          This is not an issue with images, as image data is stored.
        </NoteAlert>
      </section>
    </div>
  );
}
