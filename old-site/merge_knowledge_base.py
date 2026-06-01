"""
Merges all scraped and extracted content into a single knowledge-base.md
"""
import os

BASE = os.path.dirname(__file__)

SOURCES = [
    ("vowsandvedas-output.md", "Vows & Vedas — Live Website (Scraped)"),
    ("source-content.md",      "Vows & Vedas — Source File Extraction (Overlays & Modals)"),
    ("output.md",              "Legacy Content — Old Wedding Site (wearemci.in)"),
]

OUTPUT = os.path.join(BASE, "knowledge-base.md")

def main():
    with open(OUTPUT, "w", encoding="utf-8") as out:
        out.write("# Vows & Vedas — Complete Knowledge Base\n\n")
        out.write("*Combined from live site scrape, source file extraction, and legacy site content.*\n\n")
        out.write("---\n\n")

        for filename, label in SOURCES:
            filepath = os.path.join(BASE, filename)
            if not os.path.exists(filepath):
                print(f"  SKIP (not found): {filename}")
                continue

            with open(filepath, encoding="utf-8") as f:
                content = f.read().strip()

            # Strip the existing H1 from each file to avoid duplicate headings
            lines = content.splitlines()
            if lines and lines[0].startswith("# "):
                lines = lines[1:]
            content = "\n".join(lines).strip()

            out.write(f"# {label}\n\n")
            out.write(content)
            out.write("\n\n---\n\n")

        print(f"Done → {OUTPUT}")

    # Print stats
    with open(OUTPUT, encoding="utf-8") as f:
        lines = f.readlines()
    print(f"Total lines: {len(lines)}")
    print(f"Total size:  {os.path.getsize(OUTPUT) / 1024:.1f} KB")

if __name__ == "__main__":
    main()
