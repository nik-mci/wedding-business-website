import sharp from "sharp";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";

const ROOT = "public/assets/photos";
const MAX_WIDTH = 2000;
const JPEG_QUALITY = 80;
const PNG_QUALITY = 80;
const SKIP_BELOW_BYTES = 200 * 1024;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

const formatBytes = (b) =>
  b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)}MB` : `${(b / 1024).toFixed(0)}KB`;

let totalBefore = 0;
let totalAfter = 0;
let processed = 0;
let skipped = 0;

for await (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

  const sizeBefore = (await stat(file)).size;

  if (sizeBefore < SKIP_BELOW_BYTES) {
    skipped++;
    continue;
  }

  const sourceBuf = await readFile(file);
  const image = sharp(sourceBuf);
  const meta = await image.metadata();
  const needsResize = meta.width && meta.width > MAX_WIDTH;

  let pipeline = image.rotate();
  if (needsResize) pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });

  if (ext === ".png") {
    pipeline = pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 });
  } else {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  }

  const buf = await pipeline.toBuffer();

  if (buf.length >= sizeBefore) {
    skipped++;
    continue;
  }

  await writeFile(file, buf);

  totalBefore += sizeBefore;
  totalAfter += buf.length;
  processed++;
  console.log(
    `${file.padEnd(70)} ${formatBytes(sizeBefore).padStart(8)} -> ${formatBytes(buf.length).padStart(8)}`
  );
}

console.log("---");
console.log(`Processed: ${processed} | Skipped: ${skipped}`);
console.log(
  `Total: ${formatBytes(totalBefore)} -> ${formatBytes(totalAfter)} ` +
    `(saved ${formatBytes(totalBefore - totalAfter)}, ${((1 - totalAfter / totalBefore) * 100).toFixed(0)}% reduction)`
);
