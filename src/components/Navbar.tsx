"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const [logoError, setLogoError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/#hero" },
    { name: "Majors", href: "/#majors" },
    { name: "Showcase", href: "/#showcase" },
    { name: "Get Badge", href: "/badge" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyan-500/25 bg-slate-950/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & University Branding */}
          <Link 
            href="/" 
            className="flex items-center gap-3 min-w-0 group cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-cyan-400/50 overflow-hidden flex-shrink-0 bg-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all">
              {!logoError ? (
                <Image
                  src="/logos/utycc.png"
                  alt="UTYCC Crest"
                  fill
                  sizes="48px"
                  priority
                  className="object-cover"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-900">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex flex-col justify-center">
              <span className="text-sm sm:text-base font-extrabold text-white tracking-wide truncate group-hover:text-cyan-300 transition-colors uppercase leading-tight">
                UTYCC PROJECT SHOW
              </span>
              <span className="text-[10px] sm:text-xs text-cyan-400 font-semibold tracking-wider leading-tight mt-0.5">
                AUGUST 31, 2026
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2 font-bold">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-xl text-sm transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.35)]"
                      : "text-slate-300 hover:text-white hover:bg-cyan-500/15 hover:border hover:border-cyan-400/30 border border-transparent active:scale-95"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 focus:outline-none transition-all cursor-pointer active:scale-90"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-cyan-400" />
              ) : (
                <Menu className="w-5 h-5 text-cyan-400" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-cyan-500/20 bg-slate-950/95 backdrop-blur-2xl px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    : "text-slate-300 hover:bg-cyan-500/15 hover:text-cyan-300 hover:border hover:border-cyan-400/30"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};