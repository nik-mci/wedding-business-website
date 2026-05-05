const CornerSVG = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 38 L5 5 L38 5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" fill="none" />
    <path d="M2 5 L5 2 L8 5 L5 8 Z" fill="currentColor" />
    <circle cx="5" cy="39.5" r="1.8" fill="currentColor" />
    <circle cx="39.5" cy="5" r="1.8" fill="currentColor" />
  </svg>
);

const CornerOrnament = ({ size = 44, inset = 14, opacity = 0.5, className = "" }) => {
  const base = { color: "var(--color-gold)", opacity, position: "absolute", pointerEvents: "none" };

  return (
    <>
      <div style={{ ...base, top: inset, left: inset }} className={className}>
        <CornerSVG size={size} />
      </div>
      <div style={{ ...base, top: inset, right: inset, transform: "scaleX(-1)" }} className={className}>
        <CornerSVG size={size} />
      </div>
      <div style={{ ...base, bottom: inset, left: inset, transform: "scaleY(-1)" }} className={className}>
        <CornerSVG size={size} />
      </div>
      <div style={{ ...base, bottom: inset, right: inset, transform: "scale(-1,-1)" }} className={className}>
        <CornerSVG size={size} />
      </div>
    </>
  );
};

export default CornerOrnament;
