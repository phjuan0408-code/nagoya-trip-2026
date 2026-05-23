import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Map } from "lucide-react";
import CityIntro from "../components/CityIntro.jsx";
import PrefectureMap from "../components/PrefectureMap.jsx";
import StorySectionGrid from "../components/StorySectionGrid.jsx";
import { chubuPrefectures, itineraryDays, places, storyItems } from "../data/tripData.js";

export default function Place() {
  const { placeId } = useParams();
  const place = places.find((item) => item.id === placeId) || places[0];
  const relatedDays = itineraryDays.filter((day) => day.placeIds.includes(place.id));
  const attractionSections = storyItems.filter(
    (item) => item.category === "attraction" && item.placeIds.includes(place.id)
  );
  const foodSections = storyItems.filter(
    (item) => item.category === "food" && item.placeIds.includes(place.id)
  );

  return (
    <article className="bg-[#fdf6ef] px-4 py-12 font-serif">
      <div className="mx-auto mb-8 max-w-6xl">
        <Link to="/chubu" className="inline-flex items-center gap-2 text-sm font-semibold text-[#504339] transition hover:text-travel-green">
            <ArrowLeft size={17} />
            Back to Chubu
        </Link>
      </div>

      <CityIntro
        title={`About ${place.name}`}
        subtitle={place.prefecture}
        imageSrc={place.cover}
        imageAlt={place.name}
        paragraphs={[place.summary]}
      />

      <div className="mx-auto mt-8 flex max-w-6xl flex-wrap gap-2 px-4">
        {relatedDays.map((day) => (
          <Link
            key={day.day}
            to="/itinerary"
            className="rounded bg-white px-3 py-1 text-sm font-semibold text-travel-slate shadow-sm transition hover:text-travel-green"
          >
            {day.day}
          </Link>
        ))}
      </div>

      <StorySectionGrid
        title={`${place.name} 景點紀錄`}
        sections={attractionSections}
        fallbackImage={place.cover}
      />

      <StorySectionGrid
        title={`${place.name} 美食紀錄`}
        sections={foodSections}
        fallbackImage={place.cover}
        imageVariant="square"
      />

      <section className="mx-auto mt-16 max-w-5xl px-4">
        <PrefectureMap
          mode="chubu"
          highlightPrefectures={chubuPrefectures}
          places={[place]}
          selectedPlaceId={place.id}
        />
      </section>

      <div className="mx-auto mt-10 flex max-w-5xl justify-center px-4">
        <Link
          to="/chubu#map-section"
          className="inline-flex items-center gap-3 rounded-full bg-[#504339] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-travel-green hover:shadow-lg"
        >
          <Map size={18} />
          中部地圖
        </Link>
      </div>
    </article>
  );
}
