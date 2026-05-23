import fs from "node:fs";

const sourcePath = "/tmp/japan-prefectures.geojson";
const outputPath = "src/data/japan-prefectures-lite.json";
const tolerance = 0.006;
const precision = 10000;
const minimumRingArea = 0.00012;

const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

function perpendicularDistance(point, start, end) {
  const [x, y] = point;
  const [x1, y1] = start;
  const [x2, y2] = end;
  const dx = x2 - x1;
  const dy = y2 - y1;

  if (dx === 0 && dy === 0) {
    return Math.hypot(x - x1, y - y1);
  }

  const t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy)));
  const projection = [x1 + t * dx, y1 + t * dy];
  return Math.hypot(x - projection[0], y - projection[1]);
}

function simplifyLine(points, epsilon) {
  if (points.length <= 3) return points;

  let maxDistance = 0;
  let index = 0;
  const end = points.length - 1;

  for (let i = 1; i < end; i += 1) {
    const distance = perpendicularDistance(points[i], points[0], points[end]);
    if (distance > maxDistance) {
      index = i;
      maxDistance = distance;
    }
  }

  if (maxDistance <= epsilon) {
    return [points[0], points[end]];
  }

  const left = simplifyLine(points.slice(0, index + 1), epsilon);
  const right = simplifyLine(points.slice(index), epsilon);
  return left.slice(0, -1).concat(right);
}

function closeRing(ring) {
  if (ring.length < 4) return ring;
  const first = ring[0];
  const last = ring[ring.length - 1];
  if (first[0] === last[0] && first[1] === last[1]) return ring;
  return [...ring, first];
}

function samePoint(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}

function ringArea(ring) {
  let total = 0;
  for (let i = 0; i < ring.length - 1; i += 1) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[i + 1];
    total += x1 * y2 - x2 * y1;
  }
  return Math.abs(total / 2);
}

function roundCoordinate([lon, lat]) {
  return [
    Math.round(lon * precision) / precision,
    Math.round(lat * precision) / precision,
  ];
}

function removeDuplicateNeighbors(points) {
  return points.filter((point, index) => index === 0 || !samePoint(point, points[index - 1]));
}

function simplifyRing(ring) {
  const openRing = samePoint(ring[0], ring[ring.length - 1]) ? ring.slice(0, -1) : ring;
  const simplified = removeDuplicateNeighbors(simplifyLine(openRing, tolerance).map(roundCoordinate));
  const closed = closeRing(simplified.length >= 3 ? simplified : openRing.map(roundCoordinate));
  return closed.length >= 4 && ringArea(closed) >= minimumRingArea ? [...closed].reverse() : null;
}

function simplifyGeometry(geometry) {
  if (geometry.type === "Polygon") {
    const coordinates = geometry.coordinates.map(simplifyRing).filter(Boolean);
    return {
      ...geometry,
      coordinates,
    };
  }

  if (geometry.type === "MultiPolygon") {
    const coordinates = geometry.coordinates
      .map((polygon) => polygon.map(simplifyRing).filter(Boolean))
      .filter((polygon) => polygon.length > 0);

    return {
      ...geometry,
      coordinates,
    };
  }

  return geometry;
}

const lite = {
  type: "FeatureCollection",
  features: source.features.map((feature) => ({
    type: "Feature",
    properties: {
      name: feature.properties.P,
    },
    geometry: simplifyGeometry(feature.geometry),
  })),
};

fs.writeFileSync(outputPath, `${JSON.stringify(lite)}\n`);
const before = fs.statSync(sourcePath).size;
const after = fs.statSync(outputPath).size;
console.log(`Wrote ${outputPath}: ${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024).toFixed(1)}KB`);
