import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Calendar, MapPin, Sparkles, ShieldCheck, Activity } from "lucide-react";

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const [logoError, setLogoError] = useState(false);

  return (
    <section id="hero" className="relative pt-10 pb-16 lg:pt-20 lg:pb-28 overflow-hidden bg-cyber-grid">
      {/* Multi-layered Neon Ambient Light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-cyan-500/15 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* UTYCC Official Logo with Glowing Aura */}
          {!logoError && (
            <div className="mx-auto mb-6 relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-900/90 border border-cyan-500/50 p-2 shadow-[0_0_35px_rgba(6,182,212,0.4)] backdrop-blur-md flex items-center justify-center group hover:scale-105 transition-transform">
              <Image
                src="/logos/utycc.png"
                alt="UTYCC University Crest"
                fill
                sizes="96px"
                priority
                className="object-contain p-1 rounded-full"
                onError={() => setLogoError(true)}
              />
            </div>
          )}

          {/* Exhibition Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-cyan-500/40 bg-slate-900/80 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-6 backdrop-blur-md shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-slate-400">STATUS:</span>
            <span className="text-white font-bold">ANNUAL GRAND EXHIBITION</span>
            <span className="text-cyan-400">• AUG 31, 2026</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 uppercase leading-none">
            UTYCC PROJECT SHOW{" "}
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
              2026
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            Pioneering the Future of Technology: Advanced Engineering Prototypes, Applied AI, Robotics, and Research Capstones.
          </p>

          {/* Key Event Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono text-slate-300 mb-10">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-white/10 shadow-sm">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>2026.08.31 [09:00 AM]</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-white/10 shadow-sm">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>MAIN AUDITORIUM, UTYCC</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-white/10 shadow-sm">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>5 DEPARTMENTS</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <button
              onClick={onExploreClick}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-bold flex items-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.45)] transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95"
            >
              <span className="tracking-wide">EXPLORE PROJECTS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#about"
              className="px-7 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold border border-cyan-500/30 backdrop-blur-md transition-all hover:border-cyan-400 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>About Exhibition</span>
            </a>
          </div>
        </div>

        {/* Campus Preview Card */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-900/80 backdrop-blur-xl p-2 shadow-2xl">
            <div className="relative h-64 sm:h-[400px] w-full rounded-xl overflow-hidden group">
              <Image
                src="/images/utycc-campus.jpg"
                alt="UTYCC Campus Aerial View"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1024px"
                className="object-cover group-hover:scale-105 transition-transform duration-1000 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs sm:text-sm text-slate-300 bg-slate-950/85 p-3 sm:p-4 rounded-xl backdrop-blur-md border border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-semibold text-white">University of Technology, Yatanarpon Cyber City</span>
                </div>
                <span className="text-cyan-400 font-mono text-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Innovation & Engineering Excellence
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};