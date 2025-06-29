import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-gray-200 pt-16 pb-8 w-full font-sans relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5"></div>
      <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>

      {/* Top Footer */}
      <div className="relative max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* Enhanced Brand Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-3 text-white bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Smart Indoor Decors
            </h2>
            <p className="text-orange-300 text-sm font-medium mb-4">
              Premium Home Solutions
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              Transform your living space with our curated collection of premium
              home décor, electronics, and lifestyle products. Quality
              guaranteed, delivered across Kenya.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all cursor-pointer group">
              <Facebook className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </div>
            <div className="p-3 bg-gradient-to-r from-sky-500 to-sky-600 rounded-xl hover:from-sky-600 hover:to-sky-700 transition-all cursor-pointer group">
              <Twitter className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </div>
            <div className="p-3 bg-gradient-to-r from-pink-600 to-pink-700 rounded-xl hover:from-pink-700 hover:to-pink-800 transition-all cursor-pointer group">
              <Instagram className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>

        {/* Enhanced Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="/"
                className="text-gray-300 hover:text-orange-400 transition-colors flex items-center gap-2 group"
              >
                <span className="w-1 h-1 bg-orange-400 rounded-full group-hover:w-2 transition-all"></span>
                Home
              </a>
            </li>
            <li>
              <a
                href="/shop"
                className="text-gray-300 hover:text-orange-400 transition-colors flex items-center gap-2 group"
              >
                <span className="w-1 h-1 bg-orange-400 rounded-full group-hover:w-2 transition-all"></span>
                Shop All Products
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-gray-300 hover:text-orange-400 transition-colors flex items-center gap-2 group"
              >
                <span className="w-1 h-1 bg-orange-400 rounded-full group-hover:w-2 transition-all"></span>
                About Us
              </a>
            </li>
            <li>
              <a
                href="/blog"
                className="text-gray-300 hover:text-orange-400 transition-colors flex items-center gap-2 group"
              >
                <span className="w-1 h-1 bg-orange-400 rounded-full group-hover:w-2 transition-all"></span>
                Blog & Tips
              </a>
            </li>
            <li>
              <a
                href="/register"
                className="text-gray-300 hover:text-orange-400 transition-colors flex items-center gap-2 group"
              >
                <span className="w-1 h-1 bg-orange-400 rounded-full group-hover:w-2 transition-all"></span>
                My Account
              </a>
            </li>
          </ul>
        </div>

        {/* Enhanced Customer Service */}
        <div>
          <h3 className="text-xl font-bold mb-6 text-white">Customer Care</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="/faq"
                className="text-gray-300 hover:text-orange-400 transition-colors flex items-center gap-2 group"
              >
                <span className="w-1 h-1 bg-orange-400 rounded-full group-hover:w-2 transition-all"></span>
                Help Center & FAQ
              </a>
            </li>
            <li>
              <a
                href="/services"
                className="text-gray-300 hover:text-orange-400 transition-colors flex items-center gap-2 group"
              >
                <span className="w-1 h-1 bg-orange-400 rounded-full group-hover:w-2 transition-all"></span>
                Returns & Refunds
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-gray-300 hover:text-orange-400 transition-colors flex items-center gap-2 group"
              >
                <span className="w-1 h-1 bg-orange-400 rounded-full group-hover:w-2 transition-all"></span>
                Shipping Information
              </a>
            </li>
            <li>
              <a
                href="/terms"
                className="text-gray-300 hover:text-orange-400 transition-colors flex items-center gap-2 group"
              >
                <span className="w-1 h-1 bg-orange-400 rounded-full group-hover:w-2 transition-all"></span>
                Terms & Conditions
              </a>
            </li>
            <li>
              <a
                href="/privacy"
                className="text-gray-300 hover:text-orange-400 transition-colors flex items-center gap-2 group"
              >
                <span className="w-1 h-1 bg-orange-400 rounded-full group-hover:w-2 transition-all"></span>
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Enhanced Newsletter */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
            <span className="text-2xl">📧</span>
            Stay Updated
          </h3>
          <p className="text-sm text-gray-300 mb-6 leading-relaxed">
            Subscribe to receive exclusive deals, new product launches, and home
            décor inspiration.
          </p>
          <form className="space-y-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </div>

      {/* Enhanced Bottom Footer */}
      <div className="relative border-t border-gray-700 mt-16 pt-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-6 text-center lg:text-left">
            <div>
              <p className="text-gray-400 mb-2">
                &copy; {new Date().getFullYear()} Smart Indoor Decors. All
                rights reserved.
              </p>
              <p className="text-sm text-gray-500">
                Transforming homes across Kenya with premium quality products
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2 text-gray-300 hover:text-orange-400 transition-colors">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm">smartindoordecors@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 hover:text-orange-400 transition-colors">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm">+254 741 769 787</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 hover:text-orange-400 transition-colors">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm">Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
