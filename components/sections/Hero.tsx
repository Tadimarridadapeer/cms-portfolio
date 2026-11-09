"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const ROTATING_WORDS = [
  "experiences.",
  "SaaS platforms.",
  "mobile apps.",
  "AI products.",
  "enterprise systems.",
];

const STREAMING_LOGS = [
  { prompt: "$", text: "cms-engine build --target=production", color: "text-[#5c83f2]" },
  { prompt: ">", text: "[ARCH] Next.js 14 · React Native · pgvector", color: "text-[#9bb3ff]" },
  { prompt: ">", text: "[PERF] Serverless SSR compiled in 18ms", color: "text-white" },
  { prompt: ">", text: "[AUDIT] 100% Code Ownership · Zero Vendor Lock", color: "text-[#aebac5]" },
  { prompt: "●", text: "[STATUS] Production Ready // All Systems Operational", color: "text-[#5c83f2]" },
];

export function Hero() {
  // Rotating word typewriter state
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Terminal active stream line count
  const [visibleLogIndex, setVisibleLogIndex] = useState(2);

  useEffect(() => {
    const currentWord = ROTATING_WORDS[wordIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          // Pause at end of word
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex]);

  // Stream terminal lines animation
  useEffect(() => {
    const logInterval = setInterval(() => {
      setVisibleLogIndex((prev) => (prev >= STREAMING_LOGS.length ? 1 : prev + 1));
    }, 2800);
    return () => clearInterval(logInterval);
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-glow" />
        <div className="wrap">
          <div className="hero-content">
            {/* Left Headline & Messaging */}
            <div>
              <div className="hero-kicker mono">
                <i className="live-dot" /> Digital product & engineering company
              </div>
              <h1>
                We turn complex
                <br />
                ideas into <span className="outline">digital</span>
                <br />
                <span className="accent type-line typing min-h-[1.1em] inline-block">
                  {displayText || "experiences."}
                </span>
              </h1>

              <div className="hero-side">
                <p>
                  We design, engineer and deliver digital products that help businesses move forward
                  — from ambitious first launches to systems built for scale.
                </p>
                <div className="hero-buttons">
                  <Link className="btn-primary" href="/contact">
                    Build with us <span>↗</span>
                  </Link>
                  <Link className="text-link" href="#services">
                    Explore capabilities
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Animated UI & Terminal Over the Graphic */}
            <div className="hero-panel">
              <div className="hero-panel-head">
                <div className="hero-panel-dots">
                  <i />
                  <i />
                  <i />
                </div>
                <span>cms.engine // live-build</span>
                <span className="hero-panel-badge">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping inline-block" />
                  LIVE STREAM
                </span>
              </div>

              <div className="hero-panel-body">
                {STREAMING_LOGS.slice(0, visibleLogIndex).map((log, i) => (
                  <div key={i} className="hero-panel-line animate-fadeIn">
                    <span className="hero-panel-prompt">{log.prompt}</span>
                    <span className={log.color}>{log.text}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 text-white/40 mt-1">
                  <span className="text-blue-400 animate-pulse">_</span>
                  <span className="text-[9px] font-mono">awaiting commit...</span>
                </div>
              </div>

              <div className="hero-panel-tags">
                <span>TypeScript</span>
                <span>Next.js 14</span>
                <span>React Native</span>
                <span>Vector RAG</span>
                <span>PostgreSQL</span>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Strip */}
          <div className="hero-bottom">
            <div className="hero-stat">
              <strong>End-to-end delivery</strong>
              <span>One accountable partner</span>
            </div>
            <div className="hero-stat">
              <strong>Web · Mobile · Cloud</strong>
              <span>Connected experiences</span>
            </div>
            <div className="hero-stat">
              <strong>Built to evolve</strong>
              <span>Designed for what&apos;s next</span>
            </div>
            <div className="hero-status">
              <i className="status-line" /> DESIGN / ENGINEERING / DELIVERY
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="trust">
        <div className="wrap trust-inner">
          <div className="trust-label">
            Technology that moves
            <br />
            business forward
          </div>
          <div className="trust-item">
            <b>01</b> Strategy
          </div>
          <div className="trust-item">
            <b>02</b> Product design
          </div>
          <div className="trust-item">
            <b>03</b> Engineering
          </div>
          <div className="trust-item">
            <b>04</b> Launch & scale
          </div>
        </div>
      </div>
    </>
  );
}
