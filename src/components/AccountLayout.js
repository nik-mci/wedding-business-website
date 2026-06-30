"use client";

const BG_STYLE = {
  backgroundImage:
    "repeating-linear-gradient(-45deg, transparent, transparent 24px, rgba(201,162,52,0.03) 24px, rgba(201,162,52,0.03) 25px)",
};

export default function AccountLayout({ children, unauthed, onSignIn }) {
  if (unauthed) {
    return (
      <div className="pt-[104px] min-h-screen bg-[#FDFAF5] flex items-center justify-center" style={BG_STYLE}>
        <div className="text-center">
          <p className="font-heading text-2xl font-light text-[#1A1408] mb-3">
            Sign in to continue
          </p>
          <button
            onClick={onSignIn}
            className="text-[10px] uppercase tracking-[0.3em] font-medium px-6 py-3 bg-[#C9A234] text-white hover:opacity-90 transition-opacity"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[104px] min-h-screen bg-[#FDFAF5]" style={BG_STYLE}>
      <div className="max-w-[860px] mx-auto px-6 lg:px-12 py-10">
        {children}
      </div>
    </div>
  );
}
