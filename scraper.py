import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urldefrag, urlparse
import re
import time
import random
import logging
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def setup_session():
    """Setup a requests session with retries and realistic headers."""
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
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
    })
    
    return session

def scrape_site(start_url, max_pages=20, max_depth=2):
    visited = set()
    queue = [(start_url, 0)]
    visited.add(start_url)
    
    pages_crawled = 0
    session = setup_session()
    
    logging.info(f"Starting crawl at {start_url} (max pages: {max_pages}, max depth: {max_depth})")
    
    with open('output.md', 'w', encoding='utf-8') as outfile:
        outfile.write("# Website Content\n\n")
        
        while queue and pages_crawled < max_pages:
            url, depth = queue.pop(0)
            
            logging.info(f"[{pages_crawled+1}/{max_pages}] Crawling (Depth {depth}): {url}")
            
            try:
                # 1-2 second polite delay
                time.sleep(random.uniform(1.0, 2.0))
                
                response = session.get(url, timeout=30)
                if response.status_code != 200:
                    logging.warning(f" Skipping {url}: HTTP {response.status_code}")
                    continue
            except requests.RequestException as e:
                logging.error(f" Failed to fetch {url}: {e}")
                continue
                
            # Content must be HTML
            if 'text/html' not in response.headers.get('Content-Type', ''):
                continue
                
            pages_crawled += 1
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Find internal links within scope
            if depth < max_depth:
                for a_tag in soup.find_all('a', href=True):
                    href = a_tag['href']
                    full_url = urljoin(url, href)
                    full_url, _ = urldefrag(full_url) # Removes fragments
                    
                    parsed = urlparse(full_url)
                    # Stay within domain and only in /wedding path
                    if parsed.netloc == 'www.wearemci.in' and '/wedding' in parsed.path:
                        if full_url not in visited:
                            visited.add(full_url)
                            queue.append((full_url, depth + 1))
                            
            # Extract Page Title
            title_tag = soup.find('title')
            page_title = title_tag.get_text(strip=True) if title_tag else "No Title"
            
            # Write page header
            outfile.write(f"## Page: {url}\n")
            outfile.write(f"**Title:** {page_title}\n\n")
            
            # De-clutter and remove noise 
            for noise in soup.find_all(['nav', 'footer', 'script', 'style', 'header', 'noscript', 'meta', 'link']):
                noise.decompose()
                
            # Remove structural noise using class matching
            noise_classes = re.compile(r'(nav|foot|menu|sidebar|widget)', re.IGNORECASE)
            for div in soup.find_all(class_=noise_classes):
                try:
                    div.decompose()
                except Exception:
                    pass 
                
            # Extract headings and paragraphs
            elements = soup.find_all(['h1', 'h2', 'h3', 'p'])
            
            current_heading = "Main Content"
            current_words = []
            chunk_id = 1
            
            def flush_chunk():
                nonlocal chunk_id, current_words
                if not current_words: return
                chunk_text = " ".join(current_words)
                
                # Only write substantial chunks
                if len(current_words) > 3:
                    outfile.write(f"### {current_heading}\n")
                    outfile.write(f"- **URL:** {url}\n")
                    outfile.write(f"- **Heading:** {current_heading}\n")
                    outfile.write(f"- **Chunk ID:** {chunk_id}\n\n")
                    outfile.write(f"{chunk_text}\n\n")
                    chunk_id += 1
                    
                current_words = []
                
            for el in elements:
                if el.name in ['h1', 'h2', 'h3']:
                    text = el.get_text(separator=' ', strip=True)
                    if not text: continue
                    flush_chunk() 
                    current_heading = text
                elif el.name == 'p':
                    text = el.get_text(separator=' ', strip=True)
                    if not text: continue
                    words = text.split()
                    
                    current_words.extend(words)
                    
                    while len(current_words) >= 250:
                        pending = current_words[250:]
                        current_words = current_words[:250]
                        flush_chunk()
                        current_words = pending
                        
            # Final flush
            flush_chunk()

    logging.info(f"Crawling complete. {pages_crawled} pages processed.")

if __name__ == "__main__":
    start_url = "https://www.wearemci.in/wedding/"
    scrape_site(start_url, max_pages=20, max_depth=2)
