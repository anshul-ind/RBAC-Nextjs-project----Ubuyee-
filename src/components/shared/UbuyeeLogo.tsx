"use client";

import React from "react";

interface UbuyeeLogoProps {
  size?: "sm" | "md" | "lg";
}

/**
 * Task 1: Ubuyee Geometric SVG Logo
 * Rules:
 * - Mixed weight letterforms: U (bold/large), b, u, y (medium), e, e (rounded/open).
 * - Rounded stroke ends.
 * - Special treatment for U: larger font and a centered orange dot above.
 */
export default function UbuyeeLogo({ size = "md" }: UbuyeeLogoProps) {
  // Scaling logic
  const scales = {
    sm: 0.7,
    md: 1.0,
    lg: 1.3,
  };
  const scale = scales[size] || 1.0;

  // Colors
  const orange = "#f97316";

  return (
    <div 
      style={{ 
        transform: `scale(${scale})`, 
        transformOrigin: "left center", 
        display: "inline-flex",
        alignItems: "center"
      }}
    >
      <svg
        width="160"
        height="48"
        viewBox="0 0 160 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        {/* The word "Ubuyee" using SVG text elements */}
        <text
          x="0"
          y="38"
          fill={orange}
          style={{
            fontFamily: '"Syne", "Space Grotesk", sans-serif',
            letterSpacing: "-1.5px",
          }}
        >
          {/* U (Bold, Large) */}
          <tspan
            style={{ fontSize: "38px", fontWeight: 800 }}
          >
            U
          </tspan>
          
          {/* buy (Medium weight) */}
          <tspan
            dx="2"
            style={{ fontSize: "32px", fontWeight: 600 }}
          >
            buy
          </tspan>
          
          {/* ee (Open, Rounded) */}
          <tspan
            dx="2"
            style={{ fontSize: "32px", fontWeight: 400 }}
          >
            ee
          </tspan>
        </text>

        {/* Geometric detail: Dot above the U */}
        {/* Centered above the U. U width is roughly 24px at 38px font size. */}
        <circle cx="13" cy="4" r="5" fill={orange} />
      </svg>
    </div>
  );
}
