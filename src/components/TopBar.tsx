const TopBar = () => {
  return (
    <div className="bg-[#0c1b2b] text-white text-xs py-1 overflow-hidden">
      <div className="whitespace-nowrap animate-marquee flex gap-8 px-4">
        <span>
          🎉 Welcome to Smart Indoor Decors – Style Your Space Effortlessly
        </span>
        <span>🚚 Nationwide Delivery | Fast & Reliable</span>
        <span>🔄 Hassle-Free Returns Within 7 Days</span>
        <span>
          📞 Need Help? Call Us:{" "}
          <span className="text-orange-500">+254 741 769 787</span>
        </span>
        <span>
          📩 Email Support:{" "}
          <span className="text-orange-500">smartindoordecors@gmail.com</span>
        </span>
      </div>
    </div>
  );
};

export default TopBar;
