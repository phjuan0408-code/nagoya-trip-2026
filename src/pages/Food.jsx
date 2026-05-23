import { useMemo, useState } from "react";
import StorySectionGrid from "../components/StorySectionGrid.jsx";
import { storyItems } from "../data/tripData.js";
import { getFoodTagIcon } from "../utils/foodTags.js";

const preferredTagOrder = ["全部", "麵食", "拉麵", "主食", "甜點", "點心", "冰品", "水果", "飲品"];

export default function Food() {
  const foodSections = useMemo(
    () => storyItems.filter((item) => item.category === "food"),
    []
  );
  const availableTags = useMemo(() => {
    const usedTags = new Set(foodSections.flatMap((item) => item.tags || []));
    const orderedTags = preferredTagOrder.filter((tag) => tag === "全部" || usedTags.has(tag));
    const extraTags = [...usedTags].filter((tag) => !preferredTagOrder.includes(tag)).sort();
    return [...orderedTags, ...extraTags];
  }, [foodSections]);
  const [activeTag, setActiveTag] = useState("全部");

  const filteredSections = activeTag === "全部"
    ? foodSections
    : foodSections.filter((item) => item.tags?.includes(activeTag));

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 font-serif">
      <h1 className="flex items-center gap-3 text-4xl font-bold leading-tight text-travel-ink">
        <span aria-hidden="true" className="text-3xl">🍽️</span>
        <span>中部美食總覽</span>
      </h1>

      <div className="mt-7 flex flex-wrap gap-3">
        {availableTags.map((tag) => {
          const isActive = activeTag === tag;

          return (
            <button
              type="button"
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`inline-flex min-h-10 items-center gap-2 whitespace-nowrap rounded-full border px-5 font-serif text-base font-semibold leading-none shadow-sm transition ${
                isActive
                  ? "border-[#504339] bg-[#504339] text-white shadow-md"
                  : "border-[#d8d2c8] bg-white/80 text-[#504339] hover:border-[#b9afa4] hover:bg-white"
              }`}
            >
              <span aria-hidden="true" className="text-sm leading-none">{getFoodTagIcon(tag)}</span>
              <span>{tag}</span>
            </button>
          );
        })}
      </div>

      <StorySectionGrid
        title={activeTag === "全部" ? "全部美食" : `${activeTag}紀錄`}
        sections={filteredSections}
        fallbackImage="./images/placeholders/nagoya.webp"
      />
    </section>
  );
}
