import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { itineraryDays, places } from "../data/tripData.js";

const placeById = new Map(places.map((place) => [place.id, place]));
const daySlug = (day) => day.toLowerCase().replace(/\s+/g, "-");

export default function Itinerary() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <div className="font-serif">
        <p className="text-sm font-semibold uppercase tracking-wide text-travel-green">Route</p>
        <h1 className="mt-2 text-4xl font-bold text-travel-ink">Itinerary</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[#504339]">
          依照旅行順序串起每一天，地點內容則回到各自的頁面整理。
        </p>
      </div>

      <div className="mt-10 space-y-6">
        {itineraryDays.map((day) => {
          const dayPlaces = day.placeIds.map((id) => placeById.get(id)).filter(Boolean);
          const dayPath = `/day/${daySlug(day.day)}`;

          return (
            <article key={day.day} className="rounded-lg bg-white p-5 shadow-md">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <Link
                    to={dayPath}
                    className="text-sm font-bold text-travel-green transition hover:text-travel-ink"
                  >
                    {day.day}
                  </Link>
                  <Link
                    to={dayPath}
                    className="mt-1 block font-serif text-xl font-bold text-travel-ink transition hover:text-travel-green"
                  >
                    {day.title}
                  </Link>
                  {day.date && <p className="mt-1 text-sm text-neutral-500">{day.date}</p>}
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-gray-600">{day.note}</p>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                {dayPlaces.map((place, index) => (
                  <div key={place.id} className="flex items-center gap-3">
                    <Link
                      to={`/place/${place.id}`}
                      className="inline-flex items-center gap-2 rounded-md bg-travel-mist px-3 py-2 text-sm font-semibold text-travel-ink transition hover:bg-white hover:shadow-sm"
                    >
                      <MapPin size={16} />
                      {place.name}
                    </Link>
                    {index < dayPlaces.length - 1 && <ArrowRight size={16} className="text-travel-slate" />}
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
