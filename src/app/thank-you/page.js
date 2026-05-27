import Link from "next/link";

export const metadata = {
  title: "Thank You — Vows & Vedas",
  description: "Thank you for your enquiry. We'll be in touch shortly.",
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-ink flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[10px] tracking-[0.5em] uppercase font-medium mb-6" style={{ color: 'var(--color-gold)' }}>
        Enquiry Received
      </p>
      <h1 className="font-heading text-surface font-light text-4xl sm:text-5xl md:text-6xl leading-[1.1] mb-6">
        Thank You for<br /><em className="italic">Reaching Out</em>
      </h1>
      <div className="h-px w-16 mb-6" style={{ background: 'rgba(201,162,52,0.4)' }}></div>
      <p className="font-body font-light text-surface/60 text-sm sm:text-base leading-[1.8] max-w-md mb-10">
        We've received your enquiry and will be in touch within 24–48 hours to begin planning your perfect celebration.
      </p>
      <Link href="/" className="btn-gold">
        <span>Back to Home</span>
      </Link>
    </div>
  );
}
