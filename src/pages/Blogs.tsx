import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Blog = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <Helmet>
        <title>
          Smart Indoor Decors Blog | Home Decor Tips & Ideas in Kenya
        </title>
        <meta
          name="description"
          content="Explore creative home styling tips, furniture trends, and affordable Kenyan decor ideas. Learn how to use Smart Indoor Decors products to transform your space."
        />
        <link rel="canonical" href="https://www.smartindoordecors.com/blog" />
      </Helmet>

      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-6">
          Our Blog: Style Your Kenyan Home with Inspiration
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Welcome to the <strong>Smart Indoor Decors Blog</strong> — your
          trusted source for modern decor ideas, local product highlights, and
          DIY interior transformations for Kenyan homes.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Blog Post #1 */}
          <article className="bg-gray-50 p-5 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-orange-500 mb-2">
              5 Affordable Ways to Upgrade Your Living Room in Kenya
            </h2>
            <p className="text-gray-600 text-sm mb-3">
              Discover budget-friendly ways to make your Nairobi living room pop
              with accent chairs, scented candles, and modern throw pillows from
              our shop.
            </p>
            <p className="text-xs text-gray-500 mb-2">
              Tags:{" "}
              <span className="text-orange-500">affordable decor Kenya</span>,{" "}
              <span className="text-orange-500">buy accent chairs Nairobi</span>
              , <span className="text-orange-500">living room upgrade KE</span>
            </p>
            <a
              href=""
              className="text-sm text-orange-600 font-medium hover:underline"
            >
              Shop Accent Chairs →
            </a>
          </article>

          {/* Blog Post #2 */}
          <article className="bg-gray-50 p-5 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-orange-500 mb-2">
              How to Choose the Right Wall Clock for Your Kenyan Space
            </h2>
            <p className="text-gray-600 text-sm mb-3">
              Wall clocks aren’t just for telling time. Explore how our
              decorative wall clocks double as statement pieces for your hallway
              or office.
            </p>
            <p className="text-xs text-gray-500 mb-2">
              Tags: <span className="text-orange-500">wall clocks Kenya</span>,{" "}
              <span className="text-orange-500">
                interior accessories Nairobi
              </span>
              , <span className="text-orange-500">home style tips KE</span>
            </p>
            <a
              href="/shop"
              className="text-sm text-orange-600 font-medium hover:underline"
            >
              View Wall Clocks →
            </a>
          </article>

          {/* Blog Post #3 (You can keep adding more like this) */}
          <article className="bg-gray-50 p-5 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-orange-500 mb-2">
              Bedroom Glow-Up: Choosing Curtains, Bedding & Lighting
            </h2>
            <p className="text-gray-600 text-sm mb-3">
              Elevate your bedroom with blackout curtains, stylish pendant
              lights, and breathable bedding sets available locally on Smart
              Indoor Decors.
            </p>
            <p className="text-xs text-gray-500 mb-2">
              Tags: <span className="text-orange-500">bedroom decor Kenya</span>
              , <span className="text-orange-500">curtains Nairobi</span>,{" "}
              <span className="text-orange-500">buy pendant lights KE</span>
            </p>
            <a
              href="/shop"
              className="text-sm text-orange-600 font-medium hover:underline"
            >
              Browse Bedroom Products →
            </a>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
