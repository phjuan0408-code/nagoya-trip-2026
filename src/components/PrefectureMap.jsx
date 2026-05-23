import { Line, Marker, ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import japanGeo from "../data/japan-prefectures-lite.json";

export default function PrefectureMap({
  mode = "japan",
  highlightPrefectures = {},
  regions = [],
  places = [],
  routeCoordinates = [],
  routeEndpointLabels = false,
  routeEndpointNames,
  routeEndpointLabelOffsets,
  placeLabelOffsets = {},
  selectedPlaceId,
}) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  const config = mode === "chubu"
    ? { scale: 7800, center: [137.25, 35.95] }
    : { scale: 1800, center: [137.4, 37.1] };

  const mapHeight = mode === "chubu" ? 560 : 680;

  const regionByPrefecture = useMemo(() => {
    const map = new Map();
    regions.forEach((region) => {
      region.prefectures.forEach((prefecture) => map.set(prefecture, region));
    });
    return map;
  }, [regions]);

  function getFill(name) {
    if (highlightPrefectures[name]) return highlightPrefectures[name];
    return regionByPrefecture.get(name)?.color || "#d8d2c8";
  }

  function handleRegionClick(name) {
    const region = regionByPrefecture.get(name);
    if (!region) return;
    if (region.type === "external") {
      window.location.href = region.href;
      return;
    }
    navigate(region.href);
  }

  const routeEndpointKeys = new Set(
    routeCoordinates.length > 1
      ? [
          routeCoordinates[0].join(","),
          routeCoordinates[routeCoordinates.length - 1].join(","),
        ]
      : []
  );

  const mapPlaces = places.filter((place) => !place.hideOnMap);
  const visiblePlaces = routeEndpointLabels
    ? mapPlaces.filter((place) => !routeEndpointKeys.has(place.coordinates.join(",")))
    : mapPlaces;

  return (
    <div className="relative w-full overflow-hidden">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={config}
        width={980}
        height={mapHeight}
        className="h-auto w-full"
      >
        <Geographies geography={japanGeo}>
          {({ geographies }) =>
            geographies
              .filter((geo) => mode !== "chubu" || Boolean(highlightPrefectures[geo.properties.name]))
              .map((geo) => {
              const name = geo.properties.name;
              const region = regionByPrefecture.get(name);
              const isRegion = Boolean(region);
              const isChubuFocus = Boolean(highlightPrefectures[name]);
              const isActive = isRegion || isChubuFocus;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => setHovered(region?.title || name)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleRegionClick(name)}
                  style={{
                    default: {
                      fill: getFill(name),
                      stroke: "#fff8f0",
                      strokeWidth: mode === "chubu" ? 0.9 : 0.5,
                      outline: "none",
                      opacity: isActive ? 1 : 0.62,
                    },
                    hover: {
                      fill: isActive ? "#f0e68c" : getFill(name),
                      stroke: "#fff8f0",
                      strokeWidth: mode === "chubu" ? 1.1 : 0.65,
                      outline: "none",
                      cursor: isRegion ? "pointer" : "default",
                      opacity: 1,
                    },
                    pressed: {
                      fill: isActive ? "#e76f51" : getFill(name),
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>

        {routeCoordinates.length > 1 && (
          <>
            <Line
              coordinates={routeCoordinates}
              stroke="#504339"
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity={0.22}
            />
            <Line
              coordinates={routeCoordinates}
              stroke="#fff8f0"
              strokeWidth={3.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity={0.95}
            />
            <Line
              coordinates={routeCoordinates}
              stroke="#2f5f8f"
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              strokeDasharray="7 5"
            />
          </>
        )}

        {routeEndpointLabels && routeCoordinates.length > 1 && (
          <>
            <RouteEndpoint
              coordinates={routeCoordinates[0]}
              name={routeEndpointNames?.start}
              labelOffset={routeEndpointLabelOffsets?.start}
              color="#2f5f8f"
            />
            <RouteEndpoint
              coordinates={routeCoordinates[routeCoordinates.length - 1]}
              name={routeEndpointNames?.end}
              labelOffset={routeEndpointLabelOffsets?.end}
              color="#c8553d"
            />
          </>
        )}

        {regions.map((region) => (
          <Marker key={region.id} coordinates={region.coordinates}>
            <g
              role="button"
              tabIndex={0}
              className="cursor-pointer"
              onClick={() => (region.type === "external" ? (window.location.href = region.href) : navigate(region.href))}
            >
              <text
                y={mode === "chubu" ? 0 : 20}
                textAnchor="middle"
                className={mode === "chubu" ? "select-none font-serif text-[19px] font-bold" : "select-none font-serif text-[17px] font-bold"}
                fill="#2f2722"
                paintOrder="stroke"
                stroke="#fff8f0"
                strokeWidth={mode === "chubu" ? 4 : 3}
              >
                {region.title}
              </text>
            </g>
          </Marker>
        ))}

        {visiblePlaces.map((place) => {
          const labelOffset = placeLabelOffsets[place.id] || place.labelOffset;

          return (
          <Marker key={place.id} coordinates={place.coordinates}>
            <g
              role="button"
              tabIndex={0}
              className="cursor-pointer"
              onClick={() => navigate(`/place/${place.id}`)}
            >
              <circle
                r={6}
                fill="#ffffff"
                stroke="#504339"
                strokeWidth={2}
              />
              <text
                x={labelOffset?.[0] || 0}
                y={labelOffset?.[1] ?? -12}
                textAnchor="middle"
                className="select-none font-serif text-[14px] font-bold"
                fill="#111"
                paintOrder="stroke"
                stroke="#fff8f0"
                strokeWidth={3}
              >
                {place.name}
              </text>
            </g>
          </Marker>
          );
        })}
      </ComposableMap>

      {hovered && (
        <div className="pointer-events-none absolute bottom-4 left-4 rounded-md bg-white/90 px-3 py-2 text-sm font-semibold text-travel-ink shadow">
          {hovered}
        </div>
      )}
    </div>
  );
}

function RouteEndpoint({ coordinates, color, name, labelOffset }) {
  const [x = 0, y = -14] = labelOffset || [];

  return (
    <Marker coordinates={coordinates}>
      <g>
        <circle r={9} fill="#ffffff" stroke={color} strokeWidth={3} />
        {name && (
          <text
            x={x}
            y={y}
            textAnchor="middle"
            className="select-none font-serif text-[14px] font-bold"
            fill="#111"
            paintOrder="stroke"
            stroke="#fff8f0"
            strokeWidth={3}
          >
            {name}
          </text>
        )}
      </g>
    </Marker>
  );
}
