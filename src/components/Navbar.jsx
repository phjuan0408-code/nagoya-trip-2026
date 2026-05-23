import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Japan Map", to: "/" },
  { label: "Chubu", to: "/chubu" },
  { label: "Itinerary", to: "/itinerary" },
  { label: "Food", to: "/food" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const showTripNav = pathname !== "/";
  const brandLabel = showTripNav ? "GoChubu" : "Japan Trips";
  const brandLink = showTripNav ? "/chubu" : "/";

  return (
    <nav className="sticky left-0 top-0 z-50 w-full border-b border-black/5 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to={brandLink} className="font-serif text-xl font-bold tracking-normal text-neutral-950 transition hover:text-travel-green">
          {brandLabel}
        </Link>

        {showTripNav && (
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-serif text-base font-semibold transition hover:text-travel-green ${
                    isActive ? "text-travel-green" : "text-travel-slate"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}

        {showTripNav && (
          <button
            type="button"
            aria-label="Toggle navigation"
            className="grid h-10 w-10 place-items-center rounded-md text-travel-ink transition hover:bg-travel-mist md:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {showTripNav && open && (
        <div className="border-t border-black/5 bg-white px-4 pb-4 md:hidden">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block rounded-md px-2 py-2 font-serif text-base font-semibold ${
                  isActive ? "text-travel-green" : "text-travel-slate"
                }`
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
