export default function AccountHero({ title, subtitle, right }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #FAF7F2 0%, #F0EAE0 100%)",
        borderBottom: "1px solid rgba(184,150,46,0.25)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-10 md:py-14 flex items-end justify-between gap-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#B8962E] mb-2 font-medium">
            My Account
          </p>
          <h1 className="font-heading text-[40px] md:text-[52px] font-light text-[#1C1712] leading-none">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[14px] text-[#9A8F7E] mt-3 font-light leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {right && (
          <div className="hidden md:block shrink-0 text-right">{right}</div>
        )}
      </div>
    </div>
  );
}
