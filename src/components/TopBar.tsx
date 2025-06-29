const TopBar = () => {
  return (
    <header
      className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 text-white text-sm py-2 overflow-hidden border-b border-orange-500"
      aria-label="Site highlights"
    >
      <div className="whitespace-nowrap animate-marquee flex gap-12 px-4 font-medium">
        <span className="flex items-center gap-2">
          <span className="text-yellow-400">🎉</span>
          <span>Welcome to Smart Indoor Decors – Transform Your Space</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="text-green-400">🚚</span>
          <span>Free Nationwide Delivery on Orders Over KES 5,000</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="text-blue-400">🔄</span>
          <span>7-Day Hassle‑Free Returns Policy</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="text-orange-400">📞</span>
          <span>
            24/7 Support:{" "}
            <span className="text-orange-300 font-semibold">
              +254 741 769 787
            </span>
          </span>
        </span>
        <span className="flex items-center gap-2">
          <span className="text-purple-400">📩</span>
          <span>
            Email:{" "}
            <span className="text-orange-300 font-semibold">
              smartindoordecors@gmail.com
            </span>
          </span>
        </span>
        <span className="flex items-center gap-2">
          <span className="text-red-400">⚡</span>
          <span>Limited Time: Up to 30% Off Selected Items</span>
        </span>
      </div>
    </header>
  );
};

export default TopBar;
