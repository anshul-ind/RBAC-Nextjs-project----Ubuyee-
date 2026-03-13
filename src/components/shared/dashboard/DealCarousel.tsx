"use client";

import React, { useState, useEffect } from "react";
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

export default function DealCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const SLIDES_COUNT = SLIDES.length;

  const safeIndex = Math.min(currentIndex, SLIDES_COUNT - 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev >= SLIDES_COUNT - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [SLIDES_COUNT]);

  const goNext = () => {
    setCurrentIndex((prev) =>
      prev >= SLIDES_COUNT - 1 ? 0 : prev + 1
    );
  };

  const goPrev = () => {
    setCurrentIndex((prev) =>
      prev <= 0 ? SLIDES_COUNT - 1 : prev - 1
    );
  };

  const goTo = (index: number) => {
    setCurrentIndex(Math.min(Math.max(0, index), SLIDES_COUNT - 1));
  };

  return (
    <div style={{ width: "100%", maxWidth: "100%", position: "relative" }}>
      {/* Section Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#111827", margin: 0 }}>
          Today's Deals
        </h2>
        <span
          style={{
            fontSize: "13px",
            color: "#f97316",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          See All →
        </span>
      </div>

      {/* Carousel Container — full width, no maxWidth cap */}
      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          height: "clamp(200px, 45vw, 420px)",
          borderRadius: "var(--radius-2xl)",
          overflow: "hidden",
          position: "relative",
          display: "block",
          background: "white",
          border: "1px solid #e5e7eb",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        {/* Slide Counter */}
        <div
          style={{
            position: "absolute",
            top: "clamp(0.5rem, 2vw, 1rem)",
            right: "clamp(0.5rem, 2vw, 1rem)",
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(4px)",
            padding: "0.25rem 0.625rem",
            borderRadius: "var(--radius-full)",
            fontSize: "clamp(0.65rem, 1.5vw, 0.75rem)",
            fontWeight: 600,
            color: "#111827",
            zIndex: 2,
          }}
        >
          {safeIndex + 1} / {SLIDES_COUNT}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goPrev}
          type="button"
          style={{
            position: "absolute",
            left: "clamp(0.5rem, 2vw, 1rem)",
            top: "50%",
            transform: "translateY(-50%)",
            width: "clamp(1.75rem, 6vw, 2.5rem)",
            height: "clamp(1.75rem, 6vw, 2.5rem)",
            borderRadius: "var(--radius-full)",
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(4px)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "clamp(0.7rem, 2vw, 1rem)",
            zIndex: 2,
            color: "#111827",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          ←
        </button>

        <button
          onClick={goNext}
          type="button"
          style={{
            position: "absolute",
            right: "clamp(0.5rem, 2vw, 1rem)",
            top: "50%",
            transform: "translateY(-50%)",
            width: "clamp(1.75rem, 6vw, 2.5rem)",
            height: "clamp(1.75rem, 6vw, 2.5rem)",
            borderRadius: "var(--radius-full)",
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(4px)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "clamp(0.7rem, 2vw, 1rem)",
            zIndex: 2,
            color: "#111827",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          →
        </button>

        {/* Slide Track */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transform: `translateX(-${safeIndex * 100}%)`,
          }}
        >
          {SLIDES.map((slide, index) => (
            <div
              key={index}
              style={{
                minWidth: "100%",
                width: "100%",
                flexShrink: 0,
                height: "100%",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Image
                src={slide.image}
                alt={slide.tag}
                fill
                priority={index === 0}
                style={{ 
                  objectFit: "cover", 
                  objectPosition: "center", 
                  display: "block" 
                }}
              />
              
              {/* Text Overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "clamp(1rem, 3vw, 2rem)",
                  background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 100%)",
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
                    color: "#f97316",
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
                    fontSize: "clamp(1rem, 3.5vw, 1.75rem)",
                    fontWeight: 800,
                    color: "white",
                    margin: "0 0 0.25rem 0",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "70%",
                  }}
                >
                  {slide.headline}{" "}
                  <span style={{ color: "#f97316" }}>{slide.headlineOrange}</span>
                </h3>

                <p
                  style={{
                    fontSize: "clamp(0.7rem, 2vw, 0.9rem)",
                    color: "rgba(255,255,255,0.85)",
                    lineHeight: 1.4,
                    margin: "0.25rem 0 0 0",
                    maxWidth: "65%",
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

        {/* Dot Indicators */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(0.5rem, 2vw, 1rem)",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "0.375rem",
            zIndex: 2,
          }}
        >
          {SLIDES.map((_, index) => (
            <div
              key={index}
              onClick={() => goTo(index)}
              style={{
                width: index === safeIndex ? "1.5rem" : "0.375rem",
                height: "0.375rem",
                borderRadius: "var(--radius-full)",
                background: index === safeIndex ? "#f97316" : "rgba(255,255,255,0.5)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
