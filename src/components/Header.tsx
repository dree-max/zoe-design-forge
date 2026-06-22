"use client";

import { useState, useEffect } from "react";
import { brand, navItems } from "@/data/site";
import Link from "next/link";
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-site flex items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src={scrolled ? "/icon-black.png" : "/icon-white.png"}
            alt="Zoe Designs Icon"
            className="h-10 w-auto transition-all duration-300"
          />
          <h1
            className={`text-xl font-bold tracking-[2px] uppercase transition-colors duration-300 font-body ${
              scrolled ? "text-brand-dark" : "text-white"
            }`}
          >
            ZOE DESIGN FORGE<span className="text-brand-orange">.</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link px-4 py-2 ${
                scrolled ? "text-brand-dark" : "text-white/90"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-4 bg-brand-orange text-white px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-brand-orange-hover transition-colors"
          >
            Start a Project
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`lg:hidden text-3xl transition-colors ${
            scrolled ? "text-brand-dark" : "text-white"
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <i className={mobileOpen ? "bi bi-x" : "bi bi-list"}></i>
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/95 z-[-1] transition-all duration-300 ${
          mobileOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white text-2xl uppercase tracking-wider hover:text-brand-orange transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}