"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMinus, FiPlus, FiTrash2, FiShoppingCart } from "react-icons/fi";

const initialOrders = [
  { id: 1, name: "Classic Burger", weight: "250g", price: 5.99, qty: 1 },
  { id: 2, name: "Rotini Pasta", weight: "380g", price: 4.50, qty: 2 },
  { id: 3, name: "Lemonade", weight: "0.35L", price: 1.99, qty: 1 },
];

import TopNav from "@/components/shared/navigation/TopNav";
import Footer from "@/components/shared/Footer";

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);

  const updateQty = (id: number, delta: number) => {
    setOrders(prev => prev.map(order => 
      order.id === id ? { ...order, qty: Math.max(1, order.qty + delta) } : order
    ));
  };

  const removeOrder = (id: number) => {
    setOrders(prev => prev.filter(order => order.id !== id));
  };

  const subtotal = orders.reduce((acc, order) => acc + order.price * order.qty, 0);
  const discount = 5.00;
  const total = Math.max(0, subtotal - discount);

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
          backgroundColor: "white",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-10 tracking-tight">My Orders</h1>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Order List */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {orders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ x: 60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -60, opacity: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    className="flex items-center gap-6 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-orange-200 transition-colors group"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-white shadow-sm flex-shrink-0">
                      <img 
                        src={`https://picsum.photos/seed/${order.id + 50}/200`} 
                        className="w-full h-full object-cover"
                        alt={order.name}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 truncate">{order.name}</h3>
                      <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">{order.weight}</p>
                      
                      <div className="mt-2 flex items-center gap-4">
                        <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1">
                          <button 
                            onClick={() => updateQty(order.id, -1)}
                            className="p-1 hover:text-orange-500 transition-colors"
                          >
                            <FiMinus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-gray-800">{order.qty}</span>
                          <button 
                            onClick={() => updateQty(order.id, 1)}
                            className="p-1 hover:text-orange-500 transition-colors"
                          >
                            <FiPlus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeOrder(order.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <motion.p 
                        key={order.price * order.qty}
                        initial={{ scale: 1.15 }}
                        animate={{ scale: 1 }}
                        className="text-lg font-bold text-gray-900"
                      >
                        ${(order.price * order.qty).toFixed(2)}
                      </motion.p>
                      <p className="text-xs text-gray-400 font-medium">${order.price.toFixed(2)} each</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {orders.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <FiShoppingCart size={32} className="text-gray-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Your basket is empty</h3>
                  <p className="text-gray-500">Add some delicious items from the shop!</p>
                </motion.div>
              )}
            </div>

            {/* Summary Section */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm sticky top-24">
                <h2 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                  Order Summary
                </h2>

                <div className="mb-6">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Promo Code</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Enter code" 
                      className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    />
                    <button className="absolute right-2 top-1.5 bottom-1.5 bg-gray-900 text-white text-[10px] font-bold px-4 rounded-lg uppercase tracking-wider hover:bg-gray-800 transition-colors">
                      Apply
                    </button>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span className="font-bold">-${discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery</span>
                    <span className="font-bold text-orange-500">FREE</span>
                  </div>
                  <div className="pt-4 border-t border-dashed border-gray-200 flex justify-between">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-extrabold text-2xl text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-orange-100 active:scale-95 text-lg">
                  Confirm Order
                </button>
                
                <p className="text-center text-[10px] text-gray-400 mt-6 uppercase tracking-widest font-bold">
                  Tax calculated at checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
