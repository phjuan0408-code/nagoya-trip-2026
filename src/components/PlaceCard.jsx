import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function PlaceCard({ place }) {
  return (
    <Link
      to={`/place/${place.id}`}
      className="group overflow-hidden rounded-lg bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="aspect-[4/3] overflow-hidden bg-travel-mist">
        <img
          src={place.cover}
          alt={place.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-travel-green">
          <MapPin size={16} />
          <span>{place.prefecture}</span>
        </div>
        <h3 className="mt-2 font-serif text-lg font-bold text-travel-ink">{place.name}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-600">{place.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {place.days.map((day) => (
            <span key={day} className="rounded bg-travel-mist px-2 py-1 text-xs font-semibold text-travel-slate">
              {day}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
