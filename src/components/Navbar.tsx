import { useState } from "react";
import TopBar from "./TopBar";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="shadow-lg font-sans w-full bg-white z-50 sticky top-0">
      {/* Promo bar */}
      <TopBar />

      {/* Navigation Links - Enhanced desktop navigation */}
      <nav className="md:flex flex-col md:flex-row justify-center gap-6 text-sm font-semibold py-3 border-b border-gray-100 px-4 text-gray-700 hidden bg-gradient-to-r from-gray-50 to-white">
        <a
          href="/"
          className="nav-link cursor-pointer hover:text-orange-500 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-orange-50"
        >
          Home
        </a>
        <a
          href="/shop"
          className="nav-link cursor-pointer hover:text-orange-500 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-orange-50"
        >
          Shop
        </a>
        <a
          href="/about"
          className="nav-link cursor-pointer hover:text-orange-500 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-orange-50"
        >
          About Us
        </a>
        <a
          href="/contact"
          className="nav-link cursor-pointer hover:text-orange-500 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-orange-50"
        >
          Contact
        </a>
        <a
          href="/blog"
          className="nav-link cursor-pointer hover:text-orange-500 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-orange-50"
        >
          Blog
        </a>
        <a
          href="/faq"
          className="nav-link cursor-pointer hover:text-orange-500 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-orange-50"
        >
          FAQ
        </a>
        <a
          href="/services"
          className="nav-link cursor-pointer hover:text-orange-500 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-orange-50"
        >
          Services
        </a>
        <a
          href="/testimonials"
          className="nav-link cursor-pointer hover:text-orange-500 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-orange-50"
        >
          Testimonials
        </a>
      </nav>

      {/* Enhanced Mobile Navigation Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            <a
              href="/"
              className="mobile-nav-link block px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium"
            >
              🏠 Home
            </a>
            <a
              href="/shop"
              className="mobile-nav-link block px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium"
            >
              🛍️ Shop
            </a>
            <a
              href="/about"
              className="mobile-nav-link block px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium"
            >
              ℹ️ About Us
            </a>
            <a
              href="/contact"
              className="mobile-nav-link block px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium"
            >
              📞 Contact
            </a>
            <a
              href="/blog"
              className="mobile-nav-link block px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium"
            >
              📝 Blog
            </a>
            <a
              href="/faq"
              className="mobile-nav-link block px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium"
            >
              ❓ FAQ
            </a>
            <a
              href="/services"
              className="mobile-nav-link block px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium"
            >
              🔧 Services
            </a>
            <a
              href="/testimonials"
              className="mobile-nav-link block px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium"
            >
              ⭐ Testimonials
            </a>
          </div>
        </nav>
      )}

      {/* Enhanced Main Header */}
      <div className="flex justify-between items-center px-4 py-4 md:py-6 bg-gradient-to-r from-white to-gray-50">
        {/* Enhanced Logo Section */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="https://ik.imagekit.io/tfldedf0z/WhatsApp%20Image%202025-06-17%20at%2010.15.25_097a022b.jpg?updatedAt=1750151265388"
              alt="Smart Indoor Decors Logo"
              className="h-16 w-16 object-cover rounded-xl shadow-md border-2 border-orange-200"
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✨</span>
            </div>
          </div>
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-gray-800 leading-tight">
              Smart Indoor <span className="text-orange-500">Decors</span>
            </h1>
            <p className="text-xs md:text-sm text-gray-500 font-medium">
              Premium Home Solutions
            </p>
          </div>
        </div>

        {/* Enhanced Mobile Controls */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setShowLoginDropdown(!showLoginDropdown)}
            className="flex items-center gap-1 text-sm focus:outline-none bg-orange-100 px-3 py-2 rounded-lg hover:bg-orange-200 transition-all"
          >
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">
              👤
            </div>
            <ChevronDownIcon className="w-4 h-4 text-gray-600" />
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-all"
          >
            {menuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Enhanced Desktop Login Section */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setShowLoginDropdown(!showLoginDropdown)}
            className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
          >
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-sm">👤</span>
            </div>
            <span>Account</span>
            <ChevronDownIcon className="w-4 h-4" />
          </button>

          {showLoginDropdown && (
            <div className="absolute right-0 mt-3 bg-white shadow-xl border border-gray-100 rounded-xl w-48 z-50 overflow-hidden">
              <a
                href="/login"
                className="block px-6 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all font-medium border-b border-gray-100"
              >
                �� Sign In
              </a>
              <a
                href="/register"
                className="block px-6 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all font-medium"
              >
                📝 Create Account
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Login Dropdown */}
      {showLoginDropdown && (
        <div className="block md:hidden px-4 pb-2">
          <div className="bg-white shadow-md border rounded-md w-full z-40">
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
        </div>
      )}
    </header>
  );
};

export default Navbar;
