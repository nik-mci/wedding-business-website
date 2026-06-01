import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urldefrag, urlparse
import re
import time
import random
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Pages to skip — not useful for chatbot context
SKIP_PATTERNS = re.compile(
    r'/(thank-you|privacy|cookie|404|sitemap|feed|wp-|\.xml|\.pdf)',
    re.IGNORECASE
)

def setup_session():
    from requests.adapters import HTTPAdapter
    from urllib3.util.retry import Retry

    session = requests.Session()
    retries = Retry(
        total=3,
        backoff_factor=1,
        status_forcelist=[429, 500, 502, 503, 504],
        allowed_methods=["GET"]
    )
    adapter = HTTPAdapter(max_retries=retries)
    session.mount("http://", adapter)
    session.mount("https://", adapter)
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
    })
    return session

def scrape_site(start_url, output_file, max_pages=60, max_depth=3, extra_seeds=None):
    visited = set()
    queue = [(start_url, 0)]
    visited.add(start_url)

    for seed in (extra_seeds or []):
        if seed not in visited:
            visited.add(seed)
            queue.append((seed, 1))

    base_domain = urlparse(start_url).netloc
    pages_crawled = 0
    session = setup_session()

    logging.info(f"Starting crawl at {start_url} (max pages: {max_pages}, max depth: {max_depth})")

    with open(output_file, 'w', encoding='utf-8') as outfile:
        outfile.write("# MCI Website Content\n\n")

        while queue and pages_crawled < max_pages:
            url, depth = queue.pop(0)

            if SKIP_PATTERNS.search(url):
                logging.info(f"  Skipping (pattern match): {url}")
                continue

            logging.info(f"[{pages_crawled+1}/{max_pages}] Crawling (Depth {depth}): {url}")

            try:
                time.sleep(random.uniform(1.0, 2.0))
                response = session.get(url, timeout=30)
                if response.status_code != 200:
                    logging.warning(f"  Skipping {url}: HTTP {response.status_code}")
                    continue
            except requests.RequestException as e:
                logging.error(f"  Failed to fetch {url}: {e}")
                continue

            if 'text/html' not in response.headers.get('Content-Type', ''):
                continue

            pages_crawled += 1
            soup = BeautifulSoup(response.text, 'html.parser')

            # Collect internal links before stripping the DOM
            if depth < max_depth:
                for a_tag in soup.find_all('a', href=True):
                    href = a_tag['href']
                    full_url = urljoin(url, href)
                    full_url, _ = urldefrag(full_url)
                    parsed = urlparse(full_url)
                    if parsed.netloc == base_domain and full_url not in visited:
                        visited.add(full_url)
                        queue.append((full_url, depth + 1))

            title_tag = soup.find('title')
            page_title = title_tag.get_text(strip=True) if title_tag else "No Title"

            outfile.write(f"## Page: {url}\n")
            outfile.write(f"**Title:** {page_title}\n\n")

            # Remove noise
            for noise in soup.find_all(['nav', 'footer', 'script', 'style', 'header', 'noscript', 'meta', 'link']):
                noise.decompose()
            noise_classes = re.compile(r'(nav|foot|menu|sidebar|widget|cookie|banner|modal)', re.IGNORECASE)
            for div in soup.find_all(class_=noise_classes):
                try:
                    div.decompose()
                except Exception:
                    pass

            elements = soup.find_all(['h1', 'h2', 'h3', 'h4', 'p', 'li'])

            current_heading = "Main Content"
            current_words = []
            chunk_id = 1

            def flush_chunk():
                nonlocal chunk_id, current_words
                if not current_words:
                    return
                chunk_text = " ".join(current_words)
                if len(current_words) > 5:
                    outfile.write(f"### {current_heading}\n")
                    outfile.write(f"- **URL:** {url}\n")
                    outfile.write(f"- **Heading:** {current_heading}\n")
                    outfile.write(f"- **Chunk ID:** {chunk_id}\n\n")
                    outfile.write(f"{chunk_text}\n\n")
                    chunk_id += 1
                current_words = []

            for el in elements:
                if el.name in ['h1', 'h2', 'h3', 'h4']:
                    text = el.get_text(separator=' ', strip=True)
                    if not text:
                        continue
                    flush_chunk()
                    current_heading = text
                elif el.name in ['p', 'li']:
                    text = el.get_text(separator=' ', strip=True)
                    if not text:
                        continue
                    words = text.split()
                    current_words.extend(words)

                    # Flush at ~200 words to keep chunks focused
                    while len(current_words) >= 200:
                        pending = current_words[200:]
                        current_words = current_words[:200]
                        flush_chunk()
                        current_words = pending

            flush_chunk()

    logging.info(f"Done. {pages_crawled} pages scraped → {output_file}")

if __name__ == "__main__":
    # Seed with pages not reachable via homepage links
    extra_seeds = [
        "https://vowsandvedas.com/experiences",
        "https://vowsandvedas.com/ideas",
        "https://vowsandvedas.com/venues",
        "https://vowsandvedas.com/destinations/backwaters-and-lakes",
    ]
    scrape_site(
        start_url="https://vowsandvedas.com/",
        output_file="vowsandvedas-output.md",
        max_pages=80,
        max_depth=3,
        extra_seeds=extra_seeds,
    )
