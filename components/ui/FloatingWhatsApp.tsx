"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";

export function FloatingWhatsApp() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  // Do not show on admin dashboard pages
  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  // Pre-configured message without exposing raw number in text
  const whatsappUrl =
    "https://wa.me/919573963020?text=Hello%20Cross%20Motive%20Services%2C%20I%20would%20like%20to%20discuss%20a%20project.";

  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center flex-row-reverse gap-2 sm:gap-3 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Cross Motive Services on WhatsApp"
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_16px_rgba(37,211,102,0.45)] hover:shadow-[0_8px_25px_rgba(37,211,102,0.65)] hover:scale-105 active:scale-95 transition-all duration-300"
      >
        {/* Subtle Online Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />

        {/* Official WhatsApp SVG Icon */}
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 fill-current relative z-10 transition-transform duration-300 group-hover:rotate-6"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.301-.776.978-.952 1.179-.175.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.084-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.526-.076-.15-.677-1.632-.927-2.234-.244-.587-.492-.507-.677-.516-.175-.008-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508s1.079 2.909 1.229 3.11c.15.2 2.124 3.243 5.145 4.549.719.31 1.28.497 1.718.636.722.23 1.38.198 1.9.12.58-.088 1.78-.727 2.03-1.429.25-.702.25-1.303.175-1.429-.075-.126-.276-.201-.577-.351zM12.04 2C6.51 2 2.02 6.49 2.02 12.02c0 1.96.57 3.79 1.56 5.34L2.2 21.8l4.6-1.34c1.49.9 3.23 1.42 5.24 1.42 5.53 0 10.02-4.49 10.02-10.02C22.06 6.49 17.57 2 12.04 2zm0 18.28c-1.74 0-3.36-.5-4.74-1.37l-.34-.21-2.73.8 0.81-2.66-.23-.37c-.96-1.54-1.47-3.32-1.47-5.18 0-4.54 3.7-8.24 8.25-8.24 4.55 0 8.25 3.7 8.25 8.24 0 4.54-3.7 8.24-8.25 8.24z" />
        </svg>

        {/* Status Dot */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-300 border-2 border-white rounded-full z-20" />
      </a>

      {/* Floating Tooltip Label (Positioned cleanly to the left of the button) */}
      <div
        className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#17232f] text-white text-xs font-semibold shadow-lg border border-white/10 pointer-events-none transition-all duration-300 ${
          isHovered
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
        <span>Chat on WhatsApp</span>
      </div>
    </div>
  );
}
