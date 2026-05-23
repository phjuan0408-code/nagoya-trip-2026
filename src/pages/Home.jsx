import Banner from "../components/Banner.jsx";
import PrefectureMap from "../components/PrefectureMap.jsx";
import { featureRegions } from "../data/tripData.js";

export default function Home() {
  return (
    <>
      <Banner
        title="JAPAN TRIPS"
        subtitle="從四國到名古屋，把每趟旅行都留在地圖上。"
        imageUrl="/images/placeholders/home-banner.webp"
      />

      <section className="mx-auto max-w-5xl px-4 py-8 text-center font-serif text-[#504339]">
        <p className="text-lg leading-relaxed">從瀨戶內海邊的四國，到北阿爾卑斯山腳下的名古屋與日本中部，每一段旅程都用地圖收起來。</p>
      </section>

      <section id="map-section" className="mx-auto max-w-6xl px-2 pb-12 md:px-4">
        <PrefectureMap mode="japan" regions={featureRegions} />
      </section>
    </>
  );
}
