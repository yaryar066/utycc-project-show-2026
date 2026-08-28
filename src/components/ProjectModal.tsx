import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Project } from "@/types/project";
import { X, Users, UserCheck, Cpu, Radio, Network, Cog, Car, Sparkles } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  if (!project) return null;

  const getDepartmentIcon = (major: string) => {
    switch (major) {
      case "ECE":
        return <Radio className="w-12 h-12 text-cyan-400 animate-pulse" />;
      case "CE":
        return <Cpu className="w-12 h-12 text-cyan-400 animate-pulse" />;
      case "IST":
        return <Network className="w-12 h-12 text-cyan-400 animate-pulse" />;
      case "PrE":
        return <Cog className="w-12 h-12 text-cyan-400 animate-pulse" />;
      case "AME":
        return <Car className="w-12 h-12 text-cyan-400 animate-pulse" />;
      default:
        return <Cpu className="w-12 h-12 text-cyan-400 animate-pulse" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] rounded-t-3xl sm:rounded-2xl bg-slate-900 border-t sm:border border-cyan-500/40 overflow-y-auto shadow-2xl z-10 text-white animate-in slide-in-from-bottom-5 sm:zoom-in-95 duration-200">
        
        {/* Mobile Pull Bar */}
        <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mt-3 sm:hidden" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-xl bg-slate-950/80 border border-white/10 text-slate-300 hover:text-white active:scale-95 transition-all cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Modal Banner Image */}
        <div className="relative h-56 sm:h-72 w-full bg-slate-950 mt-2 sm:mt-0 overflow-hidden flex items-center justify-center">
          {!imageError && project.image && project.image.trim() !== "" ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              unoptimized={true}
              className="object-cover brightness-100"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/60 p-6 text-center border-b border-cyan-500/20">
              <div className="absolute w-40 h-40 bg-cyan-500/15 blur-3xl rounded-full pointer-events-none" />
              
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.3)] mb-3 relative z-10">
                {getDepartmentIcon(project.major)}
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-300 tracking-wider uppercase relative z-10">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Department of {project.major} Research & Prototype</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 mt-1 relative z-10">
                UTYCC PROJECT SHOWCASE 2026
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
          
          {/* Class & Semester Badge */}
          {project.year && project.year.trim() !== "" && (
            <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-6 flex items-center">
              <span className="px-3 py-1 rounded-md text-xs font-mono font-semibold bg-slate-950/90 backdrop-blur-md text-cyan-300 border border-cyan-500/40 shadow-lg">
                {project.year}
              </span>
            </div>
          )}
        </div>

        {/* Modal Info Content */}
        <div className="p-5 sm:p-8 space-y-5 sm:space-y-6">
          <h2 className="text-lg sm:text-2xl font-extrabold text-white leading-snug">
            {project.title}
          </h2>

          <div>
            <h4 className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-mono">
              Project Abstract & Summary
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 sm:p-4 rounded-xl border border-white/5 font-light">
              {project.fullDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-slate-950/50 p-3.5 sm:p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase mb-1.5 font-mono">
                <Users className="w-4 h-4" />
                <span>Team / Class</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-medium">{project.teamName}</p>
            </div>

            <div className="bg-slate-950/50 p-3.5 sm:p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase mb-1.5 font-mono">
                <UserCheck className="w-4 h-4" />
                <span>Advisor</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-medium">{project.advisor}</p>
              <span className="text-[11px] text-slate-500 mt-0.5 block font-mono">Department of {project.major}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};