"use client";

import { useState } from "react";
import { ApiDocs } from "@/components/ApiDocs";
import { Footer } from "@/components/Footer";
import { Generator } from "@/components/Generator";
import { Hero } from "@/components/Hero";
import type { Tone } from "@/lib/types";

export default function Home() {
  const [tone, setTone] = useState<Tone | "">("");

  return (
    <main 
      data-tone={tone} 
      className="theme-transition min-h-screen bg-zinc-950 text-zinc-100 selection:bg-purple-500/30 relative overflow-hidden"
    >
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Dynamic Background Glow Blooms */}
      <div 
        className="theme-transition absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full pointer-events-none glow-blur animate-float"
        style={{
          background: "radial-gradient(circle, rgb(var(--accent-primary) / 0.12) 0%, transparent 70%)"
        }}
      />
      <div 
        className="theme-transition absolute top-[30%] right-[-10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full pointer-events-none glow-blur animate-float-slow"
        style={{
          background: "radial-gradient(circle, rgb(var(--accent-secondary) / 0.08) 0%, transparent 70%)"
        }}
      />
      <div 
        className="theme-transition absolute bottom-[-10%] left-[-15%] w-[65vw] h-[65vw] max-w-[700px] max-h-[700px] rounded-full pointer-events-none glow-blur animate-float"
        style={{
          background: "radial-gradient(circle, rgb(var(--accent-primary) / 0.08) 0%, transparent 70%)"
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10">
        <Hero />
        <Generator onToneChange={setTone} activeTone={tone} />
        <ApiDocs activeTone={tone} />
        <Footer />
      </div>
    </main>
  );
}
