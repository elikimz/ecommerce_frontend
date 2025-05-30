import { useState } from "react";
import TopBar from "./TopBar";
import SearchBar from "./SearchBar";
import { ChevronDownIcon, ShoppingCartIcon } from "@heroicons/react/24/outline"; // added ShoppingCartIcon

const Navbar = () => {
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);

  return (
    <header className="shadow font-sans">
      {/* Promo bar */}
      <TopBar />

      {/* Main header with logo and Login + Cart */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 py-2 text-sm">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="TechGiants Logo" className="h-8" />
          <h1 className="text-lg md:text-2xl font-bold text-orange-500">
            TechGiants
          </h1>
        </div>

        {/* Group Login and Cart together */}
        <div className="flex items-center gap-6 mt-2 md:mt-0 cursor-pointer relative">
          {/* Login button with dropdown */}
          <div
            className="flex items-center gap-1 text-xs md:text-sm"
            onClick={() => setShowLoginDropdown(!showLoginDropdown)}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A13.937 13.937 0 0112 15c2.597 0 5.017.76 7.121 2.054M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>Login</span>
            <ChevronDownIcon className="w-4 h-4" />
            {showLoginDropdown && (
              <div className="absolute top-6 right-0 bg-white shadow border rounded w-32 z-50">
                <a
                  href="/login"
                  className="block px-3 py-2 hover:bg-gray-100 text-xs md:text-sm"
                >
                  Sign In
                </a>
                <a
                  href="/register"
                  className="block px-3 py-2 hover:bg-gray-100 text-xs md:text-sm"
                >
                  Register
                </a>
              </div>
            )}
          </div>

          {/* Cart icon */}
          <div
            onClick={() => (window.location.href = "/cart")}
            aria-label="Cart"
            className="text-gray-700 hover:text-orange-500"
          >
            <ShoppingCartIcon className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar />

      {/* Nav Links below SearchBar */}
      <nav className="flex justify-center gap-4 text-xs md:text-sm font-medium py-2 border-t border-gray-200">
        <span className="text-orange-500 cursor-pointer">% Today’s Deals</span>
        <span className="cursor-pointer">New Arrivals</span>
        <span className="cursor-pointer">Computers</span>
        <span className="cursor-pointer">Phones</span>
        <span className="cursor-pointer">Accessories</span>
      </nav>
    </header>
  );
};

export default Navbar;
