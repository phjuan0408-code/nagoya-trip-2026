import { Link } from "react-router-dom";

export default function DayCard({ image, day, title, link }) {
  return (
    <Link
      to={link}
      className="group relative overflow-hidden rounded-lg shadow-md transition hover:shadow-xl"
    >
      <img
        src={image}
        alt={title || day}
        loading="lazy"
        className="h-64 w-full object-cover brightness-[0.9] transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
        <span className="rounded bg-[#504339cc] px-4 py-2 font-serif text-base text-white shadow">
          {day}
          {title && <span className="mt-1 block text-xs font-normal">{title}</span>}
        </span>
      </div>
    </Link>
  );
}
