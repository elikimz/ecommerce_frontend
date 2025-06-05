

import { useState } from "react";
import TopBar from "./TopBar";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);

  return (
    <header className="shadow font-sans w-full">
      {/* Promo bar */}
      <TopBar />

      {/* Main Header */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 py-3 gap-2 md:gap-0">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt=""
            className="h-8 w-auto"
          />
          <h1 className="text-lg md:text-2xl font-bold text-orange-500">
            Smart Indoor Decors
          </h1>
        </div>

        {/* Login Section */}
        <div className="relative">
          <button
            onClick={() => setShowLoginDropdown(!showLoginDropdown)}
            className="flex items-center gap-1 text-xs md:text-sm focus:outline-none"
          >
            <span role="img" aria-label="login" className="text-xl">
              👤
            </span>
            <span>Login</span>
            <ChevronDownIcon className="w-4 h-4" />
          </button>

          {showLoginDropdown && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-md w-36 z-50">
              <a
                href="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign In
              </a>
              <a
                href="/register"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Register
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-wrap justify-center gap-3 text-xs md:text-sm font-medium py-2 border-t border-gray-200 px-4 text-gray-700">
        <span className="text-orange-500 cursor-pointer">% Today’s Deals</span>
        <span className="cursor-pointer hover:text-orange-500">
          New Arrivals
        </span>
        <span className="cursor-pointer hover:text-orange-500">Computers</span>
        <span className="cursor-pointer hover:text-orange-500">Phones</span>
        <span className="cursor-pointer hover:text-orange-500">
          Accessories
        </span>
      </nav>
    </header>
  );
};

export default Navbar;
