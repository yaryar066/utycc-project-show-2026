import React, { useMemo } from "react";
import { Search, X } from "lucide-react";
import { MajorType, AcademicYear } from "@/types/project";
import { PROJECTS_DATA } from "@/data/projects";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedMajor: MajorType;
  onSelectMajor: (m: MajorType) => void;
  selectedYear: AcademicYear;
  onSelectYear: (y: AcademicYear) => void;
  resultCount: number;
}

const MAJORS_LIST: MajorType[] = ["All", "IST", "CE", "ECE", "PrE", "AME"];

const YEAR_HIERARCHY: AcademicYear[] = [
  "6th Year",
  "5th Year - 1st Sem",
  "5th Year - 2nd Sem",
  "5th Year",
  "4th Year",
  "3rd Year",
  "2nd Year",
  "1st Year",
];

const GLOBAL_CLEAN_YEARS: AcademicYear[] = [
  "All",
  "6th Year",
  "5th Year",
  "4th Year",
  "3rd Year",
  "2nd Year",
  "1st Year",
];

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedMajor,
  onSelectMajor,
  selectedYear,
  onSelectYear,
  resultCount,
}) => {
  const hasActiveFilter = searchQuery !== "" || selectedMajor !== "All" || selectedYear !== "All";

  // Dynamic Class/Year calculation
  const availableYears = useMemo(() => {
    if (selectedMajor === "All") {
      return GLOBAL_CLEAN_YEARS;
    }

    const majorProjects = PROJECTS_DATA.filter((p) => p.major === selectedMajor);
    const existingYears = new Set(
      majorProjects
        .map((p) => p.year)
        .filter((y) => y && y.trim() !== "")
    );
    
    const sorted = YEAR_HIERARCHY.filter((y) => existingYears.has(y));
    return ["All", ...sorted] as AcademicYear[];
  }, [selectedMajor]);

  const clearFilters = () => {
    onSearchChange("");
    onSelectMajor("All");
    onSelectYear("All");
  };

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5 mb-6 sm:mb-8 space-y-4 sm:space-y-5">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title, team, keywords, or advisor..."
          className="w-full pl-10 pr-9 py-2.5 sm:py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-xs sm:text-sm font-sans"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="flex flex-col space-y-3.5 sm:space-y-4">
        {/* Major Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
            [ Major ]
          </label>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {MAJORS_LIST.map((major) => (
              <button
                key={major}
                onClick={() => {
                  onSelectMajor(major);
                  onSelectYear("All");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-95 cursor-pointer font-mono ${
                  selectedMajor === major
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    : "bg-slate-900/60 text-slate-300 border border-white/10 hover:border-cyan-400/50 hover:text-white"
                }`}
              >
                {major}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Class & Semester Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
            [ Class & Semester ]
          </label>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {availableYears.map((year) => (
              <button
                key={year}
                onClick={() => onSelectYear(year)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all active:scale-95 cursor-pointer font-mono ${
                  selectedYear === year
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    : "bg-slate-900/60 text-slate-300 border border-white/10 hover:border-cyan-400/50 hover:text-white"
                }`}
              >
                {year === "" ? "All" : year}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-2.5 sm:pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
        <div>
          Showing <span className="text-cyan-400 font-bold">{resultCount}</span> projects
        </div>
        {hasActiveFilter && (
          <button
            onClick={clearFilters}
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 flex items-center gap-1 cursor-pointer"
          >
            Reset All Filters
          </button>
        )}
      </div>
    </div>
  );
};