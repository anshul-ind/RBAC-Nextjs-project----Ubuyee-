"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiSend, FiMail, FiUser, FiMessageSquare, FiBookmark } from "react-icons/fi";

import TopNav from "@/components/shared/navigation/TopNav";
import Footer from "@/components/shared/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    console.log("Form Data Submitted:", formData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Message sent! We'll be in touch.", {
      duration: 5000,
      position: "bottom-center",
      style: {
        background: "#111827",
        color: "#fff",
        borderRadius: "12px",
        padding: "16px 24px",
      },
      iconTheme: {
        primary: "#f97316",
        secondary: "#fff",
      },
    });
    
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

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
          backgroundColor: "var(--color-50)",
        }}
      >
        <div className="flex flex-col items-center justify-center p-4 py-20">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-10 md:p-16 border border-gray-100"
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Get in Touch</h1>
                <p className="text-gray-500 text-lg">We&apos;d love to hear from you. Fill in the form below.</p>
              </motion.div>
            </div>

            <motion.form 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative group">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:border-orange-500/30 focus:ring-4 focus:ring-orange-500/5 transition-all outline-none text-gray-800"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative group">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:border-orange-500/30 focus:ring-4 focus:ring-orange-500/5 transition-all outline-none text-gray-800"
                    />
                  </div>
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Subject</label>
                <div className="relative group">
                  <FiBookmark className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                  <input
                    required
                    type="text"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:border-orange-500/30 focus:ring-4 focus:ring-orange-500/5 transition-all outline-none text-gray-800"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Message</label>
                <div className="relative group">
                  <FiMessageSquare className="absolute left-4 top-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                  <textarea
                    required
                    rows={5}
                    placeholder="Your message here..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:border-orange-500/30 focus:ring-4 focus:ring-orange-500/5 transition-all outline-none text-gray-800 resize-none"
                  />
                </div>
              </motion.div>

              <motion.button
                variants={itemVariants}
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-xl ${
                  isSubmitting 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none" 
                    : "bg-orange-500 text-white shadow-orange-500/20 hover:bg-orange-600 hover:shadow-orange-500/30"
                }`}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full"
                  />
                ) : (
                  <>
                    <span>Send Message</span>
                    <FiSend size={18} />
                  </>
                )}
              </motion.button>
            </motion.form>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-gray-400 text-sm font-medium"
          >
            Typical response time: 2-4 hours
          </motion.p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
