"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Slide {
  tag: string;
  headline: string;
  headlineOrange: string;
  subtitle: string;
  button: string;
  image: string;
}

const SLIDES: Slide[] = [
  {
    tag: "TRENDING TODAY",
    headline: "Top Deals Just For",
    headlineOrange: "You",
    subtitle: "Handpicked offers updated daily. Shop before they run out.",
    button: "Shop Now",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1000&q=80",
  },
  {
    tag: "NEW ARRIVALS",
    headline: "Fresh Products",
    headlineOrange: "Daily",
    subtitle: "New items added every morning. Be the first to grab them.",
    button: "View New",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1000&q=80",
  },
  {
    tag: "LIMITED OFFER",
    headline: "Flash Sale Ends",
    headlineOrange: "Tonight",
    subtitle: "Up to 60% off on selected items. Limited stock only.",
    button: "Grab Deal",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1000&q=80",
  },
  {
    tag: "RECOMMENDED",
    headline: "Picked Just",
    headlineOrange: "For You",
    subtitle: "Based on your browsing history and past purchases.",
    button: "See More",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=1000&q=80",
  },
  {
    tag: "BESTSELLERS",
    headline: "Most Loved",
    headlineOrange: "This Week",
    subtitle: "What thousands of customers are buying right now.",
    button: "Buy Now",
    image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1000&q=80",
  },
];

// Cloned slides for infinite loop: [Last, Slide1, Slide2, Slide3, Slide4, Slide5, First]
const TECHNICAL_SLIDES = [SLIDES[SLIDES.length - 1], ...SLIDES, SLIDES[0]];

