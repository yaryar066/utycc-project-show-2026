import React, { useState } from "react";
import Image from "next/image";
import { Layers } from "lucide-react";

export const Navbar: React.FC = () => {
  const [logoError, setLogoError] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/75 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 rounded-full bg-slate-900 border border-cyan-500/30 flex items-center justify-center overflow-hidden p-1 group-hover:border-cyan-400 transition-all duration-300">
            {!logoError ? (
              <Image
                src="/logos/utycc.png"
                alt="UTYCC Logo"
                fill
                sizes="40px"
                className="object-contain p-0.5 rounded-full"
                onError={() => setLogoError(true)}
              />
            ) : (
              <Layers className="h-5 w-5 text-cyan-400" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base sm:text-lg tracking-wide text-white group-hover:text-cyan-400 transition-colors">
              UTYCC PROJECT SHOW
            </span>
            <span className="text-xs tracking-wider text-slate-400 font-mono">
              AUGUST 31, 2026
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-medium text-slate-300">
          <a href="#hero" className="hover:text-cyan-400 transition-colors">Home</a>
          <a href="#majors" className="hover:text-cyan-400 transition-colors">Majors</a>
          <a href="#showcase" className="hover:text-cyan-400 transition-colors">Showcase</a>
          <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
        </nav>
      </div>
    </header>
  );
};