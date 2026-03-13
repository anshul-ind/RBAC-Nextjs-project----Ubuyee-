"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layout, Clipboard, Wrench, Home, Sun, Grid, ArrowRight } from "lucide-react";

const services = [
  { title: "Project Planning", icon: Layout, description: "End-to-end project roadmaps including feasibility studies and resource allocation." },
  { title: "Project Management", icon: Clipboard, description: "On-time delivery guaranteed with our expert project managers following Agile methodologies." },
  { title: "General Contracting", icon: Wrench, description: "Full contracting services for residential and commercial construction projects." },
  { title: "Interior Design", icon: Home, description: "Beautiful interior solutions that blend functionality with modern aesthetics." },
  { title: "Exterior Design", icon: Sun, description: "Curb appeal design work that transforms the look and feel of your property." },
  { title: "Space Planning", icon: Grid, description: "Optimal space utilisation strategies for maximum efficiency and flow." },
];

import TopNav from "@/components/shared/navigation/TopNav";
import Footer from "@/components/shared/Footer";

export default function ServicesPage() {
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
        {/* Hero Section */}
        <section className="py-24 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight"
            >
              Our Services
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 mb-10 leading-relaxed"
            >
              We provide comprehensive solutions tailored to your specific needs. 
              From initial planning to final execution, our team ensures excellence every step of the way.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg shadow-orange-100 active:scale-95">
                Get a Quote
              </button>
              <button className="border-2 border-gray-200 hover:border-gray-800 text-gray-800 font-bold py-4 px-8 rounded-full transition-all duration-300 active:scale-95">
                Learn More
              </button>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-100 rounded-[2rem] p-8 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300 group flex flex-col items-start"
              >
                <div className="bg-orange-50 p-4 rounded-2xl mb-6 group-hover:bg-orange-500 transition-colors duration-300">
                  <service.icon className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>
                <button className="flex items-center gap-2 text-orange-500 font-bold hover:gap-3 transition-all duration-300 mt-auto">
                  Learn more <ArrowRight size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trust CTA */}
        {/* <section className="bg-gray-900 py-20 px-4 mt-12 rounded-[3rem] mx-4 mb-20 overflow-hidden relative">
          <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
            <h2 className="text-3xl font-bold mb-6">Ready to start your next project?</h2>
            <p className="text-gray-400 mb-10 text-lg">Join over 1,000+ satisfied clients who trust our expertise.</p>
            <button className="bg-white text-gray-900 hover:bg-orange-500 hover:text-white font-extrabold py-4 px-10 rounded-full transition-all duration-500 shadow-xl active:scale-95">
              Contact Experts Today
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[120px] rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 blur-[120px] rounded-full -ml-32 -mb-32"></div>
        </section> */}
      </main>
      <Footer />
    </div>
  );
}
