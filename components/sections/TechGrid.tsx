"use client";

import React from "react";
import Link from "next/link";

const ARCH_LAYERS = [
  { no: "01", name: "Experience layer", tech: "Web · iOS · Android" },
  { no: "02", name: "Application layer", tech: "APIs · Services · Auth" },
  { no: "03", name: "Data & intelligence", tech: "Databases · AI · Search" },
  { no: "04", name: "Infrastructure layer", tech: "Cloud · CI/CD · Security" },
];

export function TechGrid() {
  return (
    <section className="section engineering depth-section" id="capabilities">
      <div className="wrap engineering-inner">
        <div className="engineering-copy">
          <div className="mono">02 / Engineering capability</div>
          <h2>
            Thoughtful on the surface.
            <br />
            <em>Solid underneath.</em>
          </h2>
          <p>
            Great digital products need more than a polished interface. We connect frontend
            experiences to dependable backend systems, data, integrations and infrastructure.
          </p>
          <p>
            Our approach is pragmatic: choose the right tools for the problem, build for
            maintainability and leave room for the product to grow.
          </p>
          <div className="mt-8">
            <Link href="/technologies" className="text-link">
              Explore full engineering stack & frameworks ↗
            </Link>
          </div>
        </div>

        <div className="architecture">
          <div className="arch-top">
            <span>HOW THE PIECES CONNECT</span>
            <span>REFERENCE ARCHITECTURE / 01</span>
          </div>

          <div className="arch-stack">
            {ARCH_LAYERS.map((layer, index) => (
              <React.Fragment key={layer.no}>
                <div className="arch-layer">
                  <span className="layer-no">{layer.no}</span>
                  <strong>{layer.name}</strong>
                  <small>{layer.tech}</small>
                </div>
                {index < ARCH_LAYERS.length - 1 && <div className="arch-connect" />}
              </React.Fragment>
            ))}
          </div>

          <div className="arch-foot">
            <span>MODULAR BY DESIGN</span>
            <Link href="/technologies" className="hover:text-blue-400 transition-colors">
              BUILT FOR CHANGE ↗
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
