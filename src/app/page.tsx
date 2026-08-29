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
} from "lucide-react";

export default function HomePage() {
  const [selectedMajor, setSelectedMajor] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "team">("overview");

  const [majorLogoErrors, setMajorLogoErrors] = useState<Record<string, boolean>>({});

  const majorFilters = ["All", "IST", "CE", "ECE", "PrE", "AME"];

  const yearFilters = [
    "All",
    "6th Year",
    "5th Year - 1st Sem",
    "5th Year - 2nd Sem",
    "4th Year",
    "3rd Year",
    "2nd Year",
    "1st Year",
  ];

  const getMajorFallbackIcon = (code: string) => {
    switch (code) {
      case "IST":
        return <Code2 className="w-6 h-6 text-cyan-400" />;
      case "CE":
        return <Cpu className="w-6 h-6 text-cyan-400" />;
      case "ECE":
        return <Radio className="w-6 h-6 text-cyan-400" />;
      case "PrE":
        return <Wrench className="w-6 h-6 text-cyan-400" />;
      case "AME":
        return <Atom className="w-6 h-6 text-cyan-400" />;
      default:
        return <Code2 className="w-6 h-6 text-cyan-400" />;
    }
  };

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesMajor =
        selectedMajor === "All" ||
        project.major.toUpperCase() === selectedMajor.toUpperCase();

      const matchesYear =
        selectedYear === "All" || project.year === selectedYear;

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
      {/* Background Campus Drone Wallpaper */}
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

      {/* Dark Ambient Blur Overlay */}
      <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-[8px] -z-10" />

      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 w-full">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION */}
        {/* ========================================================================= */}
        <section id="hero" className="text-center py-6 sm:py-12 flex flex-col items-center">
          
          {/* Circular Masked University Crest */}
          <div className="relative mb-5 group">
            <div className="absolute inset-0 rounded-full bg-cyan-400/35 blur-xl group-hover:bg-cyan-400/55 transition-all duration-500 scale-125" />
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full border-2 border-cyan-400 bg-white shadow-[0_0_30px_rgba(6,182,212,0.5)] overflow-hidden flex items-center justify-center p-1.5">
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

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 text-[11px] sm:text-sm font-semibold tracking-wide uppercase mb-4 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            <span>STATUS: ANNUAL GRAND EXHIBITION • AUGUST 31, 2026</span>
          </div>

          <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase max-w-4xl mx-auto leading-tight">
            UTYCC PROJECT SHOWCASE{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
              2026
            </span>
          </h1>

          <p className="text-xs sm:text-base text-slate-300 mt-3 max-w-2xl mx-auto font-light leading-relaxed px-2">
            Pioneering the Future of Technology: Advanced Engineering, Artificial Intelligence, Robotics, and Materials Science Research Innovations.
          </p>

          {/* Action Buttons in Hero */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full px-2">
            <a
              href="https://vote.utyccfresher.online"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 hover:from-teal-300 hover:to-cyan-300 text-slate-950 font-bold text-xs sm:text-sm tracking-wide uppercase transition-all shadow-[0_0_25px_rgba(6,182,212,0.5)] active:scale-95 flex items-center justify-center cursor-pointer"
            >
              VOTE FOR PROJECTS
            </a>

            <a
              href="#showcase"
              className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl bg-slate-900/90 border border-cyan-500/40 text-cyan-300 hover:border-cyan-400 font-bold text-xs sm:text-sm tracking-wide uppercase transition-all active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.2)] text-center"
            >
              EXPLORE DIRECTORY
            </a>

            <Link
              href="/badge"
              className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl bg-slate-900/90 border border-cyan-500/40 text-cyan-300 hover:border-cyan-400 font-bold text-xs sm:text-sm tracking-wide uppercase transition-all active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.2)] text-center"
            >
              GET MEMORY PASS
            </Link>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. CAMPUS SHOWCASE BANNER (Mobile Optimized Aspect Ratio & Badge) */}
        {/* ========================================================================= */}
        <section className="py-4 sm:py-8 w-full">
          <div className="relative w-full aspect-[16/10] sm:aspect-auto sm:h-80 md:h-96 rounded-2xl sm:rounded-3xl overflow-hidden border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.25)] group">
            <Image
              src="/images/utycc-campus.jpg"
              alt="UTYCC Campus Main Research Facility"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/20 pointer-events-none" />

            {/* Mobile Fixed Label */}
            <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:bottom-5 sm:left-5 z-10">
              <span className="w-full sm:w-auto px-3 py-1.5 rounded-xl sm:rounded-full bg-slate-950/85 backdrop-blur-md border border-cyan-400/40 text-cyan-300 font-mono text-[9px] sm:text-[11px] font-bold uppercase tracking-wider shadow-lg flex items-center justify-center sm:justify-start gap-1.5 text-center leading-tight">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
                <span>UTYCC MAIN RESEARCH CAMPUS • PYIN OO LWIN</span>
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. MAJORS OVERVIEW SECTION */}
        {/* ========================================================================= */}
        <section id="majors" className="py-8 sm:py-10 border-t border-cyan-500/20">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-2xl font-bold uppercase text-white tracking-wide">
              Engineering Disciplines
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select a specialized department to filter student research & innovations
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {MAJORS_DATA.map((major) => {
              const isSelected = selectedMajor === major.code;
              const hasError = majorLogoErrors[major.code];
              const isDarkLogo = major.code === "AME";

              return (
                <div
                  key={major.code}
                  onClick={() => {
                    setSelectedMajor(major.code);
                    const el = document.getElementById("showcase");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`cyber-card p-5 sm:p-6 rounded-2xl cursor-pointer transition-all ${
                    isSelected
                      ? "border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.4)] bg-cyan-950/30 scale-[1.02]"
                      : "hover:border-cyan-400/60"
                  }`}
                >
                  <div
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-cyan-400/80 shadow-[0_0_15px_rgba(6,182,212,0.25)] mb-3 sm:mb-4 overflow-hidden flex items-center justify-center p-1.5 ${
                      isDarkLogo ? "bg-slate-950" : "bg-white"
                    }`}
                  >
                    {!hasError ? (
                      <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                        <Image
                          src={`/logos/${major.code.toLowerCase()}.png`}
                          alt={`${major.code} Official Logo`}
                          fill
                          sizes="56px"
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

                  <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
                    {major.code}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 leading-snug">
                    {major.fullName}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {major.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SHOWCASE & FILTER SECTION */}
        {/* ========================================================================= */}
        <section id="showcase" className="py-8 sm:py-12 border-t border-cyan-500/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
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

          {/* Filter Bar */}
          <div className="glass-panel border border-cyan-500/25 rounded-2xl p-4 sm:p-5 mb-8 space-y-4">
            {/* Major Filter */}
            <div>
              <div className="text-[10px] sm:text-[11px] font-mono font-bold text-cyan-400 tracking-wider uppercase mb-2">
                [ MAJOR ]
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {majorFilters.map((major) => {
                  const isActive = selectedMajor === major;
                  return (
                    <button
                      key={major}
                      onClick={() => setSelectedMajor(major)}
                      className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
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

            {/* Class & Semester Filter */}
            <div>
              <div className="text-[10px] sm:text-[11px] font-mono font-bold text-cyan-400 tracking-wider uppercase mb-2">
                [ CLASS & SEMESTER ]
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {yearFilters.map((year) => {
                  const isActive = selectedYear === year;
                  return (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-mono font-bold transition-all cursor-pointer ${
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

            {/* Total Results & Reset */}
            <div className="flex items-center justify-between pt-3 border-t border-cyan-500/15 text-xs font-mono">
              <span className="text-slate-300 text-[11px] sm:text-xs">
                Showing <span className="font-bold text-cyan-400">{filteredProjects.length}</span> projects
              </span>
              <button
                onClick={handleResetFilters}
                className="text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer transition-colors text-[11px] sm:text-xs"
              >
                Reset All Filters
              </button>
            </div>
          </div>

          {/* PROJECTS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => {
                  setSelectedProject(project);
                  setActiveTab("overview");
                }}
                className="group relative rounded-3xl bg-slate-900/80 border border-cyan-500/25 hover:border-cyan-400/80 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Image & Badges */}
                <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-950">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-mono text-slate-500">
                      UTYCC PROJECT
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/40 pointer-events-none" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-[10px] sm:text-[11px] font-bold">
                      {project.major}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-[10px] sm:text-[11px] font-bold">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1.5 sm:mt-2 line-clamp-2 font-light leading-relaxed">
                      {project.shortSummary || project.fullDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-cyan-500/15 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300 font-mono text-[10px] sm:text-[11px] truncate max-w-[200px]">
                      <Users className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span className="truncate">
                        {project.teamName || project.teamMembers?.[0] || "Engineering Team"}
                      </span>
                    </div>

                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950 flex items-center justify-center transition-all shadow-sm flex-shrink-0">
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16 glass-panel border border-cyan-500/25 rounded-3xl mt-6">
              <p className="text-slate-300 text-xs sm:text-sm font-mono">
                No projects found matching the selected filter criteria.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-6 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs font-mono tracking-wider uppercase cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* ========================================================================= */}
      {/* 5. PROJECT SPECIFICATION MODAL */}
      {/* ========================================================================= */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 lg:p-6 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
          <div
            className="relative w-full max-w-4xl bg-slate-900 border border-cyan-500/40 rounded-none sm:rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden flex flex-col max-h-screen sm:max-h-[90vh] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Banner */}
            <div className="relative w-full h-48 sm:h-72 bg-gradient-to-br from-cyan-950 via-slate-900 to-slate-950 flex items-end p-5 sm:p-8 overflow-hidden flex-shrink-0 border-b border-cyan-500/20">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 sm:px-3 py-1 rounded-full bg-cyan-500 text-slate-950 font-extrabold text-[10px] sm:text-xs tracking-wider uppercase shadow-[0_0_12px_rgba(6,182,212,0.5)]">
                    {selectedProject.major}
                  </span>
                  <span className="px-2.5 sm:px-3 py-1 rounded-full bg-slate-950/80 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] sm:text-xs">
                    {selectedProject.year}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full bg-slate-950/80 border border-cyan-500/30 text-slate-300 hover:text-white hover:border-cyan-400 transition-all cursor-pointer active:scale-90"
                  aria-label="Close detail modal"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              <div className="relative z-10 max-w-2xl">
                <span className="text-[11px] sm:text-sm font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                  Department of {selectedProject.major}
                </span>
                <h2 className="text-lg sm:text-3xl font-black text-white leading-tight uppercase">
                  {selectedProject.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 sm:mt-2 line-clamp-2 font-light">
                  {selectedProject.shortSummary}
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-5 sm:space-y-6">
              <div className="flex items-center">
                <a
                  href="https://vote.utyccfresher.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-xl bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wide flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.4)] active:scale-95 transition-all text-center"
                >
                  VOTE FOR THIS PROJECT
                </a>
              </div>

              <div className="flex items-center gap-2 border-b border-cyan-500/20 pb-3">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "overview"
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Overview</span>
                </button>

                <button
                  onClick={() => setActiveTab("features")}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "features"
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Specs</span>
                </button>

                <button
                  onClick={() => setActiveTab("team")}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "team"
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Team</span>
                </button>
              </div>

              {/* Tab 1: Overview */}
              {activeTab === "overview" && (
                <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-150">
                  <div>
                    <h4 className="text-[11px] sm:text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 font-mono">
                      Project Abstract & Summary
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                      {selectedProject.fullDescription || selectedProject.shortSummary}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/60 border border-cyan-500/25">
                      <span className="text-[10px] sm:text-[11px] font-mono text-cyan-400 block mb-1">
                        ACADEMIC DEPARTMENT
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-white">
                        {selectedProject.major} Engineering Faculty
                      </p>
                    </div>

                    <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/60 border border-cyan-500/25">
                      <span className="text-[10px] sm:text-[11px] font-mono text-cyan-400 block mb-1">
                        CLASS & YEAR
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-white">
                        {selectedProject.year}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Specifications */}
              {activeTab === "features" && (
                <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-150">
                  <div>
                    <h4 className="text-[11px] sm:text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 sm:mb-3 font-mono">
                      Project Scope & Key Highlights
                    </h4>
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/60 border border-cyan-500/25 text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {selectedProject.shortSummary}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[11px] sm:text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 sm:mb-3 font-mono">
                      Faculty & Exhibition Details
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs text-cyan-300 font-mono">
                        {selectedProject.major}
                      </span>
                      <span className="px-3 py-1 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs text-cyan-300 font-mono">
                        {selectedProject.year}
                      </span>
                      <span className="px-3 py-1 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs text-cyan-300 font-mono">
                        UTYCC 2026
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Team */}
              {activeTab === "team" && (
                <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-150">
                  <div>
                    <h4 className="text-[11px] sm:text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 sm:mb-3 font-mono">
                      Project Author(s) / Team
                    </h4>
                    <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/60 border border-cyan-500/25 flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center font-bold text-cyan-300 text-xs sm:text-sm flex-shrink-0">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-white truncate">
                          {selectedProject.teamName || selectedProject.teamMembers?.join(", ") || "Engineering Student Group"}
                        </p>
                        <span className="text-[10px] sm:text-[11px] text-slate-400 block truncate">
                          {selectedProject.year} • Department of {selectedProject.major}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[11px] sm:text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 font-mono">
                      Faculty Advisor / Supervisor
                    </h4>
                    <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/60 border border-cyan-500/25 flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center font-bold text-teal-300 text-xs sm:text-sm flex-shrink-0">
                        <UserCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-white truncate">
                          {selectedProject.advisor || "Faculty of " + selectedProject.major}
                        </p>
                        <span className="text-[10px] sm:text-[11px] text-slate-400 block truncate">
                          Department Advisor & Reviewer
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
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