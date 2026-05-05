const GoldDivider = ({ variant = "heading", flip = false, darkBg = false, className = "" }) => {
  const color = "#C9A234";
  const bgFill = darkBg ? "#1A1408" : "#FDFAF5";

  if (variant === "section") {
    return (
      <div
        className={`w-full flex items-center justify-center ${className}`}
        style={{ color, opacity: 0.75 }}
      >
        <div className="flex-grow h-[1px] bg-current" />
        <svg width="300" height="52" viewBox="0 0 300 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
          <path d="M 10 26 C 40 26, 40 18, 80 18 C 110 18, 130 38, 150 38 C 170 38, 190 18, 220 18 C 260 18, 260 26, 290 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="5" cy="26" r="2.5" fill="currentColor" />
          <circle cx="295" cy="26" r="2.5" fill="currentColor" />
          <circle cx="150" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <div className="flex-grow h-[1px] bg-current" />
      </div>
    );
  }

  return (
    <svg
      width="500"
      height="52"
      viewBox="0 0 500 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`opacity-90 max-w-full ${className}`}
      style={{ color, transform: flip ? "scaleY(-1)" : undefined }}
    >
      <path d="M0 42 L180 42" stroke="currentColor" strokeWidth="1.2" />
      <path d="M320 42 L500 42" stroke="currentColor" strokeWidth="1.2" />
      <path d="M190 42 C 210 42, 210 26, 230 26 C 240 26, 245 42, 250 42 C 255 42, 260 26, 270 26 C 290 26, 290 42, 310 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="185" cy="42" r="2.5" fill="currentColor" />
      <circle cx="315" cy="42" r="2.5" fill="currentColor" />
      <circle cx="250" cy="22" r="5" fill="currentColor" />
      <circle cx="250" cy="22" r="2.5" fill={bgFill} />
    </svg>
  );
};

export default GoldDivider;
