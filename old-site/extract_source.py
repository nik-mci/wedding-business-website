"""
Extracts text content from Next.js page.js source files.
Groups all data per hotel/venue so the chatbot can associate
name, location, writeup, pricing, and space descriptions together.
"""
import re
import os

SOURCE_ROOT = os.path.join(os.path.dirname(__file__), "..", "src", "app")
OUTPUT_FILE  = os.path.join(os.path.dirname(__file__), "source-content.md")

PAGES = [
    ("services/page.js",                               "Services"),
    ("about/page.js",                                  "About"),
    ("faq/page.js",                                    "FAQ"),
    ("venues/page.js",                                 "Venues"),
    ("experiences/page.js",                            "Experiences"),
    ("destinations/beach-weddings/page.js",            "Destination: Beach Weddings"),
    ("destinations/hills-weddings/page.js",            "Destination: Hills Weddings"),
    ("destinations/royal-and-heritage/page.js",        "Destination: Royal & Heritage"),
    ("destinations/cities-and-metropolitans/page.js",  "Destination: Cities & Metropolitans"),
    ("destinations/backwaters-and-lakes/page.js",      "Destination: Backwaters & Lakes"),
]

# ── helpers ──────────────────────────────────────────────────────────────────

def unescape(s):
    return re.sub(r'\\(.)', r'\1', s).strip()

def get_str(text, key):
    """Return the first string value for a JS key inside `text`."""
    p = re.compile(
        r'(?<![a-zA-Z0-9_])' + re.escape(key) + r'\s*:\s*'
        r'(?:"((?:[^"\\]|\\.)*)"|\'((?:[^\'\\]|\\.)*?)\'|`((?:[^`\\$]|\\.)*?)`)',
        re.DOTALL
    )
    m = p.search(text)
    if not m:
        return None
    raw = m.group(1) or m.group(2) or m.group(3)
    return unescape(raw) if raw else None

def get_array_of_objects(text, key):
    """
    Return raw content of the first array assigned to `key`.
    e.g.  glance: [ {…}, {…} ]
    Uses bracket counting to handle nested structures.
    """
    pattern = re.compile(
        r'(?<![a-zA-Z0-9_])' + re.escape(key) + r'\s*:\s*\[', re.DOTALL
    )
    m = pattern.search(text)
    if not m:
        return ""
    start = m.end()          # position just after the opening [
    depth = 1
    i = start
    while i < len(text) and depth:
        if text[i] == '[':
            depth += 1
        elif text[i] == ']':
            depth -= 1
        i += 1
    return text[start:i - 1]

def extract_objects_from_array(array_text):
    """Split an array body into individual { … } object strings."""
    objects = []
    depth = 0
    start = None
    for i, ch in enumerate(array_text):
        if ch == '{':
            if depth == 0:
                start = i
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0 and start is not None:
                objects.append(array_text[start:i + 1])
                start = None
    return objects

def parse_glance(array_text):
    """Return list of 'Label: Value' strings from a glance/similar array."""
    items = []
    for obj in extract_objects_from_array(array_text):
        label = get_str(obj, "label")
        value = get_str(obj, "value")
        if label and value:
            items.append(f"{label}: {value}")
    return items

def parse_slides(array_text):
    """Return list of 'Label — desc' strings from a slides array (no images)."""
    items = []
    for obj in extract_objects_from_array(array_text):
        label = get_str(obj, "label")
        desc  = get_str(obj, "desc")
        if label and desc:
            items.append(f"{label} — {desc}")
    return items

def parse_titled_pairs(array_text, key1="title", key2="desc"):
    """Generic parser for { title/key1: '...', desc/key2: '...' } arrays."""
    items = []
    for obj in extract_objects_from_array(array_text):
        k1 = get_str(obj, key1)
        k2 = get_str(obj, key2)
        if k1 and k2:
            items.append(f"{k1}: {k2}")
        elif k1:
            items.append(k1)
    return items

