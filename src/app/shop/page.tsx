"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus } from "react-icons/fi";

const products = [
  { id: 1, name: "Classic Burger", category: "Burgers", price: 5.99, weight: "250g" },
  { id: 2, name: "BBQ Burger", category: "Burgers", price: 7.49, weight: "300g" },
  { id: 3, name: "Rotini Pasta", category: "Pasta", price: 4.50, weight: "380g" },
  { id: 4, name: "Penne Arrabbiata", category: "Pasta", price: 4.99, weight: "350g" },
  { id: 5, name: "Lemonade", category: "Cold Drinks", price: 1.99, weight: "0.35L" },
  { id: 6, name: "Iced Cola", category: "Cold Drinks", price: 1.50, weight: "0.50L" },
];

const categories = ["All", "Burgers", "Pasta", "Cold Drinks"];

import TopNav from "@/components/shared/navigation/TopNav";
import Footer from "@/components/shared/Footer";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-50)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TopNav />
      <main
        style={{
          flex: 1,
          paddingTop: "var(--nav-height)",
          width: "100%",
          overflowX: "hidden",
        }}
      >
        <div className="bg-gray-50 pb-20 scroll-smooth" style={{ minHeight: "calc(100vh - var(--nav-height))" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 pt-8">Our Shop</h1>

            {/* Category Filters */}
            <div className="flex space-x-4 mb-10 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-orange-500 text-white shadow-md scale-105"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                  >
                    <div className="aspect-video relative overflow-hidden bg-gray-100">
                      <img
                        src={`https://picsum.photos/seed/${product.id + 10}/600/400`}
                        alt={product.name}
                        className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                        {product.category}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                        <span className="text-orange-600 font-bold text-lg">${product.price.toFixed(2)}</span>
                      </div>
                      <p className="text-gray-500 text-sm mb-6 flex items-center">
                        <span className="bg-gray-100 px-2 py-1 rounded text-[11px] font-semibold uppercase tracking-wider mr-2">Weight</span>
                        {product.weight}
                      </p>
                      
                      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-orange-200 active:scale-95">
                        <FiPlus className="group-hover:rotate-90 transition-transform duration-300" />
                        Add to order
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
