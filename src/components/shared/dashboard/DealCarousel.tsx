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
        <h2 style={{ fontSize: "18px", fontWeight: 600, color: "var(--color-900)", margin: 0 }}>
          Today's Deals
        </h2>
        <span
          style={{
            fontSize: "13px",
            color: "#f97316",
            cursor: "pointer",
            fontWeight: 500,
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
          borderRadius: "var(--radius-2xl)",
          background: "var(--color-0)",
          border: "1px solid var(--color-100)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          height: "clamp(220px, 50vw, 420px)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slide Counter */}
        <div
          style={{
            position: "absolute",
            top: "clamp(0.75rem, 2vw, 1rem)",
            right: "clamp(0.75rem, 2vw, 1.25rem)",
            fontSize: "10px",
            fontFamily: "monospace",
            color: "var(--color-500)",
            background: "rgba(255,255,255,0.9)",
            padding: "2px 10px",
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
            left: "clamp(0.5rem, 2vw, 1rem)",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 25,
            width: "clamp(2rem, 8vw, 2.75rem)",
            height: "clamp(2rem, 8vw, 2.75rem)",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.95)",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            fontSize: "clamp(0.7rem, 2vw, 1rem)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#111827",
            transition: "all 0.2s ease",
          }}
        >
          ←
        </button>

        <button
          onClick={goNext}
          style={{
            position: "absolute",
            right: "clamp(0.5rem, 2vw, 1rem)",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 25,
            width: "clamp(2rem, 8vw, 2.75rem)",
            height: "clamp(2rem, 8vw, 2.75rem)",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.95)",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            fontSize: "clamp(0.7rem, 2vw, 1rem)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#111827",
            transition: "all 0.2s ease",
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
                height: "100%",
                background: "#ffffff",
                position: "relative",
                boxSizing: "border-box",
                overflow: "hidden",
              }}
            >
              <Image
                src={slide.image}
                alt={slide.tag}
                fill
                priority={index === 1}
                style={{ objectFit: "cover", objectPosition: "center", display: "block" }}
              />
              
              {/* Text Overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "clamp(0.75rem, 3vw, 1.5rem)",
                  paddingBottom: "clamp(1.5rem, 5vw, 2.5rem)",
                  background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
                  zIndex: 10,
                  color: "white",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(0.6rem, 2vw, 0.75rem)",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-primary)",
                    background: "rgba(255,255,255,0.9)",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    display: "inline-block",
                    marginBottom: "0.5rem",
                  }}
                >
                  {slide.tag}
                </span>

                <h3
                  style={{
                    fontSize: "clamp(1rem, 4vw, 1.75rem)",
                    fontWeight: 600,
                    color: "white",
                    margin: "0 0 0.25rem 0",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "80%",
                  }}
                >
                  {slide.headline}{" "}
                  <span style={{ color: "var(--color-primary)" }}>{slide.headlineOrange}</span>
                </h3>

                <p
                  style={{
                    fontSize: "clamp(0.7rem, 2.5vw, 0.875rem)",
                    color: "rgba(255,255,255,0.85)",
                    lineHeight: 1.4,
                    margin: "0",
                    maxWidth: "75%",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {slide.subtitle}
                </p>
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