export default function DealCarousel() {
  // Start at index 1 (the first original slide)
  const [technicalIndex, setTechnicalIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Logical index for dots/counter (0-indexed based on original SLIDES)
  // We map technicalIndex 1->0, 2->1 ... N->N-1
  // For technicalIndex 0 (Last clone) -> N-1
  // For technicalIndex N+1 (First clone) -> 0
  let logicalIndex = technicalIndex - 1;
  if (technicalIndex === 0) logicalIndex = SLIDES.length - 1;
  if (technicalIndex === SLIDES.length + 1) logicalIndex = 0;

  const goTo = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsTransitioning(true);
    setTechnicalIndex(index);
  };

  const goNext = () => {
    if (!isTransitioning) return; // wait for jumps to finish
    goTo(technicalIndex + 1);
  };

  const goPrev = () => {
    if (!isTransitioning) return;
    goTo(technicalIndex - 1);
  };

  const handleTransitionEnd = () => {
    // If we land on a clone, jump back to the original instantly without animation
    if (technicalIndex === 0) {
      setIsTransitioning(false);
      setTechnicalIndex(SLIDES.length);
    } else if (technicalIndex === SLIDES.length + 1) {
      setIsTransitioning(false);
      setTechnicalIndex(1);
    }
  };

  useEffect(() => {
    if (isHovered) return;
    intervalRef.current = setInterval(() => {
      setTechnicalIndex((prev) => prev + 1);
      setIsTransitioning(true);
    }, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered]);

  return (
    <div style={{ width: "100%", marginBottom: "40px", position: "relative" }}>
      {/* Section Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-900)", margin: 0 }}>
          Today's Deals
        </h2>
        <span
          style={{
            fontSize: "13px",
            color: "#f97316",
            cursor: "pointer",
            fontWeight: 600,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          See All →
        </span>
      </div>

      {/* Carousel Container */}
      <div
        style={{
          width: "100%",
          position: "relative",
          overflow: "hidden",
          borderRadius: "20px",
          background: "var(--color-0)",
          border: "1px solid var(--color-100)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          height: "420px",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slide Counter */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "20px",
            fontSize: "12px",
            fontFamily: "monospace",
            color: "var(--color-500)",
            background: "rgba(255,255,255,0.9)",
            padding: "4px 12px",
            borderRadius: "var(--radius-full)",
            border: "1px solid var(--color-100)",
            zIndex: 20,
          }}
        >
          {logicalIndex + 1} / {SLIDES.length}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goPrev}
          style={{
            position: "absolute",
            left: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 20,
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.95)",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            fontSize: "18px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#111827",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f97316";
            e.currentTarget.style.color = "white";
            e.currentTarget.style.borderColor = "#f97316";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.95)";
            e.currentTarget.style.color = "#111827";
            e.currentTarget.style.borderColor = "#e5e7eb";
          }}
        >
          ←
        </button>

        <button
          onClick={goNext}
          style={{
            position: "absolute",
            right: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 20,
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.95)",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            fontSize: "18px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#111827",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f97316";
            e.currentTarget.style.color = "white";
            e.currentTarget.style.borderColor = "#f97316";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.95)";
            e.currentTarget.style.color = "#111827";
            e.currentTarget.style.borderColor = "#e5e7eb";
          }}
        >
          →
        </button>

        {/* Slide Track */}
        <div
          onTransitionEnd={handleTransitionEnd}
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
            transition: isTransitioning ? "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
            transform: `translateX(-${technicalIndex * 100}%)`,
            willChange: "transform",
          }}
        >
          {TECHNICAL_SLIDES.map((slide, index) => (
            <div
              key={index}
              style={{
                minWidth: "100%",
                width: "100%",
                flexShrink: 0,
                height: "420px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                background: "#ffffff",
                position: "relative",
                boxSizing: "border-box",
                overflow: "hidden",
              }}
            >
              {/* Left Side: Text */}
              <div 
                style={{ 
                  padding: "56px 56px 56px 64px",
                  display: "flex", 
                  flexDirection: "column", 
                  justifyContent: "center",
                  background: "var(--color-0)",
                  height: "100%",
                  overflow: "hidden",
                  boxSizing: "border-box"
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--color-primary)",
                    background: "var(--color-primary-light)",
                    padding: "6px 14px",
                    borderRadius: "var(--radius-full)",
                    display: "inline-block",
                    width: "fit-content",
                    marginBottom: "20px",
                  }}
                >
                  {slide.tag}
                </span>

                <h3
                  style={{
                    fontSize: "42px",
                    fontWeight: 800,
                    color: "var(--color-900)",
                    lineHeight: 1.1,
                    margin: "0 0 16px 0",
                  }}
                >
                  {slide.headline}{" "}
                  <span style={{ color: "var(--color-primary)" }}>{slide.headlineOrange}</span>
                </h3>

                <p
                  style={{
                    fontSize: "15px",
                    color: "var(--color-500)",
                    lineHeight: 1.65,
                    margin: "0 0 32px 0",
                    maxWidth: "340px",
                  }}
                >
                  {slide.subtitle}
                </p>

                <button
                  style={{
                    background: "var(--color-900)",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: 700,
                    padding: "14px 28px",
                    borderRadius: "var(--radius-full)",
                    border: "none",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    width: "fit-content",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-900)")}
                >
                  {slide.button} <span style={{ fontSize: "18px" }}>→</span>
                </button>
              </div>

              {/* Right Side: Image */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 2,
                    background: "linear-gradient(to right, white 0%, transparent 20%)",
                    pointerEvents: "none",
                  }}
                />
                <Image
                  src={slide.image}
                  alt={slide.tag}
                  fill
                  priority={index === 1}
                  style={{ objectFit: "cover", objectPosition: "center", display: "block" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Dot Indicators INSIDE Carousel */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "8px",
            zIndex: 20,
          }}
        >
          {SLIDES.map((_, index) => (
            <div
              key={index}
              onClick={() => goTo(index + 1)}
              style={{
                width: logicalIndex === index ? "32px" : "8px",
                height: "8px",
                background: logicalIndex === index ? "var(--color-primary)" : "rgba(255,255,255,0.6)",
                border: logicalIndex === index ? "none" : "1px solid rgba(0,0,0,0.15)",
                borderRadius: "var(--radius-full)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                if (logicalIndex !== index) e.currentTarget.style.backgroundColor = "var(--color-primary-border)";
              }}
              onMouseLeave={(e) => {
                if (logicalIndex !== index) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.6)";
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
