"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiShoppingCart, FiLock, FiLogOut } from "react-icons/fi";

const LOGO_PATH = "/assets/logo.png";
const APP_NAME = "Ubuyee";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", path: "/user/dashboard" },
    { label: "Shop", path: "/shop" },
    { label: "Orders", path: "/orders" },
    { label: "Contact", path: "/contact" },
    { label: "Services", path: "/services" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <Link href="/user/dashboard">
            <Image
              src={LOGO_PATH}
              alt={APP_NAME}
              width={120}
              height={40}
              className="object-contain cursor-pointer"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-sm transition-colors duration-200 ${
                pathname === link.path
                  ? "text-red-500 font-semibold"
                  : "text-gray-600 hover:text-orange-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side Icons & Actions */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-6">
            <button className="text-gray-500 hover:text-orange-500 transition-colors">
              <FiShoppingCart size={20} />
            </button>
            <button className="text-gray-500 hover:text-orange-500 transition-colors">
              <FiLock size={18} />
            </button>
            <div className="w-px h-6 bg-gray-200"></div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
            <div className="w-8 h-8 rounded-full bg-orange-100 border-2 border-orange-500 flex items-center justify-center text-orange-600 font-bold text-xs shadow-inner">
              U
            </div>
            <span className="text-sm font-semibold text-gray-700">User</span>
          </div>

          <button 
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-orange-100 transition-all active:scale-95 flex items-center gap-2 group"
            onClick={() => {
              // Self-contained logout logic or placeholder
              window.location.href = "/login";
            }}
          >
            <FiLogOut className="group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
