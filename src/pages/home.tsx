
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Banner */}
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

        {/* Search + Filter */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-gray-100 p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Search Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <input
                type="text"
                placeholder="Search for products..."
                className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-md"
              />
              <select className="px-4 py-2 border border-gray-300 rounded-md">
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="home">Home & Kitchen</option>
                <option value="health">Health & Beauty</option>
                <option value="kids">Kids & Baby</option>
              </select>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>
        </section>

        {/* Product Cards */}
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-semibold mb-6">Trending Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-lg transition"
              >
                <div className="h-40 bg-gray-200" />
                <div className="p-4">
                  <h3 className="text-sm font-medium">Product Name {i + 1}</h3>
                  <p className="text-orange-600 font-semibold mt-1">
                    KES 1,999
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
