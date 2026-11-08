"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/" || pathname.startsWith("/admin")) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="wrap">
        {/* Main 4-Column Grid */}
        <div className="footer-grid">
          {/* Column 1: Brand & Studio Mission */}
          <div className="footer-brand-col">
            <Link className="brand" href="/">
              <span className="brand-symbol">CMS</span>
              <span className="text-white font-extrabold tracking-tight">
                CROSS MOTIVE SERVICES
              </span>
            </Link>

            <p>
              From early-stage startup concepts to enterprise-grade platforms, we design,
              engineer, and launch digital experiences built for real-world impact.
            </p>

            <div className="footer-status-pill">
              <span className="w-2 h-2 rounded-full bg-[var(--lime)] animate-pulse" />
              <span>BOOKING Q4 &amp; Q1 ENGAGEMENTS</span>
            </div>

            <div className="text-xs font-mono text-[#8c9da8] space-y-1 pt-2">
              <div>
                Direct:{" "}
                <a
                  href="mailto:sahith@crossmotiveservices.com"
                  className="text-white hover:text-[var(--lime)] underline transition-colors break-all"
                >
                  sahith@crossmotiveservices.com
                </a>
              </div>
              <div className="text-[#697885]">Bangalore · Global Remote Delivery</div>
            </div>
          </div>

          {/* Column 2: Core Services */}
          <div className="footer-col">
            <h5>Services</h5>
            <ul>
              <li>
                <Link href="/services/web-development">Web Applications</Link>
              </li>
              <li>
                <Link href="/services/mobile-app-development">Mobile Apps</Link>
              </li>
              <li>
                <Link href="/services/erp-crm-solutions">ERP &amp; CRM Solutions</Link>
              </li>
              <li>
                <Link href="/services/enterprise-solutions">Enterprise Systems</Link>
              </li>
              <li>
                <Link href="/services/ai-product-development">AI &amp; Automation</Link>
              </li>
              <li>
                <Link href="/services/ui-ux-design">UI/UX &amp; Product Design</Link>
              </li>
              <li>
                <Link href="/services/mvp-development">Startup MVP Development</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions & Architecture */}
          <div className="footer-col">
            <h5>Solutions &amp; Stack</h5>
            <ul>
              <li>
                <Link href="/solutions/startups">For Startups</Link>
              </li>
              <li>
                <Link href="/solutions/enterprise">For Enterprises</Link>
              </li>
              <li>
                <Link href="/solutions/businesses">For Businesses</Link>
              </li>
              <li>
                <Link href="/solutions/individuals">For Individuals &amp; Creators</Link>
              </li>
              <li>
                <Link href="/technologies">Engineering Architecture</Link>
              </li>
              <li>
                <Link href="/process">Product Methodology</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company & Legal */}
          <div className="footer-col">
            <h5>Company &amp; Legal</h5>
            <ul>
              <li>
                <Link href="/work">Selected Work</Link>
              </li>
              <li>
                <Link href="/about">About Cross Motive</Link>
              </li>
              <li>
                <Link href="/contact">Start a Project ↗</Link>
              </li>
              <li>
                <Link href="/faq">Frequently Asked Questions</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms &amp; Conditions</Link>
              </li>
              <li>
                <Link href="/admin" className="text-[#697885] hover:text-white">
                  Content Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Signature Bar */}
        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} Cross Motive Services. All rights reserved.
          </div>

          <div className="hidden md:inline-block tracking-wider text-[#7e8e9b]">
            DESIGN / ENGINEERING / DELIVERY &middot; 100% CODE OWNERSHIP
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-[#aebac5] hover:text-[var(--lime)] transition-colors cursor-pointer bg-transparent border-none"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <span>&uarr;</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
