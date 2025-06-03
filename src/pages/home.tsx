import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search } from "lucide-react";
import { useGetProductsQuery } from "../features/Products/productsAPI";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [filters, setFilters] = useState({ name: "", category: "" });

  useEffect(() => {
    setFilters({
      name: "", // Clear name filter when category changes
      category: categoryInput,
    });
    setSearchInput("");
  }, [categoryInput]);

  const {
    data: products = [],
    isLoading,
    error,
  } = useGetProductsQuery(filters);

  const uniqueCategories = Array.from(
    new Set(products.map((p) => p.category?.name))
  ).filter(Boolean);

  const handleSearch = (searchTerm: string) => {
    setFilters((prev) => ({
      ...prev,
      name: searchTerm,
    }));
    setSearchInput("");
  };

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation(); // Prevent navigating to product details
    // Redirect to login page on add to cart click
    navigate("/login");
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to KiliShop
            </h1>
            <p className="text-lg md:text-xl">
              Shop your favorite products with amazing deals every day
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-4">
          <SearchBar initialSearch={searchInput} onSearch={handleSearch} />
        </section>

        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-gray-100 p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Search Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <input
                type="text"
                placeholder="Search for products..."
                className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-md"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    handleSearch(e.currentTarget.value.trim());
                }}
              />
              <select
                className="px-4 py-2 border border-gray-300 rounded-md"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
              >
                <option value="">All Categories</option>
                {uniqueCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleSearch(searchInput.trim())}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-semibold mb-6">Trending Products</h2>

          {isLoading && <p>Loading...</p>}
          {error && (
            <p className="text-red-500">
              Error loading products. Please try again.
            </p>
          )}
          {!isLoading && products.length === 0 && !error && (
            <p>No products found.</p>
          )}

          {!isLoading && products.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border rounded-xl shadow-sm hover:shadow-md transition group cursor-pointer"
                  onClick={() => navigate(`/login`)}
                >
                  <div className="overflow-hidden rounded-t-xl">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-48 w-full object-cover transform group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-3 space-y-1">
                    <h3 className="text-sm font-semibold text-gray-800 truncate">
                      {product.name}
                    </h3>
                    <div className="text-yellow-500 text-xs">★★★★☆</div>
                    <p className="text-xs text-gray-500 truncate">
                      {product.description}
                    </p>
                    <p className="text-orange-600 font-bold text-sm">
                      KES {product.price.toLocaleString()}
                    </p>

                    {/* Add to Cart button */}
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium py-1.5 rounded-md transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
