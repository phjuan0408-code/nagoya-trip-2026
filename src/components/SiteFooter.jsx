import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function SiteFooter() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer
      className="relative mt-16 bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/images/placeholders/footer.webp')" }}
    >
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 mx-auto flex h-52 max-w-6xl flex-col items-center justify-center px-4 text-center font-serif">
        <img
          src="/images/placeholders/author.webp"
          alt="Author"
          loading="lazy"
          className="mb-3 h-14 w-14 rounded-full border-2 border-white object-cover shadow-md"
        />
        <h2 className="text-base font-semibold">About Here</h2>
        <p className="mt-1 max-w-md text-xs leading-relaxed text-white/85">
          名古屋與日本中部旅行紀錄。用地圖、日期與地點整理城市、山路、老街和沿途吃到的味道。
        </p>
        <p className="mt-5 text-[11px] text-white/70">© 2026 Cody Juan. All rights reserved.</p>
      </div>

      {visible && (
        <button
          type="button"
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 grid h-10 w-10 place-items-center rounded-full bg-white text-travel-ink shadow-md transition hover:scale-105"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp size={20} />
        </button>
      )}
    </footer>
  );
}
