"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Engineering", href: "/technologies" },
  { label: "Approach", href: "/process" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Don't show public nav inside home page (home uses dynamic island notch header) or /admin paths
  if (pathname === "/" || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="site-nav">
      <div className="wrap nav-inner">
        {/* Brand */}
        <Link href="/" className="brand shrink-0">
          <span className="brand-symbol">CMS</span>
          <span className="flex items-center gap-1 font-extrabold tracking-tight text-white text-xs sm:text-sm whitespace-nowrap">
            CROSS MOTIVE SERVICES
            <small className="hidden lg:inline font-mono text-[9px] tracking-[0.12em] text-[#aab6c2] ml-1">
              / DIGITAL ENGINEERING
            </small>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="nav-links hidden md:flex items-center gap-8 text-xs text-[#c5cdd4]" id="navLinks">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-200 hover:text-[var(--lime)] ${
                  isActive ? "text-[var(--lime)] font-semibold" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <Link href="/contact" className="nav-action hidden md:flex items-center gap-4 text-xs text-white group">
          <span className="group-hover:text-[var(--lime)] transition-colors">Let&apos;s talk</span>
          <span className="w-8 h-8 rounded-full border border-[#64717c] grid place-items-center text-sm transition-all duration-200 group-hover:bg-[var(--lime)] group-hover:border-[var(--lime)] group-hover:text-[var(--night)] group-hover:rotate-45">
            ↗
          </span>
        </Link>

        {/* Mobile Menu Toggle Button */}
        <button
          className="menu-toggle md:hidden text-white bg-transparent border-none text-2xl p-2 cursor-pointer"
          id="menuToggle"
          aria-label="Toggle navigation"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#17232f] border-b border-white/10 px-6 py-6 flex flex-col gap-4 text-white animate-in slide-in-from-top-2 duration-200 shadow-2xl">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium py-1.5 transition-colors ${
                  isActive ? "text-[var(--lime)] font-semibold" : "text-white/80 hover:text-[var(--lime)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full justify-center py-3 text-center font-bold text-sm"
            >
              Build with us <span>↗</span>
            </Link>
            <a
              href="mailto:sahith@crossmotiveservices.com"
              className="text-xs text-white/50 text-center hover:text-white transition-colors break-all"
            >
              sahith@crossmotiveservices.com
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
