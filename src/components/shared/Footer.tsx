"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const LOGO_PATH = "/assets/logo.png";
const APP_NAME = "Ubuyee";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    otherPages: [
      { label: "Home", path: "/user/dashboard" },
      { label: "About Us", path: "/about" },
      { label: "Shop", path: "/shop" },
      { label: "Orders", path: "/orders" },
      { label: "Contact", path: "/contact" },
    ],
    quickLinks: [
      { label: "Privacy Policy", path: "/privacy" },
      { label: "Terms of Service", path: "/terms" },
      { label: "Disclaimer", path: "/disclaimer" },
      { label: "Credits", path: "/credits" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="flex flex-col gap-6">
            <Link href="/user/dashboard">
              <Image
                src={LOGO_PATH}
                alt={APP_NAME}
                width={120}
                height={40}
                className="brightness-0 invert object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Delivering excellence and quality across all our services. Your satisfaction is our priority, every day of the year.
            </p>
          </div>

          {/* Other Pages */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-b border-gray-800 pb-2">Other Pages</h3>
            <ul className="space-y-4">
              {footerLinks.otherPages.map((link) => (
                <li key={link.path}>
                  <Link 
                    href={link.path}
                    className="text-gray-400 hover:text-orange-500 transition-colors duration-200 text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white border-b border-gray-800 pb-2">Quick Links</h3>
            <ul className="space-y-4">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    href={link.path}
                    className="text-gray-400 hover:text-orange-500 transition-colors duration-200 text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs font-semibold uppercase tracking-widest">
            <p>&copy; {currentYear} {APP_NAME} All rights reserved.</p>
            <div className="flex gap-6">
              <span className="hover:text-white transition-colors cursor-pointer">Security</span>
              <span className="hover:text-white transition-colors cursor-pointer">Uptime</span>
              <span className="hover:text-white transition-colors cursor-pointer">Support</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
