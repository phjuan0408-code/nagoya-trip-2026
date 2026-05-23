import { ChevronDown } from "lucide-react";

export default function Banner({ title, subtitle, meta, imageUrl, mapTarget = "map-section" }) {
  return (
    <section
      className="relative flex h-[420px] min-h-[55vh] w-full items-center justify-center overflow-hidden bg-cover bg-center text-white md:h-[520px]"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative z-10 px-4 text-center font-serif">
        <h1 className="text-4xl font-bold leading-tight md:text-6xl">{title}</h1>
        {meta && (
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/85 md:text-base">
            {meta}
          </p>
        )}
        <p className="mt-3 text-base leading-relaxed md:text-lg">{subtitle}</p>
      </div>
      <button
        type="button"
        aria-label="Scroll to map"
        className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-white/80 transition hover:text-white"
        onClick={() => document.getElementById(mapTarget)?.scrollIntoView({ behavior: "smooth" })}
      >
        <ChevronDown size={34} className="animate-bounce" />
      </button>
    </section>
  );
}
