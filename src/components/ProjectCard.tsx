import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Project } from "@/types/project";
import { Users, UserCheck, ArrowUpRight, Cpu, Radio, Network, Cog, Car, Sparkles } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const [imgSrc, setImgSrc] = useState(project.image);
  const [hasError, setHasError] = useState(!project.image || project.image.trim() === "");

  useEffect(() => {
    if (!project.image || project.image.trim() === "") {
      setHasError(true);
    } else {
      setImgSrc(project.image);
      setHasError(false);
    }
  }, [project.image]);

  const handleImageError = () => {
    if (imgSrc && imgSrc.endsWith(".png")) {
      setImgSrc(imgSrc.replace(".png", ".jpg"));
    } else {
      setHasError(true);
    }
  };

  // Department အလိုက် သီးသန့် Neon Theme သတ်မှတ်ချက်
  const getDeptTheme = (major: string) => {
    switch (major) {
      case "IST":
        return {
          glow: "group-hover:border-violet-400 group-hover:shadow-[0_0_30px_rgba(167,139,250,0.35)]",
          accent: "text-violet-400",
          bgBadge: "bg-violet-950/80 border-violet-500/40 text-violet-300",
          tagBg: "bg-violet-500/10 border-violet-500/30 text-violet-300",
          btn: "bg-violet-500/10 border-violet-500/30 text-violet-400 group-hover:bg-violet-400 group-hover:text-slate-950",
          icon: <Network className="w-8 h-8 text-violet-400 animate-pulse" />,
        };
      case "CE":
        return {
          glow: "group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]",
          accent: "text-cyan-400",
          bgBadge: "bg-cyan-950/80 border-cyan-500/40 text-cyan-300",
          tagBg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
          btn: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950",
          icon: <Cpu className="w-8 h-8 text-cyan-400 animate-pulse" />,
        };
      case "ECE":
        return {
          glow: "group-hover:border-amber-400 group-hover:shadow-[0_0_30px_rgba(251,191,36,0.35)]",
          accent: "text-amber-400",
          bgBadge: "bg-amber-950/80 border-amber-500/40 text-amber-300",
          tagBg: "bg-amber-500/10 border-amber-500/30 text-amber-300",
          btn: "bg-amber-500/10 border-amber-500/30 text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950",
          icon: <Radio className="w-8 h-8 text-amber-400 animate-pulse" />,
        };
      case "PrE":
        return {
          glow: "group-hover:border-rose-400 group-hover:shadow-[0_0_30px_rgba(251,113,133,0.35)]",
          accent: "text-rose-400",
          bgBadge: "bg-rose-950/80 border-rose-500/40 text-rose-300",
          tagBg: "bg-rose-500/10 border-rose-500/30 text-rose-300",
          btn: "bg-rose-500/10 border-rose-500/30 text-rose-400 group-hover:bg-rose-400 group-hover:text-slate-950",
          icon: <Cog className="w-8 h-8 text-rose-400 animate-pulse" />,
        };
      case "AME":
        return {
          glow: "group-hover:border-emerald-400 group-hover:shadow-[0_0_30px_rgba(52,211,153,0.35)]",
          accent: "text-emerald-400",
          bgBadge: "bg-emerald-950/80 border-emerald-500/40 text-emerald-300",
          tagBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
          btn: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 group-hover:bg-emerald-400 group-hover:text-slate-950",
          icon: <Car className="w-8 h-8 text-emerald-400 animate-pulse" />,
        };
      default:
        return {
          glow: "group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]",
          accent: "text-cyan-400",
          bgBadge: "bg-cyan-950/80 border-cyan-500/40 text-cyan-300",
          tagBg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
          btn: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950",
          icon: <Cpu className="w-8 h-8 text-cyan-400 animate-pulse" />,
        };
    }
  };

  const theme = getDeptTheme(project.major);

  return (
    <div
      onClick={() => onSelect(project)}
      className={`relative rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer group bg-slate-900/80 backdrop-blur-xl border border-white/10 transition-all duration-500 ease-out hover:-translate-y-1.5 ${theme.glow}`}
    >
      {/* Background Watermark Major Code */}
      <div className="absolute right-2 bottom-12 font-mono font-black text-6xl text-white/[0.03] select-none pointer-events-none group-hover:text-white/[0.06] transition-colors">
        {project.major}
      </div>

      <div>
        {/* Project Thumbnail Image Container */}
        <div className="relative h-48 w-full bg-slate-950 overflow-hidden border-b border-white/5 flex items-center justify-center">
          {!hasError && imgSrc ? (
            <Image
              src={imgSrc}
              alt={project.title}
              fill
              unoptimized={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-95 group-hover:brightness-105"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 text-center">
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-white/10 group-hover:scale-110 transition-transform">
                {theme.icon}
              </div>
              <span className={`text-xs font-mono font-bold tracking-wider ${theme.accent}`}>
                {project.major} INNOVATION
              </span>
            </div>
          )}

          {/* Gradient Lighting Layers */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-black/30 pointer-events-none" />

          {/* Department Code Tag (Top Left) */}
          <div className="absolute top-3 left-3 pointer-events-none">
            <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase border shadow-md ${theme.tagBg}`}>
              {project.major}
            </span>
          </div>

          {/* Year Badge (Top Right) */}
          {project.year && project.year.trim() !== "" && (
            <div className="absolute top-3 right-3 pointer-events-none">
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold border shadow-md ${theme.bgBadge}`}>
                {project.year}
              </span>
            </div>
          )}

          {/* Featured Ribbon */}
          {project.featured && (
            <div className="absolute bottom-2.5 right-3 flex items-center gap-1 text-[10px] font-mono font-bold text-amber-300 bg-amber-950/80 border border-amber-500/40 px-2 py-0.5 rounded-full shadow-lg">
              <Sparkles className="w-3 h-3" />
              <span>HIGHLIGHT</span>
            </div>
          )}
        </div>

        {/* Card Main Info */}
        <div className="p-5 relative z-10">
          <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors line-clamp-2 mb-2 leading-snug">
            {project.title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3 font-light">
            {project.shortSummary}
          </p>
        </div>
      </div>

      {/* Card Footer Info */}
      <div className="px-5 pb-4 relative z-10">
        <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
          <div className="space-y-1 text-xs text-slate-400 min-w-0 pr-2">
            <div className="flex items-center gap-2 truncate font-mono">
              <Users className={`w-3.5 h-3.5 flex-shrink-0 ${theme.accent}`} />
              <span className="truncate text-slate-200 font-medium">{project.teamName}</span>
            </div>
            <div className="flex items-center gap-2 truncate font-mono text-[11px]">
              <UserCheck className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <span className="truncate text-slate-400">{project.advisor}</span>
            </div>
          </div>

          {/* Neon Action Button */}
          <div className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all duration-300 flex-shrink-0 group-hover:rotate-45 ${theme.btn}`}>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};