def extract_named_nested(source):
    """
    Extract structured nested arrays that flat extraction misses:
    - days: [ { title, desc } ]          → Experiences itinerary steps
    - venues: [ { name, type, desc } ]   → Venue directory entries
    - addons inline array (name+description+tagline)
    Returns list of (section_title, formatted_block) tuples.
    """
    results = []

    # ── days arrays (Experiences page) ───────────────────────────────────────
    days_pattern = re.compile(r'days\s*:\s*\[', re.DOTALL)
    for m in days_pattern.finditer(source):
        arr_text = get_array_of_objects(source[m.start():], "days")
        items = parse_titled_pairs(arr_text, "title", "desc")
        if items:
            results.append(("Itinerary Steps", "\n".join(f"- {i}" for i in items)))

    # ── venues nested arrays (Venues page) ───────────────────────────────────
    venues_pattern = re.compile(r'venues\s*:\s*\[', re.DOTALL)
    for m in venues_pattern.finditer(source):
        arr_text = get_array_of_objects(source[m.start():], "venues")
        items = []
        for obj in extract_objects_from_array(arr_text):
            name = get_str(obj, "name")
            vtype = get_str(obj, "type")
            desc = get_str(obj, "desc")
            if name:
                parts = [name]
                if vtype:
                    parts.append(f"({vtype})")
                if desc:
                    parts.append(f"— {desc}")
                items.append(" ".join(parts))
        if items:
            results.append(("Venue", "\n".join(f"- {i}" for i in items)))

    return results

JUNK = re.compile(
    r'^(true|false|null|undefined|#[0-9a-f]{3,6}|.*\.(jpg|jpeg|png|svg|webp|avif)|/[a-z0-9])$',
    re.IGNORECASE
)

def clean_str(s):
    """Return s if it's meaningful text, else None."""
    if not s or len(s) < 3 or JUNK.match(s):
        return None
    return s

# ── top-level hotel / venue array extraction ─────────────────────────────────

HOTEL_ID_PATTERN = re.compile(r'id\s*:\s*"([A-Z]*\d+)"')

def split_into_hotel_blocks(source):
    """
    Find positions of id:"01", id:"02" … and split source into per-hotel slices.
    Returns list of (id, block_text) tuples.
    """
    matches = list(HOTEL_ID_PATTERN.finditer(source))
    if not matches:
        return []
    blocks = []
    for i, m in enumerate(matches):
        end = matches[i + 1].start() if i + 1 < len(matches) else len(source)
        blocks.append((m.group(1), source[m.start():end]))
    return blocks

def extract_hotel_block(block_text):
    """Extract all overlay-relevant fields from one hotel's source block."""
    fields = {}

    for key in ("name", "location", "desc1", "writeup"):
        val = clean_str(get_str(block_text, key))
        if val:
            fields[key] = val

    # stats: { rooms: "X", guests: "Y" }
    stats_text = get_array_of_objects(
        re.sub(r'stats\s*:\s*\{', 'stats_OPEN {', block_text), 'stats_OPEN'
    )
    # simpler: just regex the stats object inline
    stats_m = re.search(r'stats\s*:\s*\{([^}]+)\}', block_text)
    if stats_m:
        for kv in re.finditer(r'(\w+)\s*:\s*"((?:[^"\\]|\\.)*)"', stats_m.group(1)):
            fields[f"stat_{kv.group(1)}"] = unescape(kv.group(2))

    # glance array
    glance_text = get_array_of_objects(block_text, "glance") if "glance" in block_text else ""
    glance_items = parse_glance(glance_text)
    if glance_items:
        fields["glance"] = " | ".join(glance_items)

    # slides array
    slides_text = get_array_of_objects(block_text, "slides") if "slides" in block_text else ""
    slide_items = parse_slides(slides_text)
    if slide_items:
        fields["spaces"] = " | ".join(slide_items)

    return fields


# ── simple key→value extraction for non-hotel pages ──────────────────────────

FLAT_KEYS = [
    "name", "title", "heading", "tagline", "subtitle",
    "description", "writeup", "desc", "desc1", "content", "answer", "text",
    "location", "region", "city", "type",
    "includes", "highlights", "features",
    "question", "q", "a",
    # About page
    "role", "vibe", "bio", "mobileDesc",
    # Experiences page
    "duration",
]

