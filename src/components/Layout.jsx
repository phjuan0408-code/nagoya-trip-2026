import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import SiteFooter from "./SiteFooter.jsx";

export default function Layout() {
  return (
    <div className="min-h-screen bg-travel-paper text-travel-ink">
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
