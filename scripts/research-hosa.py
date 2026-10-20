"""Download official guideline text for a reproducible event capability review."""
import concurrent.futures, io, json, pathlib, re, urllib.request
from html.parser import HTMLParser
from pypdf import PdfReader

OUT = pathlib.Path("outputs/hosa-research")
OUT.mkdir(parents=True, exist_ok=True)
class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
    def handle_starttag(self, tag, attrs):
        href = dict(attrs).get("href", "")
        if tag == "a" and ".pdf" in href:
            self.links.append(href)
def fetch(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent":"Mozilla/5.0"}), timeout=60).read()
parser = Links()
parser.feed(fetch("https://hosa.org/guidelines/").decode())
urls = list(dict.fromkeys(parser.links))
def extract(url):
    name = url.rsplit("/", 1)[-1]
    try:
        text = "\n".join(p.extract_text() or "" for p in PdfReader(io.BytesIO(fetch(url))).pages)
        (OUT / (name + ".txt")).write_text(text, encoding="utf-8")
        return {"url":url,"file":name+".txt","intro":text[:3200]}
    except Exception as error:
        return {"url":url,"error":str(error)}
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
    results = list(pool.map(extract, urls))
(OUT / "index.json").write_text(json.dumps(results, indent=2), encoding="utf-8")
print(json.dumps([{"url":r["url"],"error":r.get("error")} for r in results]))
