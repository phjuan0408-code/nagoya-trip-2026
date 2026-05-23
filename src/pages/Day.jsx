import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Home, MapPin } from "lucide-react";
import PrefectureMap from "../components/PrefectureMap.jsx";
import StorySectionGrid from "../components/StorySectionGrid.jsx";
import { chubuPrefectures, dayStories, itineraryDays, places } from "../data/tripData.js";

const placeById = new Map(places.map((place) => [place.id, place]));
const getDaySlug = (day) => day.toLowerCase().replace(/\s+/g, "-");

export default function Day() {
  const { daySlug } = useParams();
  const day = dayStories[daySlug] || Object.values(dayStories)[0];
  const dayPlaces = day.placeIds.map((id) => placeById.get(id)).filter(Boolean);
  const currentIndex = itineraryDays.findIndex((item) => getDaySlug(item.day) === daySlug);
  const prevDay = currentIndex > 0 ? itineraryDays[currentIndex - 1] : null;
  const nextDay = currentIndex >= 0 && currentIndex < itineraryDays.length - 1 ? itineraryDays[currentIndex + 1] : null;

  return (
    <article className="bg-[#fdf6ef] font-serif">
      <header
        className="relative flex min-h-[420px] items-end bg-cover bg-center px-4 py-10 text-white"
        style={{ backgroundImage: `url(${day.cover})` }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <Link to="/itinerary" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/85 transition hover:text-white">
            <ArrowLeft size={17} />
            Back to Itinerary
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/75">Trip Journal</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">{day.day}</h1>
          <h2 className="mt-2 text-2xl font-semibold md:text-3xl">{day.title}</h2>
          {day.date && <p className="mt-3 text-sm text-white/75">{day.date}</p>}
          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-white/85">
            <MapPin size={16} />
            <span className="font-semibold">Route</span>
            <span className="text-white/55">/</span>
            {dayPlaces.map((place, index) => (
              <span key={place.id}>
                <Link to={`/place/${place.id}`} className="transition hover:text-white">
                  {place.name}
                </Link>
                {index < dayPlaces.length - 1 && <span className="mx-2 text-white/45">→</span>}
              </span>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/90">{day.reflection}</p>
        </div>
      </header>

      {day.routeCoordinates?.length > 1 && (
        <section className="mx-auto mt-10 max-w-5xl px-4">
          <div className="mb-4 font-serif">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-travel-green">Route Map</p>
            <h2 className="mt-1 text-2xl font-bold text-[#504339]">{day.day} 移動路線</h2>
          </div>
          <PrefectureMap
            mode="chubu"
            highlightPrefectures={chubuPrefectures}
            places={dayPlaces}
            routeCoordinates={day.routeCoordinates}
            routeEndpointNames={{
              start: day.routeStartName,
              end: day.routeEndName,
            }}
            routeEndpointLabelOffsets={day.routeEndpointLabelOffsets}
            placeLabelOffsets={day.routePlaceLabelOffsets}
            routeEndpointLabels
          />
        </section>
      )}

      <StorySectionGrid
        title={`${day.day} 景點紀錄`}
        sections={day.attractionSections}
        fallbackImage={day.cover}
      />

      <StorySectionGrid
        title={`${day.day} 美食紀錄`}
        sections={day.foodSections}
        fallbackImage={day.cover}
        imageVariant="square"
      />

      <nav className="mx-auto mt-14 grid max-w-5xl grid-cols-3 items-center gap-4 px-4 pb-14 text-[#504339]">
        <div className="flex justify-start">
          {prevDay && (
            <Link
              to={`/day/${getDaySlug(prevDay.day)}`}
              className="inline-flex items-center gap-2 rounded border border-[#ccc] px-4 py-2 text-sm transition hover:bg-[#fdf3e6] sm:text-base"
            >
              <ArrowLeft size={18} />
              {prevDay.day}
            </Link>
          )}
        </div>

        <div className="flex justify-center">
          <Link
            to="/itinerary"
            className="inline-flex items-center gap-2 rounded border border-[#ccc] px-4 py-2 text-sm transition hover:bg-[#fdf3e6] sm:text-base"
          >
            <Home size={18} />
            Itinerary
          </Link>
        </div>

        <div className="flex justify-end">
          {nextDay && (
            <Link
              to={`/day/${getDaySlug(nextDay.day)}`}
              className="inline-flex items-center gap-2 rounded border border-[#ccc] px-4 py-2 text-sm transition hover:bg-[#fdf3e6] sm:text-base"
            >
              {nextDay.day}
              <ArrowRight size={18} />
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}
