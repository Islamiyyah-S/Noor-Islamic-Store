const items = [
  "Free Delivery Over ₦20,000",
  "New Abaya Collection",
  "Ramadan Special Offers",
  "Premium Oud Perfumes",
  "Authentic Islamic Books",
];

export default function Ticker() {
  const doubled = [...items, ...items];

  return (
    <>
      <div className="bg-black py-3 overflow-hidden">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "ticker 20s linear infinite" }}
        >
          {doubled.map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="text-[11px] tracking-[3px] uppercase text-[#C9A84C] px-10">
                {item}
              </span>
              <span className="text-white text-xs">✦</span>
            </span>
          ))}
        </div>

        <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      </div>
    </>
  );
}
