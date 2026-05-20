import sharp from "sharp";
import { readdir, readFile, stat, writeFile, unlink } from "node:fs/promises";
import { join, extname, basename, dirname } from "node:path";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const ROOT = "public/assets";       // covers photos/, services/, everything
const SRC_DIR = "src";
const MAX_WIDTH = 2000;
const JPEG_QUALITY = 80;
const WEBP_QUALITY = 80;
const SKIP_BELOW_BYTES = 150 * 1024; // skip already-small files (<150 KB)
const DRY_RUN = process.argv.includes("--dry-run");

if (DRY_RUN) console.log("--- DRY RUN — no files will be changed ---\n");

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

const fmt = (b) =>
  b >= 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.round(b / 1024)} KB`;

// Update all references to oldRef → newRef inside src/
function updateSrcRefs(oldRef, newRef) {
  try {
    const out = execSync(`grep -rl "${oldRef}" "${SRC_DIR}" 2>/dev/null || true`, {
      encoding: "utf8",
    }).trim();
    if (!out) return;
    for (const file of out.split("\n").filter(Boolean)) {
      const content = readFileSync(file, "utf8");
      const updated = content.split(oldRef).join(newRef);
      if (updated !== content && !DRY_RUN) {
        writeFileSync(file, updated, "utf8");
        console.log(`   ↳ updated ref in ${file}`);
      }
    }
  } catch {
    // non-fatal
  }
}

let totalBefore = 0;
let totalAfter = 0;
let processed = 0;
let skipped = 0;
let converted = 0; // PNG → JPEG conversions

for await (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) continue;

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

  // PNGs without alpha → convert to JPEG (photo PNGs are huge, JPEG ~80% quality is fine)
  if (ext === ".png") {
    const hasAlpha = meta.channels === 4 || meta.hasAlpha;

    if (!hasAlpha) {
      // Convert opaque PNG → JPEG
      const jpgPath = file.replace(/\.png$/i, ".jpg");
      const buf = await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();

      const label = `PNG→JPG  ${file.padEnd(65)} ${fmt(sizeBefore).padStart(8)} → ${fmt(buf.length).padStart(8)}`;
      console.log(label);

      if (!DRY_RUN) {
        await writeFile(jpgPath, buf);
        await unlink(file);

        // Fix /assets/... src references in src/
        const oldRef = "/" + file.replace(/\\/g, "/");
        const newRef = oldRef.replace(/\.png$/i, ".jpg");
        updateSrcRefs(oldRef.replace(/^\/public/, ""), newRef.replace(/^\/public/, ""));
      }

      totalBefore += sizeBefore;
      totalAfter += buf.length;
      processed++;
      converted++;
      continue;
    }

    // PNG with alpha → compress as PNG
    pipeline = pipeline.png({ compressionLevel: 9 });
  } else if (ext === ".webp") {
    pipeline = pipeline.webp({ quality: WEBP_QUALITY });
  } else {
    // .jpg / .jpeg
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  }

  const buf = await pipeline.toBuffer();

  if (buf.length >= sizeBefore) {
    skipped++;
    continue;
  }

  if (!DRY_RUN) await writeFile(file, buf);

  totalBefore += sizeBefore;
  totalAfter += buf.length;
  processed++;
  console.log(
    `${ext.slice(1).toUpperCase().padEnd(8)} ${file.padEnd(65)} ${fmt(sizeBefore).padStart(8)} → ${fmt(buf.length).padStart(8)}`
  );
}

const saved = totalBefore - totalAfter;
const pct = totalBefore ? ((saved / totalBefore) * 100).toFixed(0) : 0;

console.log("\n" + "─".repeat(80));
console.log(`Processed : ${processed}  |  Skipped (already small/optimal): ${skipped}`);
if (converted) console.log(`Converted : ${converted} opaque PNG → JPEG`);
console.log(`Before    : ${fmt(totalBefore)}`);
console.log(`After     : ${fmt(totalAfter)}`);
console.log(`Saved     : ${fmt(saved)} (${pct}% reduction)`);
console.log("─".repeat(80));

if (DRY_RUN) {
  console.log("\nDry run complete. Run without --dry-run to apply changes.");
} else {
  console.log("\nDone. Commit the compressed images before pushing.");
}
