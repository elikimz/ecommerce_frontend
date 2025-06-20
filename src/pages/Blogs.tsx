
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Blog = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <Helmet>
        <title>Smart Indoor Decors Blog | Home Decor Tips & Ideas</title>
        <meta
          name="description"
          content="Explore creative indoor decor ideas, styling tips, and home transformation guides from Smart Indoor Decors – your trusted decor store in Kenya."
        />
        <link rel="canonical" href="https://www.smartindoordecors.com/blog" />
      </Helmet>

      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-6">
          Our Blog: Style Your Home with Inspiration
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Welcome to the <strong>Smart Indoor Decors Blog</strong> — your go-to
          place for fresh ideas, quick styling tips, and smart ways to turn your
          house into a stylish home.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Placeholder blog cards */}
          <div className="bg-gray-50 p-5 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-orange-500 mb-2">
              5 Affordable Ways to Upgrade Your Living Room
            </h2>
            <p className="text-gray-600 text-sm mb-3">
              Discover budget-friendly indoor decor tricks that make a big
              difference.
            </p>
            <button className="text-sm text-orange-600 font-medium hover:underline">
              Read more →
            </button>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-orange-500 mb-2">
              How to Choose the Right Wall Clock for Your Space
            </h2>
            <p className="text-gray-600 text-sm mb-3">
              It’s more than timekeeping — learn how wall clocks can be your
              centerpiece.
            </p>
            <button className="text-sm text-orange-600 font-medium hover:underline">
              Read more →
            </button>
          </div>

          {/* Add more blog cards here as needed */}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
