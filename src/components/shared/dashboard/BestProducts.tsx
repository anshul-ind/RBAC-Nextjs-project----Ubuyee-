"use client";

import React, { useState, useEffect } from "react";
import { FiStar, FiPlus } from "react-icons/fi";

interface ProductItem {
  id: number;
  name: string;
  category: string;
  price: string;
  rating: number;
  reviews: number;
  imageUrl: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: 1,
    name: "Beefy Bliss Burger",
    category: "Burgers",
    price: "₹2,015",
    rating: 4.8,
    reviews: 128,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
  },
  {
    id: 2,
    name: "Miss Burger",
    category: "Burgers",
    price: "₹1,850",
    rating: 4.5,
    reviews: 85,
    imageUrl: "https://images.unsplash.com/photo-1550317138-10000687a72b?w=400&q=80",
  },
  {
    id: 3,
    name: "Full Basket",
    category: "Platters",
    price: "₹3,200",
    rating: 4.9,
    reviews: 210,
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
  },
  {
    id: 4,
    name: "Golden Fries",
    category: "Sides",
    price: "₹450",
    rating: 4.4,
    reviews: 320,
    imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80",
  },
  {
    id: 5,
    name: "Creamy Pasta",
    category: "Pasta",
    price: "₹1,850",
    rating: 4.7,
    reviews: 94,
    imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80",
  },
  {
    id: 6,
    name: "Fruit Platter",
    category: "Healthy",
    price: "₹1,200",
    rating: 4.5,
    reviews: 56,
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
  },
  {
    id: 7,
    name: "Iced Latte",
    category: "Drinks",
    price: "₹380",
    rating: 4.8,
    reviews: 145,
    imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80",
  },
  {
    id: 8,
    name: "Supreme Chicken",
    category: "Mains",
    price: "₹2,400",
    rating: 4.9,
    reviews: 178,
    imageUrl: "https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=400&q=80",
  },
];

const ProductCard = ({ item }: { item: ProductItem }) => {
  return (
    <div 
      style={{
        width: "100%",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        cursor: "pointer",
        background: "var(--color-0)",
        border: "1px solid var(--color-100)",
        transition: "all 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Image Wrapper */}
      <div 
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={item.imageUrl}
          alt={item.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80";
          }}
        />
      </div>

      {/* Info Section */}
      <div style={{ padding: "clamp(0.5rem, 2vw, 0.875rem)" }}>
        <h3 
          style={{
            fontSize: "clamp(0.72rem, 1.8vw, 0.875rem)",
            fontWeight: 600,
            color: "var(--color-900)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginBottom: "0.25rem",
          }}
        >
          {item.name}
        </h3>
        
        <p 
          style={{
            fontSize: "clamp(0.65rem, 1.5vw, 0.75rem)",
            color: "var(--color-500)",
            marginBottom: "0.375rem",
          }}
        >
          {item.category}
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span 
            style={{
              fontSize: "clamp(0.8rem, 2vw, 1rem)",
              fontWeight: 700,
              color: "var(--color-primary)",
            }}
          >
            {item.price}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "2px", color: "#f59e0b" }}>
            <FiStar size={12} fill="currentColor" />
            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#4b5563" }}>{item.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BestProducts() {
  const [cols, setCols] = useState(2);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w >= 1280) setCols(4);
      else if (w >= 900) setCols(3);
      else if (w >= 560) setCols(2);
      else setCols(2);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
          <span style={{ fontSize: "1.25rem", fontWeight: 600, color: "#f97316" }}>Best</span>
          <span style={{ fontSize: "1.25rem", fontWeight: 600, color: "#111827" }}>Products</span>
        </div>

        <span
          style={{
            fontSize: "0.8rem",
            color: "#f97316",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          See All →
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: "clamp(0.75rem, 2vw, 1rem)",
          width: "100%",
        }}
      >
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    </section>
  );
}
