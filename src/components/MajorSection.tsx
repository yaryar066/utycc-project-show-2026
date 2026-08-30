"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { MajorInfo, MajorType } from "@/types/project";
import { ChevronRight, Network, Cpu, Radio, Cog, Car, Sparkles } from "lucide-react";

interface MajorSectionProps {
  majors: MajorInfo[];
  selectedMajor: MajorType;
  onSelectMajor: (major: MajorType) => void;
}

export const MajorSection: React.FC<MajorSectionProps> = ({
  majors,
  selectedMajor,
  onSelectMajor,
}) => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll ဝင်လာချိန်ကို ခြေရာခံခြင်း (Intersection Observer)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getMajorLogo = (code: string) => `/logos/${code.toLowerCase()}.png`;

  const getMajorIcon = (code: string) => {
    switch (code) {
      case "IST": return <Network className="w-6 h-6 text-cyan-400" />;
      case "CE": return <Cpu className="w-6 h-6 text-cyan-400" />;
      case "ECE": return <Radio className="w-6 h-6 text-cyan-400" />;
      case "PrE": return <Cog className="w-6 h-6 text-cyan-400" />;
      case "AME": return <Car className="w-6 h-6 text-cyan-400" />;
      default: return <Cpu className="w-6 h-6 text-cyan-400" />;
    }
  };

  // Card နေရာအလိုက် ဘယ်ဘက်/ညာဘက်မှ စုဝင်လာစေမည့် CSS Translation
  const getConvergenceAnimation = (index: number) => {
    if (!isVisible) {
      if (index === 0) return "-translate-x-12 opacity-0"; // IST (Left)
      if (index === 1) return "-translate-x-6 opacity-0";  // CE (Left Mid)
      if (index === 2) return "translate-y-12 opacity-0";  // ECE (Center Bottom)
      if (index === 3) return "translate-x-6 opacity-0";   // PrE (Right Mid)
      if (index === 4) return "translate-x-12 opacity-0";  // AME (Right)
      return "opacity-0";
    }
    return "translate-x-0 translate-y-0 opacity-100";
  };

  return (
    <section
      ref={sectionRef}
      id="majors"
      className="py-14 sm:py-20 border-t border-b border-cyan-500/20 bg-slate-950/70 bg-cyber-grid backdrop-blur-xl relative overflow-hidden"
    >
      {/* Dynamic Ambient Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-10 sm:mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} />
            <span>5 Engineering Departments</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Academic Departments
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 font-light">
            Select a specialized department to isolate research tracks
          </p>
        </div>

        {/* 5-Column Responsive Convergence Grid - items-stretch ထည့်ထားပါသည် */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5 items-stretch">
          {majors.map((major, idx) => {
            const isSelected = selectedMajor === major.code;
            const hasError = imageErrors[major.code];

            return (
              <button
                key={major.code}
                onClick={() => onSelectMajor(major.code)}
                style={{ transitionDelay: `${idx * 80}ms` }}
                className={`text-left p-4 sm:p-5 rounded-2xl flex flex-col justify-between h-full group cursor-pointer relative overflow-hidden active:scale-95 transition-all duration-700 ease-out ${getConvergenceAnimation(
                  idx
                )} ${
                  isSelected
                    ? "bg-slate-900/95 border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.45)] ring-1 ring-cyan-400"
                    : "cyber-hud-card hover:bg-slate-900/80"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-cyan-400 [clip-path:polygon(100%_0,0_0,100%_100%)]" />
                )}

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-5">
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900 border border-cyan-500/30 flex items-center justify-center overflow-hidden shadow-inner group-hover:scale-110 group-hover:border-cyan-400 transition-all duration-300 flex-shrink-0">
                      {!hasError ? (
                        <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-1">
                          <Image
                            src={getMajorLogo(major.code)}
                            alt={`${major.code} Logo`}
                            fill
                            sizes="56px"
                            className="object-cover rounded-full"
                            onError={() => setImageErrors((prev) => ({ ...prev, [major.code]: true }))}
                          />
                        </div>
                      ) : (
                        getMajorIcon(major.code)
                      )}
                    </div>
                    
                    <span className="text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
                      [{major.code}]
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-xs sm:text-sm lg:text-base text-white mb-1.5 leading-snug group-hover:text-cyan-300 transition-colors">
                    {major.fullName}
                  </h3>
                  {/* line-clamp ဖယ်ရှားထားပြီး စာအပြည့်အစုံ ပေါ်လာစေပါသည် */}
                  <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed font-light">
                    {major.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] sm:text-xs text-cyan-400 font-mono font-semibold">
                  <span>DISCOVER</span>
                  <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};