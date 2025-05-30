const TopBar = () => {
  return (
    <div className="bg-[#0c1b2b] text-white text-xs py-1 overflow-hidden">
      <div className="whitespace-nowrap animate-marquee flex gap-8 px-4">
        <span>🔥 Hot Deals - Up to 40% off on selected items</span>
        <span>🚚 Fast delivery all over the country</span>
        <span>🛡 1-Year warranty on all products</span>
        <span>
          📞 Customer Support:{" "}
          <span className="text-orange-500">+254 727 498 440</span>
        </span>
      </div>
    </div>
  );
};

export default TopBar;
