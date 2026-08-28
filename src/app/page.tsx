"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MajorSection } from "@/components/MajorSection";
import { FilterBar } from "@/components/FilterBar";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { PROJECTS_DATA, MAJORS_DATA } from "@/data/projects";
import { Project, MajorType, AcademicYear } from "@/types/project";
import { Layers, Info, Calendar, Sparkles } from "lucide-react";

export default function HomePage() {
  const [selectedMajor, setSelectedMajor] = useState<MajorType>("All");
  const [selectedYear, setSelectedYear] = useState<AcademicYear>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Client-side Filter Logic
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesMajor = selectedMajor === "All" || project.major === selectedMajor;
      
      const matchesYear =
        selectedYear === "All" ||
        project.year === selectedYear ||
        (selectedYear === "5th Year" && project.year.startsWith("5th Year"));

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === "" ||
        project.title.toLowerCase().includes(query) ||
        project.shortSummary.toLowerCase().includes(query) ||
        project.teamName.toLowerCase().includes(query) ||
        project.advisor.toLowerCase().includes(query);

      return matchesMajor && matchesYear && matchesSearch;
    });
  }, [selectedMajor, selectedYear, searchQuery]);

  const handleSelectMajorFromSection = (major: MajorType) => {
    setSelectedMajor(major);
    setSelectedYear("All");
    const showcaseSection = document.getElementById("showcase");
    if (showcaseSection) {
      showcaseSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Campus Drone Image */}
      <div className="fixed inset-0 h-full w-full -z-20 overflow-hidden">
        <Image
          src="/images/utycc-campus.jpg"
          alt="UTYCC Campus Landscape Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      
      {/* Dark Blur Overlay */}
      <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-[6px] -z-10" />

      {/* Sticky Header */}
      <Navbar />

      <main>
        {/* Hero Section */}
        <Hero onExploreClick={() => scrollToSection("showcase")} />

        {/* 5 Academic Majors Grid */}
        <MajorSection
          majors={MAJORS_DATA}
          selectedMajor={selectedMajor}
          onSelectMajor={handleSelectMajorFromSection}
        />

        {/* Project Showcase Directory */}
        <section id="showcase" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase mb-2">
                  <Layers className="w-4 h-4" />
                  <span>Showcase Directory</span>
                </div>
                <h2 className="text-3xl font-extrabold text-white">
                  Explore Student Projects
                </h2>
              </div>
              <p className="text-sm text-slate-400 mt-2 md:mt-0 font-light">
                Filter and browse innovative capstone and research projects by department and class
              </p>
            </div>

            {/* Filter Component */}
            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedMajor={selectedMajor}
              onSelectMajor={setSelectedMajor}
              selectedYear={selectedYear}
              onSelectYear={setSelectedYear}
              resultCount={filteredProjects.length}
            />

            {/* Dynamic Project Grid */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onSelect={(p) => setActiveModalProject(p)}
                  />
                ))}
              </div>
            ) : (
              <div className="glass-panel rounded-2xl p-12 text-center">
                <p className="text-slate-400 text-base mb-3 font-light">
                  No projects match your current filter criteria.
                </p>
                <button
                  onClick={() => {
                    setSelectedMajor("All");
                    setSelectedYear("All");
                    setSearchQuery("");
                  }}
                  className="text-xs font-mono font-semibold text-cyan-400 hover:underline cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 border-t border-white/5 bg-slate-950/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-panel p-8 sm:p-10 rounded-2xl space-y-6 text-slate-300">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Info className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">About UTYCC Project Show 2026</h3>
              </div>
              <p className="text-sm sm:text-base leading-relaxed font-light">
                The Annual Project Show at University of Technology (Yatanarpon Cyber City) is a premier academic event highlighting technological innovations, engineering capstone designs, and thesis research by talented engineering students across 5 core departments.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs sm:text-sm font-mono">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Date: August 31, 2026 (9:00 AM – 4:00 PM)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Venue: Main Campus Auditorium, UTYCC</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 bg-slate-950 text-center text-xs text-slate-500 font-mono">
        <p>© 2026 University of Technology, Yatanarpon Cyber City. All rights reserved.</p>
      </footer>

      {/* Modal Popup */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
}