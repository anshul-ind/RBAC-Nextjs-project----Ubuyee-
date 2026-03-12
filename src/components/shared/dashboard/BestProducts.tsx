"use client";

import React, { useState } from "react";
import { FiStar, FiPlus } from "react-icons/fi";

/**
 * Task 1 & 3: Best Products Grid (Fixed)
 * Stabilized featured card and reliable image fallbacks.
 */

interface ProductItem {
  id: number;
  name: string;
  price: string;
  rating: number;
  reviews: number;
  imageUrl: string;
  featured?: boolean;
}

const products: ProductItem[] = [
  {
    id: 1,
    name: "Beefy Bliss Burger",
    price: "₹2,015",
    rating: 4.8,
    reviews: 128,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
  
  },
  {
    id: 2,
    name: "Miss Burger",
    price: "₹2,015",
    rating: 4.5,
    reviews: 85,
    imageUrl: "https://images.unsplash.com/photo-1550317138-10000687a72b?w=400&q=80",
  },
  {
    id: 3,
    name: "Full Basket",
    price: "₹3,200",
    rating: 4.9,
    reviews: 210,
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
  },
  {
    id: 4,
    name: "Golden Fries",
    price: "₹450",
    rating: 4.4,
    reviews: 320,
    imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80",
  },
  {
    id: 5,
    name: "Creamy Pasta",
    price: "₹1,850",
    rating: 4.7,
    reviews: 94,
    imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80",
  },
  {
    id: 6,
    name: "Fruit Platter",
    price: "₹1,200",
    rating: 4.5,
    reviews: 56,
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
  },
  {
    id: 7,
    name: "Iced Latte",
    price: "₹380",
    rating: 4.8,
    reviews: 145,
    imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80",
  },
  {
    id: 8,
    name: "Supreme Chicken",
    price: "₹2,400",
    rating: 4.9,
    reviews: 178,
    imageUrl: "https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=400&q=80",
  },
];

const ProductCard = ({ 
  item, 
  hoveredId, 
  onHover 
}: { 
  item: ProductItem, 
  hoveredId: number | null,
  onHover: (id: number | null) => void
}) => {
  const isOrange = item.featured || hoveredId === item.id;

  const wrapperStyle: React.CSSProperties = {
    backgroundColor: isOrange ? "var(--color-primary)" : "var(--color-0)",
    border: `1px solid ${isOrange ? "var(--color-primary)" : "var(--color-100)"}`,
    borderRadius: "var(--radius-2xl)",
    padding: "0.875rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.625rem",
    transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
    cursor: "pointer",
    boxShadow: isOrange ? "var(--shadow-orange)" : "none",
    transform: isOrange ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
    position: "relative",
    overflow: "hidden",
  };

  const imageContainerStyle: React.CSSProperties = {
    width: "100%",
    height: "140px",
    borderRadius: "var(--radius-lg)",
    overflow: "hidden",
    backgroundColor: "var(--color-50)",
    border: isOrange ? "2px solid rgba(255,255,255,0.3)" : "none",
    transition: "all 0.25s ease",
  };

  const nameStyle: React.CSSProperties = {
    fontSize: "0.8rem",
    fontWeight: 700,
    color: isOrange ? "#ffffff" : "#111827",
    margin: 0,
    transition: "all 0.25s ease",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const ratingStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "0.7rem",
    color: isOrange ? "rgba(255,255,255,0.8)" : "var(--color-500)",
    transition: "all 0.25s ease",
  };

  const starsStyle: React.CSSProperties = {
    display: "flex",
    color: isOrange ? "var(--color-warning-border)" : "var(--color-warning)",
    transition: "all 0.25s ease",
  };

  const priceRowStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "0.375rem",
  };

  const priceStyle: React.CSSProperties = {
    fontSize: "0.95rem",
    fontWeight: 800,
    color: isOrange ? "#ffffff" : "#111827",
    transition: "all 0.25s ease",
  };

  const addButtonStyle: React.CSSProperties = {
    width: "1.75rem",
    height: "1.75rem",
    borderRadius: "8px",
    backgroundColor: isOrange ? "var(--color-0)" : "var(--color-primary)",
    color: isOrange ? "var(--color-primary)" : "var(--color-0)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
    transition: "all 0.15s ease",
    fontSize: "1rem",
    fontWeight: 700,
  };

  return (
    <div 
      style={wrapperStyle}
      onMouseEnter={() => {
        if (!item.featured) onHover(item.id);
      }}
      onMouseLeave={() => {
        if (!item.featured) onHover(null);
      }}
    >
      <div style={imageContainerStyle}>
        <img
          src={item.imageUrl}
          alt={item.name}
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80";
          }}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <h3 style={nameStyle}>{item.name}</h3>
        <div style={ratingStyle}>
          <div style={starsStyle}>
            <FiStar size={12} fill="currentColor" />
            <FiStar size={12} fill="currentColor" />
            <FiStar size={12} fill="currentColor" />
            <FiStar size={12} fill="currentColor" />
            <FiStar size={12} fill="currentColor" />
          </div>
          <span>{item.rating}</span>
          <span style={{ opacity: 0.6 }}>({item.reviews || 0})</span>
        </div>
      </div>

      <div style={priceRowStyle}>
        <span style={priceStyle}>{item.price}</span>
        <button 
          style={addButtonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = isOrange ? "var(--color-primary-light)" : "var(--color-primary-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = isOrange ? "var(--color-0)" : "var(--color-primary)";
          }}
        >
          <FiPlus size={20} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default function BestProducts() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.25rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
          <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--color-primary)" }}>Best</span>
          <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--color-900)" }}>Products</span>
        </div>

        <span
          style={{
            fontSize: "0.8rem",
            color: "var(--color-primary)",
            cursor: "pointer",
            fontWeight: 600,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          See All →
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
        }}
      >
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            item={product} 
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </section>
  );
}
