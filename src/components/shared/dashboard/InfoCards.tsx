"use client";

import React from "react";

/**
 * Task 1-5: Enhanced Shopping Guide InfoCards
 * Infinite auto-scrolling marquee with premium editorial cards.
 */

interface CardProps {
  category: string;
  headline: string;
  body?: string;
  hasAccentLine?: boolean;
  hasButton?: boolean;
  buttonText?: string;
  bottomLabel?: string;
  bottomLabelColor?: string;
  hasChecklist?: boolean;
  checklistItems?: string[];
  hasBlocks?: boolean;
  blockItems?: { title: string; sub: string }[];
  hasBadge?: boolean;
}

const Card = ({
  category,
  headline,
  body,
  hasAccentLine,
  hasButton,
  buttonText,
  bottomLabel,
  bottomLabelColor,
  hasChecklist,
  checklistItems,
  hasBlocks,
  blockItems,
  hasBadge,
}: CardProps) => {
  const cardStyle: React.CSSProperties = {
    width: "300px",
    minWidth: "300px",
    height: "360px",
    backgroundColor: "#fdfcfb",
    border: "1px solid #ede9e3",
    borderRadius: "6px",
    padding: "36px 28px",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
    transition: "box-shadow 0.3s ease, transform 0.3s ease",
    cursor: "pointer",
    boxSizing: "border-box",
  };

  const categoryStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#9ca3af",
    marginBottom: "24px",
  };

  const headlineStyle: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: 800,
    color: "#111111",
    lineHeight: 1.15,
    fontFamily: 'Georgia, "Times New Roman", serif',
    margin: 0,
    whiteSpace: "pre-line",
  };

  const accentLineStyle: React.CSSProperties = {
    width: "60px",
    height: "4px",
    backgroundColor: "#f97316",
    borderRadius: "2px",
    marginTop: "16px",
    marginBottom: "16px",
  };

  const bodyStyle: React.CSSProperties = {
    fontSize: "13px",
    color: "#4b5563",
    lineHeight: "1.7",
    marginTop: "16px",
  };

  const bottomLabelStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "28px",
    left: "28px",
    fontSize: "11px",
    fontWeight: 600,
    color: bottomLabelColor || "#374151",
  };

  const badgeStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "28px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "32px",
    height: "6px",
    backgroundColor: "#f97316",
    borderRadius: "999px",
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.02)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={categoryStyle}>{category}</div>
      <h3 style={headlineStyle}>{headline}</h3>

      {hasAccentLine && <div style={accentLineStyle} />}

      {body && <p style={bodyStyle}>{body}</p>}

      {hasChecklist && checklistItems && (
        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
          {checklistItems.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <div style={{ width: "14px", height: "14px", border: "1px solid #d1d5db", borderRadius: "3px", marginTop: "2px", flexShrink: 0 }} />
              <span style={{ fontSize: "13px", color: "#374151" }}>{item}</span>
            </div>
          ))}
        </div>
      )}

      {hasBlocks && blockItems && (
        <div style={{ marginTop: "20px", display: "flex", gap: "12px" }}>
          {blockItems.map((item, i) => (
            <div
              key={i}
              style={{
                width: "100px",
                height: "80px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                color: "#6b7280",
                textAlign: "center",
                padding: "10px",
                boxSizing: "border-box",
                background: "#ffffff"
              }}
            >
              <strong style={{ color: "#111111", marginBottom: "4px" }}>{item.title}</strong>
              <span style={{ fontSize: "9px", lineHeight: 1.3 }}>{item.sub}</span>
            </div>
          ))}
        </div>
      )}

      {hasButton && (
        <button
          style={{
            backgroundColor: "#f97316",
            color: "white",
            fontSize: "12px",
            fontWeight: 700,
            padding: "10px 20px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            marginTop: "auto",
            display: "inline-block",
            width: "fit-content",
            transition: "opacity 0.2s"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          {buttonText}
        </button>
      )}

      {bottomLabel && <div style={bottomLabelStyle}>{bottomLabel}</div>}
      {hasBadge && <div style={badgeStyle} />}
    </div>
  );
};

export default function InfoCards() {
  const cardsData: CardProps[] = [
    {
      category: "SMART SHOPPING",
      headline: "The Buyer's\nSmart Guide:\nHow to Save\nMore Every Day",
      hasAccentLine: true,
      buttonText: "Explore Now",
      bottomLabel: "Ubuyee Picks",
      hasButton: true,
    },
    {
      category: "WHY UBUYEE",
      headline: "Why Smart\nBuyers\nChoose Us?",
      body: "Thousands of products.\nVerified vendors.\nDeals updated daily —\nso you never miss out.",
      hasBadge: true,
    },
    {
      category: "DAILY ROUTINE",
      headline: "Your Daily\nShopping\nChecklist",
      hasChecklist: true,
      checklistItems: [
        "Browse today's top deals",
        "Compare prices across vendors",
        "Add best picks to cart"
      ],
      hasBadge: true,
    },
    {
      category: "FOCUS & SAVE",
      headline: "Shop in\nFocus\nBlocks",
      hasBlocks: true,
      blockItems: [
        { title: "Block 1", sub: "Explore new arrivals and categories" },
        { title: "Block 2", sub: "Compare, decide and checkout fast" }
      ],
      hasBadge: true,
    },
    {
      category: "STAY UPDATED",
      headline: "Want deals\ndelivered to\nyour inbox\ndaily?",
      body: "Subscribe to Ubuyee alerts.\nNever miss a flash sale or\nnew arrival again.",
      bottomLabel: "Ubuyee",
      bottomLabelColor: "#f97316",
    },
  ];

  // Duplicate for infinite marquee
  const slides = [...cardsData, ...cardsData];

  return (
    <div style={{ width: "100%", marginBottom: "40px" }}>
      {/* Header with Pulsing Badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--accent-text)", margin: 0 }}>
            Shopping Guide
          </h2>
          <div
            style={{
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "var(--error-text)",
              backgroundColor: "var(--error-bg)",
              border: "1px solid var(--error-border)",
              padding: "2px 6px",
              borderRadius: "999px",
              marginLeft: "0.5rem",
              animation: "pulse 2s ease infinite",
            }}
          >
            LIVE
          </div>
        </div>
        
        <span
          style={{
            fontSize: "0.8rem",
            color: "var(--primary-text)",
            cursor: "pointer",
            fontWeight: 600,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          View All →
        </span>
      </div>

      {/* Marquee Wrapper with Fade Edges */}
      <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
        {/* Left Fade Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "80px",
            height: "100%",
            background: "linear-gradient(to right, #fafafa 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Right Fade Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "80px",
            height: "100%",
            background: "linear-gradient(to left, #fafafa 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* The Marquee Track */}
        <div className="marquee-track">
          {slides.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}
