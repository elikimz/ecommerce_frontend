import { useState } from "react";
import TopBar from "./TopBar";
import {
  ChevronDownIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const UserNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="shadow font-sans bg-white">
      {/* Promo bar */}
      <TopBar />

      {/* Main navbar */}
      <div className="flex items-center justify-between px-4 py-2 text-sm">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          <img src="/logo.png" alt="TechGiants Logo" className="h-8" />
          <h1 className="text-lg md:text-2xl font-bold text-orange-500">
            Smart Indoor Decors
          </h1>
        </div>

        {/* Center Spacer */}
        <div className="flex-1"></div>

        {/* Cart + Account */}
        <div className="flex items-center gap-6 relative">
          {/* Cart */}
          <div
            onClick={() => (window.location.href = "/cart")}
            className="text-gray-600 hover:text-orange-500 cursor-pointer"
          >
            <ShoppingCartIcon className="w-7 h-7" />
          </div>

          {/* My Account */}
          <div
            className="flex items-center gap-1 text-xs md:text-sm cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <UserCircleIcon className="w-7 h-7 text-gray-700" />
            <span className="text-gray-800">My Account</span>
            <ChevronDownIcon className="w-4 h-4 text-gray-500" />

            {showDropdown && (
              <div className="absolute top-10 right-0 bg-white shadow border rounded w-40 z-50">
                <a
                  href="/account"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Profile
                </a>
                <a
                  href="/settings"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Settings
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex justify-center gap-4 text-xs md:text-sm font-medium py-2 border-t border-gray-200 bg-white">
        <span className="text-orange-500 cursor-pointer">% Today’s Deals</span>
        <span className="cursor-pointer text-gray-700 hover:text-orange-500">
          New Arrivals
        </span>
        <span className="cursor-pointer text-gray-700 hover:text-orange-500">
          Computers
        </span>
        <span className="cursor-pointer text-gray-700 hover:text-orange-500">
          Phones
        </span>
        <span className="cursor-pointer text-gray-700 hover:text-orange-500">
          Accessories
        </span>
      </nav>
    </header>
  );
};

export default UserNavbar;
