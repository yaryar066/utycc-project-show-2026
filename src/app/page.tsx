"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { PROJECTS_DATA, MAJORS_DATA } from "@/data/projects";
import { Project } from "@/types/project";
import {
  Search,
  Users,
  Layers,
  FileText,
  X,
  Code2,
  Cpu,
  Radio,
  Atom,
  Wrench,
  ArrowUpRight,
  UserCheck,
  Camera,
} from "lucide-react";

export default function HomePage() {
  const [selectedMajor, setSelectedMajor] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "team">("overview");

  const [majorLogoErrors, setMajorLogoErrors] = useState<Record<string, boolean>>({});

  const majorFilters = ["All", "IST", "CE", "ECE", "PrE", "AME"];

  const standardYearOrder = [
    "6th Year",
    "5th Year",
    "5th Year - 1st Sem",
    "5th Year - 2nd Sem",
    "4th Year",
    "3rd Year",
    "2nd Year",
    "1st Year",
    "Other",
  ];

  const dynamicYearFilters = useMemo(() => {
    const projectsInMajor =
      selectedMajor === "All"
        ? PROJECTS_DATA
        : PROJECTS_DATA.filter(
            (p) => p.major.toUpperCase() === selectedMajor.toUpperCase()
          );

    const availableYearsSet = new Set(projectsInMajor.map((p) => p.year));
    const activeYears = standardYearOrder.filter((y) => availableYearsSet.has(y));

    return ["All", ...activeYears];
  }, [selectedMajor]);

  const handleMajorSelect = (major: string) => {
    setSelectedMajor(major);
    const projectsInNewMajor =
      major === "All"
        ? PROJECTS_DATA
        : PROJECTS_DATA.filter(
            (p) => p.major.toUpperCase() === major.toUpperCase()
          );
    const availableYearsSet = new Set(projectsInNewMajor.map((p) => p.year));

    if (selectedYear !== "All" && !availableYearsSet.has(selectedYear)) {
      setSelectedYear("All");
    }
  };

  const getMajorFallbackIcon = (code: string) => {
    switch (code) {
      case "IST": return <Code2 className="w-6 h-6 text-cyan-400" />;
      case "CE": return <Cpu className="w-6 h-6 text-cyan-400" />;
      case "ECE": return <Radio className="w-6 h-6 text-cyan-400" />;
      case "PrE": return <Wrench className="w-6 h-6 text-cyan-400" />;
      case "AME": return <Atom className="w-6 h-6 text-cyan-400" />;
      default: return <Code2 className="w-6 h-6 text-cyan-400" />;
    }
  };

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesMajor =
        selectedMajor === "All" ||
        project.major.toUpperCase() === selectedMajor.toUpperCase();

      const matchesYear =
        selectedYear === "All" ||
        project.year === selectedYear ||
        (project.year === "All" && selectedYear === "All");

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.shortSummary?.toLowerCase().includes(query) ||
        project.fullDescription?.toLowerCase().includes(query) ||
        project.teamName?.toLowerCase().includes(query) ||
        project.advisor?.toLowerCase().includes(query);

      return matchesMajor && matchesYear && matchesSearch;
    });
  }, [selectedMajor, selectedYear, searchQuery]);

  const handleResetFilters = () => {
    setSelectedMajor("All");
    setSelectedYear("All");
    setSearchQuery("");
  };

  return (
    <div className="relative min-h-screen text-white flex flex-col font-sans">
      <div className="fixed inset-0 h-full w-full -z-20 overflow-hidden">
        <Image
          src="/images/utycc-campus.jpg"
          alt="UTYCC Campus Landscape Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
      </div>

      <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-[8px] -z-10" />

      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* HERO SECTION */}
        <section id="hero" className="text-center py-8 sm:py-12 flex flex-col items-center">
          <div className="relative mb-5 group">
            <div className="absolute inset-0 rounded-full bg-cyan-400/35 blur-xl group-hover:bg-cyan-400/55 transition-all duration-500 scale-125" />
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-cyan-400 bg-white shadow-[0_0_30px_rgba(6,182,212,0.5)] overflow-hidden flex items-center justify-center p-1.5">
              <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                <Image
                  src="/logos/utycc.png"
                  alt="UTYCC Crest"
                  fill
                  priority
                  sizes="112px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-wide">
              University of Technology
            </h2>
            <span className="text-sm sm:text-base md:text-lg font-extrabold text-cyan-300 tracking-widest block uppercase mt-1">
              (YATANARPON CYBER CITY)
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Innovative Projects{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300 block sm:inline">
              Exhibition – 2026
            </span>
          </h1>

          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-cyan-500/50 bg-cyan-950/50 text-cyan-300 text-xs sm:text-sm font-bold tracking-widest uppercase mt-4 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>31ST AUGUST 2026</span>
          </div>

          <p className="text-sm sm:text-base text-slate-300 mt-4 max-w-2xl mx-auto font-light leading-relaxed">
            Pioneering the Future of Technology: Advanced Engineering, Artificial Intelligence, Robotics, and Materials Science Research Innovations.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://project-voting-utycc.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 hover:from-teal-300 hover:to-cyan-300 text-slate-950 font-bold text-sm tracking-wide uppercase transition-all shadow-[0_0_25px_rgba(6,182,212,0.5)] active:scale-95 flex items-center justify-center cursor-pointer"
            >
              VOTE FOR PROJECTS
            </a>

            <a
              href="#showcase"
              className="px-7 py-3.5 rounded-2xl bg-slate-900/90 border border-cyan-500/40 text-cyan-300 hover:border-cyan-400 font-bold text-sm tracking-wide uppercase transition-all active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
            >
              EXPLORE DIRECTORY
            </a>

            <Link
              href="/badge"
              className="px-7 py-3.5 rounded-2xl bg-slate-900/90 border border-cyan-500/40 text-cyan-300 hover:border-cyan-400 font-bold text-sm tracking-wide uppercase transition-all active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
            >
              GET MEMORY PASS
            </Link>
          </div>
        </section>

        {/* CAMPUS SHOWCASE BANNER */}
        <section className="py-6 sm:py-8 w-full">
          <div className="relative w-full h-56 sm:h-80 md:h-96 rounded-3xl overflow-hidden border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.25)] group">
            <Image
              src="/images/utycc-campus.jpg"
              alt="University of Technology (Yatanarpon Cyber City) Campus Architecture"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30 pointer-events-none" />
            <div className="absolute inset-0 bg-cyan-950/20 mix-blend-overlay pointer-events-none" />

            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10">
              <span className="px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-400/40 text-cyan-300 font-mono text-[11px] font-bold uppercase tracking-wider shadow-lg inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                UTYCC MAIN RESEARCH CAMPUS • PYIN OO LWIN
              </span>
            </div>
          </div>
        </section>

        {/* MAJORS OVERVIEW SECTION */}
        <section id="majors" className="py-8 border-t border-cyan-500/20">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-white tracking-wide">
              Engineering Disciplines
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select a specialized department to filter student research & innovations
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
            {MAJORS_DATA.map((major) => {
              const isSelected = selectedMajor === major.code;
              const hasError = majorLogoErrors[major.code];
              const isDarkLogo = major.code === "AME";

              return (
                <div
                  key={major.code}
                  onClick={() => {
                    handleMajorSelect(major.code);
                    const el = document.getElementById("showcase");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`cyber-card p-5 rounded-2xl cursor-pointer transition-all flex flex-col justify-start h-full min-h-[215px] sm:min-h-[225px] ${
                    isSelected
                      ? "border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.4)] bg-cyan-950/30 scale-[1.02]"
                      : "hover:border-cyan-400/60"
                  }`}
                >
                  <div
                    className={`relative w-12 h-12 rounded-full border-2 border-cyan-400/80 shadow-[0_0_15px_rgba(6,182,212,0.25)] mb-3 overflow-hidden flex items-center justify-center p-1 flex-shrink-0 ${
                      isDarkLogo ? "bg-slate-950" : "bg-white"
                    }`}
                  >
                    {!hasError ? (
                      <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                        <Image
                          src={`/logos/${major.code.toLowerCase()}.png`}
                          alt={`${major.code} Official Logo`}
                          fill
                          sizes="48px"
                          className="object-contain"
                          onError={() =>
                            setMajorLogoErrors((prev) => ({ ...prev, [major.code]: true }))
                          }
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-900 rounded-full">
                        {getMajorFallbackIcon(major.code)}
                      </div>
                    )}
                  </div>

                  <span className="text-[11px] font-mono font-bold text-cyan-400 tracking-wider">
                    {major.code}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 leading-snug">
                    {major.fullName}
                  </h3>
                  
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {major.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* SHOWCASE & FILTER SECTION */}
        <section id="showcase" className="py-12 border-t border-cyan-500/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                Student Projects Directory
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore innovations across 5 engineering faculties • Click card for full specifications
              </p>
            </div>

            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search title, tech, team or supervisor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-all font-sans"
              />
            </div>
          </div>

          <div className="glass-panel border border-cyan-500/25 rounded-2xl p-5 mb-8 space-y-4">
            <div>
              <div className="text-[11px] font-mono font-bold text-cyan-400 tracking-wider uppercase mb-2">
                [ MAJOR ]
              </div>
              <div className="flex flex-wrap gap-2">
                {majorFilters.map((major) => {
                  const isActive = selectedMajor === major;
                  return (
                    <button
                      key={major}
                      onClick={() => handleMajorSelect(major)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                        isActive
                          ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-105"
                          : "bg-slate-900 border border-cyan-500/30 text-slate-300 hover:text-white hover:border-cyan-400"
                      }`}
                    >
                      {major}
                    </button>
                  );
                })}
              </div>
            </div>

            {dynamicYearFilters.length > 1 && (
              <div>
                <div className="text-[11px] font-mono font-bold text-cyan-400 tracking-wider uppercase mb-2">
                  [ CLASS & SEMESTER ]
                </div>
                <div className="flex flex-wrap gap-2">
                  {dynamicYearFilters.map((year) => {
                    const isActive = selectedYear === year;
                    return (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                          isActive
                            ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-105"
                            : "bg-slate-900 border border-cyan-500/30 text-slate-300 hover:text-white hover:border-cyan-400"
                        }`}
                      >
                        {year}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-cyan-500/15 text-xs font-mono">
              <span className="text-slate-300">
                Showing <span className="font-bold text-cyan-400">{filteredProjects.length}</span> projects
              </span>
              <button
                onClick={handleResetFilters}
                className="text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => {
                  setSelectedProject(project);
                  setActiveTab("overview");
                }}
                className="group relative rounded-3xl bg-slate-900/90 border border-cyan-500/30 hover:border-cyan-400 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="relative w-full h-52 overflow-hidden bg-slate-950 flex-shrink-0 flex items-center justify-center">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const rawId = project.id;
                      if (target.src.includes("/projects/")) {
                        target.src = `/images/projects/${rawId}.png`;
                      } else if (target.src.includes("/images/projects/")) {
                        target.src = `/images/${rawId}.png`;
                      } else if (target.src.endsWith(".png")) {
                        target.src = `/projects/${rawId}.jpg`;
                      } else {
                        target.src = "/images/utycc-campus.jpg";
                      }
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30 pointer-events-none" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 text-cyan-300 font-mono text-[11px] font-bold">
                      {project.major}
                    </span>
                    {project.year !== "All" && (
                      <span className="px-2.5 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 text-cyan-300 font-mono text-[11px] font-bold">
                        {project.year}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2 line-clamp-2 font-light leading-relaxed">
                      {project.shortSummary || project.fullDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-cyan-500/15 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-300 font-mono text-[11px] truncate max-w-[210px]">
                      {project.teamName ? (
                        <>
                          <Users className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                          <span className="truncate">{project.teamName}</span>
                        </>
                      ) : (
                        <span className="text-cyan-400 font-bold tracking-wide">
                          {project.major} Faculty
                        </span>
                      )}
                    </div>

                    <div className="w-8 h-8 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950 flex items-center justify-center transition-all shadow-sm flex-shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 glass-panel border border-cyan-500/25 rounded-3xl mt-6">
              <p className="text-slate-300 text-sm font-mono">
                No projects found matching the selected filter criteria.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs font-mono tracking-wider uppercase cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* PROJECT SPECIFICATION MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 lg:p-6 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
          <div
            className="relative w-full max-w-4xl bg-slate-900 border border-cyan-500/40 rounded-none sm:rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden flex flex-col max-h-screen sm:max-h-[90vh] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full bg-gradient-to-br from-cyan-950 via-slate-900 to-slate-950 flex flex-col justify-end p-6 sm:p-8 overflow-hidden flex-shrink-0 border-b border-cyan-500/20">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

              <div className="flex items-center justify-between z-20 mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-500 text-slate-950 font-extrabold text-xs tracking-wider uppercase shadow-[0_0_12px_rgba(6,182,212,0.5)]">
                    {selectedProject.major}
                  </span>
                  {selectedProject.year !== "All" && (
                    <span className="px-3 py-1 rounded-full bg-slate-950/80 border border-cyan-500/30 text-cyan-300 font-mono text-xs">
                      {selectedProject.year}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2.5 rounded-full bg-slate-950/80 border border-cyan-500/30 text-slate-300 hover:text-white hover:border-cyan-400 transition-all cursor-pointer active:scale-90"
                  aria-label="Close detail modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative z-10 max-w-2xl">
                <span className="text-xs sm:text-sm font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                  Department of {selectedProject.major}
                </span>
                <h2 className="text-xl sm:text-3xl font-black text-white leading-tight uppercase">
                  {selectedProject.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 line-clamp-2 font-light">
                  {selectedProject.shortSummary}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              <div className="flex items-center">
                <a
                  href="https://project-voting-utycc.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wide flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.4)] active:scale-95 transition-all"
                >
                  VOTE FOR THIS PROJECT
                </a>
              </div>

              {selectedProject.image && (
                <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-950 shadow-[0_0_25px_rgba(6,182,212,0.2)] group">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const rawId = selectedProject.id;
                      if (target.src.includes("/projects/")) {
                        target.src = `/images/projects/${rawId}.png`;
                      } else if (target.src.includes("/images/projects/")) {
                        target.src = `/images/${rawId}.png`;
                      } else if (target.src.endsWith(".png")) {
                        target.src = `/projects/${rawId}.jpg`;
                      } else {
                        target.src = "/images/utycc-campus.jpg";
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-cyan-400/40 text-cyan-300 font-mono text-[11px] font-bold uppercase inline-flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-cyan-400" />
                      PROJECT EXHIBIT PHOTO
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 border-b border-cyan-500/20 pb-3">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === "overview"
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Overview</span>
                </button>

                <button
                  onClick={() => setActiveTab("features")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === "features"
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Specifications</span>
                </button>

                <button
                  onClick={() => setActiveTab("team")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === "team"
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Faculty & Advisor</span>
                </button>
              </div>

              {activeTab === "overview" && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div>
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 font-mono">
                      Project Abstract & Summary
                    </h4>
                    <p className="text-sm text-slate-200 leading-relaxed font-light">
                      {selectedProject.fullDescription || selectedProject.shortSummary}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-cyan-500/25">
                      <span className="text-[11px] font-mono text-cyan-400 block mb-1">
                        ACADEMIC DEPARTMENT
                      </span>
                      <p className="text-sm font-bold text-white">
                        {selectedProject.major} Engineering Faculty
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-cyan-500/25">
                      <span className="text-[11px] font-mono text-cyan-400 block mb-1">
                        CLASS & YEAR
                      </span>
                      <p className="text-sm font-bold text-white">
                        {selectedProject.year !== "All" ? selectedProject.year : `${selectedProject.major} Department`}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "features" && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div>
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 font-mono">
                      Project Scope & Key Highlights
                    </h4>
                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-cyan-500/25 text-sm text-slate-200 leading-relaxed">
                      {selectedProject.shortSummary}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 font-mono">
                      Faculty & Exhibition Details
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs text-cyan-300 font-mono">
                        {selectedProject.major}
                      </span>
                      {selectedProject.year !== "All" && (
                        <span className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs text-cyan-300 font-mono">
                          {selectedProject.year}
                        </span>
                      )}
                      <span className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs text-cyan-300 font-mono">
                        EXHIBITION 2026
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "team" && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  {selectedProject.teamName ? (
                    <div>
                      <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 font-mono">
                        Project Author(s) / Team
                      </h4>
                      <div className="p-4 rounded-xl bg-slate-950/60 border border-cyan-500/25 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center font-bold text-cyan-300 text-sm">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">
                            {selectedProject.teamName}
                          </p>
                          <span className="text-[11px] text-slate-400">
                            {selectedProject.year !== "All" ? selectedProject.year : ""} • Department of {selectedProject.major}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div>
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 font-mono">
                      Faculty / Department
                    </h4>
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-cyan-500/25 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center font-bold text-teal-300 text-sm">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          {selectedProject.advisor || "Faculty of " + selectedProject.major}
                        </p>
                        <span className="text-[11px] text-slate-400">
                          Department Faculty & Supervisors
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 sm:p-6 bg-slate-950/90 border-t border-cyan-500/20 flex items-center justify-between">
              <span className="text-xs text-slate-400 hidden sm:inline">
                Click anywhere outside or press Close to return
              </span>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer ml-auto"
              >
                Close Specification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}