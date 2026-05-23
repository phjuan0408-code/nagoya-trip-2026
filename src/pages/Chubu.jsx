import Banner from "../components/Banner.jsx";
import PrefectureMap from "../components/PrefectureMap.jsx";
import { chubuPrefectures, places } from "../data/tripData.js";

export default function Chubu() {
  return (
    <>
      <Banner
        title="NAGOYA & CHUBU"
        meta="2026/5/8 - 5/16"
        subtitle="名古屋、木曾路、北阿爾卑斯到富山與岐阜。"
        imageUrl="/images/placeholders/chubu-banner.webp"
      />

      <section className="mx-auto max-w-5xl px-4 py-8 text-center font-serif text-[#504339]">
        <p className="text-lg leading-relaxed">九天從名古屋出發，沿著木曾路走進山城與宿場町，穿越立山黑部，再把富山、白川鄉、高山、上高地與岐阜收進同一張地圖。</p>
      </section>

      <section id="map-section" className="mx-auto max-w-6xl px-2 md:px-4">
        <PrefectureMap mode="chubu" highlightPrefectures={chubuPrefectures} places={places} />
      </section>
    </>
  );
}
