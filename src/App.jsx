import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Home from "./pages/Home.jsx";
import Chubu from "./pages/Chubu.jsx";
import Place from "./pages/Place.jsx";
import Food from "./pages/Food.jsx";
import Itinerary from "./pages/Itinerary.jsx";
import Day from "./pages/Day.jsx";

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/chubu" element={<Chubu />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/day/:daySlug" element={<Day />} />
          <Route path="/place/:placeId" element={<Place />} />
          <Route path="/food" element={<Food />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
