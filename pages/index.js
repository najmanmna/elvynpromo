import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Background gradient / smoke effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black opacity-90"></div>

     
      {/* Content */}
      <section className="relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-6xl font-serif mb-6 tracking-wide">
          ELVYN
        </h1>
        <h2 className="text-2xl md:text-3xl font-light uppercase mb-4 tracking-[0.2em]">
          We Are Launching Soon
        </h2>
        <p className="text-gray-400 max-w-md mx-auto mb-10">
          A new era of timeless elegance in women’s bags. Be the first to know
          when we go live.
        </p>

        <Link
          href="/promo"
          className="bg-transparent text- border border-white hover:text-gray-100 hover:shadow-[0_0_12px_2px_rgba(255,255,255,0.6)] inline-block font-medium px-6 py-3   transition"
        >
          Claim 15% Promo
        </Link>
      </section>
    </main>
  );
}
