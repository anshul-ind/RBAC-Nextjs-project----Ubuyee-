"use client";

import React from "react";

/**
 * Task 3: Enhanced Shopping Guide InfoCards (Fixed)
 * Clean, consistent cards without buttons.
 */

interface CardProps {
  category: string;
  headline: string;
  body?: string;
  hasAccentLine?: boolean;
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
  bottomLabel,
  bottomLabelColor,
  hasChecklist,
  checklistItems,
  hasBlocks,
  blockItems,
  hasBadge,
}: CardProps) => {
  const cardStyle: React.CSSProperties = {
    width: "clamp(220px, 60vw, 300px)",
    minWidth: "clamp(220px, 60vw, 300px)",
    height: "clamp(280px, 70vw, 360px)",
    backgroundColor: "var(--color-0)",
    border: "1px solid var(--color-100)",
    borderRadius: "var(--radius-2xl)",
    padding: "clamp(1rem, 4vw, 2rem) clamp(1rem, 3vw, 1.5rem)",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    boxShadow: "var(--shadow-sm)",
    transition: "box-shadow 0.3s ease, transform 0.3s ease",
    cursor: "pointer",
    boxSizing: "border-box",
  };

  const categoryStyle: React.CSSProperties = {
    fontSize: "clamp(0.6rem, 2vw, 0.65rem)",
    fontWeight: 500,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--color-400)",
    marginBottom: "clamp(0.5rem, 2vw, 1rem)",
    flexShrink: 0,
  };

  const headlineStyle: React.CSSProperties = {
    fontSize: "clamp(1.1rem, 4vw, 1.5rem)",
    fontWeight: 600,
    color: "var(--color-900)",
    lineHeight: 1.15,
    fontFamily: 'Inter, system-ui, sans-serif',
    margin: 0,
    whiteSpace: "pre-line",
    flexShrink: 0,
  };

  const accentLineStyle: React.CSSProperties = {
    width: "40px",
    height: "3px",
    backgroundColor: "var(--color-primary)",
    borderRadius: "2px",
    marginTop: "8px",
    marginBottom: "8px",
    flexShrink: 0,
  };

  const bodyStyle: React.CSSProperties = {
    fontSize: "clamp(0.75rem, 2vw, 0.825rem)",
    color: "var(--color-600)",
    lineHeight: "1.6",
    marginTop: "clamp(0.5rem, 2vw, 1rem)",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };

  const bottomLabelAreaStyle: React.CSSProperties = {
    flexShrink: 0,
    paddingTop: "clamp(0.5rem, 2vw, 0.75rem)",
    borderTop: "1px solid var(--color-100)",
    marginTop: "auto",
  };

  const bottomLabelStyle: React.CSSProperties = {
    fontSize: "clamp(0.65rem, 1.5vw, 0.75rem)",
    fontWeight: 500,
    color: bottomLabelColor || "var(--color-700)",
  };

  const badgeStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "clamp(1rem, 3vw, 1.5rem)",
    left: "50%",
    transform: "translateX(-50%)",
    width: "30px",
    height: "4px",
    backgroundColor: "var(--color-primary)",
    borderRadius: "var(--radius-full)",
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-lg)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={categoryStyle}>{category}</div>
        <h3 style={headlineStyle}>{headline}</h3>

        {hasAccentLine && <div style={accentLineStyle} />}

        <div style={{ flex: 1, overflow: "hidden" }}>
          {body && <p style={bodyStyle}>{body}</p>}

          {hasChecklist && checklistItems && (
            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {checklistItems.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <div style={{ width: "14px", height: "14px", border: "1px solid var(--color-300)", borderRadius: "3px", marginTop: "2px", flexShrink: 0 }} />
                  <span style={{ fontSize: "13px", color: "var(--color-700)" }}>{item}</span>
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
                    border: "1px solid var(--color-200)",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    color: "var(--color-500)",
                    textAlign: "center",
                    padding: "10px",
                    boxSizing: "border-box",
                    background: "var(--color-0)"
                  }}
                >
                  <strong style={{ color: "var(--color-900)", marginBottom: "4px" }}>{item.title}</strong>
                  <span style={{ fontSize: "9px", lineHeight: 1.3 }}>{item.sub}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Label Area */}
      {(bottomLabel || hasBadge) && (
        <div style={bottomLabelAreaStyle}>
          {bottomLabel && <div style={bottomLabelStyle}>{bottomLabel}</div>}
          {hasBadge && <div style={badgeStyle} />}
        </div>
      )}
    </div>
  );
};

export default function InfoCards() {
  const cardsData: CardProps[] = [
    {
      category: "SMART SHOPPING",
      headline: "The Buyer's\nSmart Guide:\nHow to Save\nMore Every Day",
      hasAccentLine: true,
      bottomLabel: "Ubuyee Picks",
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
      bottomLabelColor: "var(--color-primary)",
    },
  ];

  // Duplicate for infinite marquee
  const slides = [...cardsData, ...cardsData];

  return (
    <div style={{ width: "100%", marginBottom: "clamp(1.5rem, 5vw, 2.5rem)" }}>
      {/* Header with Pulsing Badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "clamp(0.75rem, 2vw, 1.25rem)",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2 style={{ fontSize: "clamp(1rem, 3vw, 1.25rem)", fontWeight: 500, color: "var(--color-900)", margin: 0 }}>
            Shopping Guide
          </h2>
          <div
            style={{
              fontSize: "0.55rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              color: "var(--color-error-text)",
              backgroundColor: "var(--color-error-light)",
              border: "1px solid var(--color-error-border)",
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
            fontSize: "clamp(0.75rem, 2vw, 0.825rem)",
            color: "var(--color-primary)",
            cursor: "pointer",
            fontWeight: 500,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          View All →
        </span>
      </div>

      {/* Marquee Wrapper with Fade Edges */}
      <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
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

        <div className="marquee-track">
          {slides.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}