def extract_flat(source):
    """For pages that don't have hotel arrays — extract simple key:value pairs."""
    results = []
    seen = set()

    for key in FLAT_KEYS:
        p = re.compile(
            r'(?<![a-zA-Z0-9_])' + re.escape(key) + r'\s*:\s*'
            r'(?:"((?:[^"\\]|\\.)*)"|\'((?:[^\'\\]|\\.)*?)\'|`((?:[^`\\$]|\\.)*?)`'
            r'|\[((?:[^\]]*?))\])',
            re.DOTALL
        )
        for m in p.finditer(source):
            dq, sq, tl, arr = m.group(1), m.group(2), m.group(3), m.group(4)
            if arr is not None:
                items = [unescape(s) for s in re.findall(r'"((?:[^"\\]|\\.)*)"', arr)]
                items = [i for i in items if clean_str(i)]
                if items:
                    val = " | ".join(items)
                    entry = (key, val)
                    if entry not in seen:
                        seen.add(entry)
                        results.append(entry)
            else:
                raw = dq if dq is not None else (sq if sq is not None else tl)
                if raw is None:
                    continue
                val = clean_str(unescape(raw))
                if val:
                    entry = (key, val)
                    if entry not in seen:
                        seen.add(entry)
                        results.append(entry)

    return results


# ── page processing ───────────────────────────────────────────────────────────

DESTINATION_PAGES = {
    "destinations/beach-weddings/page.js",
    "destinations/hills-weddings/page.js",
    "destinations/royal-and-heritage/page.js",
    "destinations/cities-and-metropolitans/page.js",
    "destinations/backwaters-and-lakes/page.js",
}

def process_destination_page(source, label, out):
    blocks = split_into_hotel_blocks(source)
    if not blocks:
        out.write("*No hotel blocks found.*\n\n")
        return 0

    count = 0
    for hotel_id, block_text in blocks:
        fields = extract_hotel_block(block_text)
        if not fields:
            continue

        hotel_name = fields.get("name", f"Hotel {hotel_id}")
        out.write(f"### {hotel_name}\n\n")

        if "location" in fields:
            out.write(f"**Location:** {fields['location']}\n\n")

        if "writeup" in fields:
            out.write(f"**About:** {fields['writeup']}\n\n")
        elif "desc1" in fields:
            out.write(f"**About:** {fields['desc1']}\n\n")

        if "glance" in fields:
            out.write(f"**Venue at a Glance:** {fields['glance']}\n\n")

        if "spaces" in fields:
            out.write(f"**Spaces & Highlights:** {fields['spaces']}\n\n")

        out.write("---\n\n")
        count += 1

    return count


def process_flat_page(source, label, out):
    entries = extract_flat(source)
    seen = set()
    written = 0
    for key, val in entries:
        entry = (key, val)
        if entry not in seen:
            seen.add(entry)
            out.write(f"**{key}:** {val}\n\n")
            written += 1

    # Nested arrays (days, venues) that flat extraction misses
    for section, block in extract_named_nested(source):
        out.write(f"**{section}:**\n{block}\n\n")
        written += 1

    return written


# ── main ──────────────────────────────────────────────────────────────────────

def main():
    with open(OUTPUT_FILE, "w", encoding="utf-8") as out:
        out.write("# Vows & Vedas — Source Content Extract\n\n")
        out.write("*Extracted from Next.js source files — includes all overlay/modal content grouped per venue.*\n\n")

        total = 0
        for rel_path, label in PAGES:
            filepath = os.path.join(SOURCE_ROOT, rel_path)
            if not os.path.exists(filepath):
                print(f"  SKIP (not found): {rel_path}")
                continue

            with open(filepath, encoding="utf-8") as f:
                source = f.read()

            out.write(f"## {label}\n\n")
            out.write(f"*Source: src/app/{rel_path}*\n\n")

            if rel_path in DESTINATION_PAGES:
                count = process_destination_page(source, label, out)
            else:
                count = process_flat_page(source, label, out)

            print(f"  {label}: {count} entries")
            total += count

        print(f"\nTotal: {total} entries → {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
