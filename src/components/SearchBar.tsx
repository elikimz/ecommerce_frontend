import { useState, useEffect } from "react";

interface SearchBarProps {
  initialSearch?: string;
  onSearch: (searchTerm: string) => void;
}

const SearchBar = ({ initialSearch = "", onSearch }: SearchBarProps) => {
  const [searchInput, setSearchInput] = useState(initialSearch);

  // Reset searchInput when initialSearch changes
  useEffect(() => {
    setSearchInput(initialSearch);
  }, [initialSearch]);

  const handleSearch = () => {
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      setSearchInput(""); // Clear input after search
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex justify-center items-center py-4 px-4">
      <div className="relative w-full max-w-2xl">
        <input
          type="text"
          placeholder="🔍 Search for products, brands, categories..."
          className="w-full border-2 border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm md:text-base shadow-lg transition-all duration-200 pr-16"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl p-3 transition-all duration-200 shadow-lg hover:shadow-xl"
          aria-label="Search"
        >
          <svg
            className="text-white w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103 10.5a7.5 7.5 0 0013.15 6.15z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
