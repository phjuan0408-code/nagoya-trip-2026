import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const imagesDir = path.join(root, "public", "images");
const textDirs = ["src"];
const imageExtensions = new Set([".jpg", ".jpeg", ".png"]);
const textExtensions = new Set([".js", ".jsx", ".ts", ".tsx", ".css", ".html", ".md"]);

async function listFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      return entry.isDirectory() ? listFiles(fullPath) : fullPath;
    })
  );
  return files.flat();
}

function toPublicPath(filePath) {
  return `/${path.relative(path.join(root, "public"), filePath).split(path.sep).join("/")}`;
}

const imageFiles = (await listFiles(imagesDir)).filter((file) =>
  imageExtensions.has(path.extname(file).toLowerCase())
);
const beforeBytes = (
  await Promise.all(imageFiles.map(async (file) => (await fs.stat(file)).size))
).reduce((sum, size) => sum + size, 0);

const conversions = [];

for (const source of imageFiles) {
  const parsed = path.parse(source);
  const target = path.join(parsed.dir, `${parsed.name}.webp`);

  await sharp(source)
    .rotate()
    .webp({ quality: 82, effort: 5 })
    .toFile(target);

  conversions.push({
    source,
    target,
    from: toPublicPath(source),
    to: toPublicPath(target),
  });
}

const textFiles = [];
for (const dir of textDirs) {
  textFiles.push(
    ...(await listFiles(path.join(root, dir))).filter((file) =>
      textExtensions.has(path.extname(file).toLowerCase())
    )
  );
}

for (const file of textFiles) {
  let content = await fs.readFile(file, "utf8");
  let changed = false;

  for (const { from, to } of conversions) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changed = true;
    }
  }

  if (changed) {
    await fs.writeFile(file, content);
  }
}

for (const { source } of conversions) {
  await fs.unlink(source);
}

const afterBytes = (
  await Promise.all(conversions.map(async ({ target }) => (await fs.stat(target)).size))
).reduce((sum, size) => sum + size, 0);

console.log(`Converted ${conversions.length} images to WebP.`);
console.log(`Image bytes: ${beforeBytes} -> ${afterBytes}`);
