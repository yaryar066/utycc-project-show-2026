import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Project } from "@/types/project";
import { Users, UserCheck, ArrowUpRight, Cpu, Radio, Network, Cog, Car } from "lucide-react";

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

  const getMajorIcon = (major: string) => {
    switch (major) {
      case "ECE": return <Radio className="w-8 h-8 text-cyan-400 animate-pulse" />;
      case "CE": return <Cpu className="w-8 h-8 text-cyan-400 animate-pulse" />;
      case "IST": return <Network className="w-8 h-8 text-cyan-400 animate-pulse" />;
      case "PrE": return <Cog className="w-8 h-8 text-cyan-400 animate-pulse" />;
      case "AME": return <Car className="w-8 h-8 text-cyan-400 animate-pulse" />;
      default: return <Cpu className="w-8 h-8 text-cyan-400 animate-pulse" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(project)}
      className="cyber-hud-card rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer group transition-all duration-300"
    >
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
              className="object-cover group-hover:scale-108 transition-transform duration-700 brightness-100"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-cyan-400 gap-2 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 p-4 text-center">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 group-hover:border-cyan-400 transition-colors">
                {getMajorIcon(project.major)}
              </div>
              <span className="text-xs font-mono text-cyan-300 font-bold tracking-wider">
                {project.major} INNOVATION
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                UTYCC SHOWCASE 2026
              </span>
            </div>
          )}

          {/* Glowing Gradient Bottom Tint */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

          {/* Clean Year Badge */}
          {project.year && project.year.trim() !== "" && (
            <div className="absolute top-3 right-3 pointer-events-none">
              <span className="px-3 py-1 rounded-md text-[11px] font-mono font-semibold bg-slate-950/90 backdrop-blur-md text-cyan-300 border border-cyan-500/40 shadow-lg">
                {project.year}
              </span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5">
          <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors line-clamp-2 mb-2.5 leading-snug">
            {project.title}
          </h3>

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4 font-light">
            {project.shortSummary}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 pb-5">
        <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
          <div className="space-y-1 text-xs text-slate-400 min-w-0 pr-2">
            <div className="flex items-center gap-2 truncate">
              <Users className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <span className="truncate text-slate-300 font-medium">{project.teamName}</span>
            </div>
            <div className="flex items-center gap-2 truncate font-mono text-[11px]">
              <UserCheck className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <span className="truncate text-slate-400">Adv: {project.advisor}</span>
            </div>
          </div>

          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950 group-hover:rotate-45 transition-all duration-300 flex-shrink-0">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};