# Download every photo the design uses and store it locally as WebP. Writes design/tools/image-map.json.
import json, re, glob, os, io, html, urllib.request, hashlib
from PIL import Image
ROOT = r"D:/Claude Resources/Website/kormik-website"
EXP = ROOT + "/design/claude-design-export/"
OUT = ROOT + "/public/images/"
refs = set()
for f in glob.glob(ROOT + "/design/snapshots/*.en.1440.json"):
    d = json.load(open(f, encoding="utf-8")); h = d["html"]
    refs |= set(re.findall(r'src="([^"]+)"', h)) | set(re.findall(r'url\((?:&quot;|["\'])?([^)"\'&]+)', h))
s = open(EXP + "Join.dc.html", encoding="utf-8").read()
refs |= set(re.findall(r'src="(https[^"{]+)"', s)) | {"assets/fingerprint.png"}
m = {}
def name_for(u):
    if u.startswith("http"):
        pid = re.search(r"photo[s]?[-/](\d+|[0-9a-f-]{10,})", u)
        tag = "pexels" if "pexels" in u else "unsplash"
        w = re.search(r"[?&]w=(\d+)", u); hh = re.search(r"[?&]h=(\d+)", u)
        base = f"{tag}-{pid.group(1) if pid else hashlib.md5(u.encode()).hexdigest()[:8]}-w{w.group(1) if w else 'x'}" + (f"h{hh.group(1)}" if hh else "")
        return base + ".webp"
    return os.path.splitext(os.path.basename(u))[0] + ".webp"
for raw in sorted(refs):
    u = html.unescape(raw)
    if not (u.startswith("http") or u.startswith("assets/")) or u.endswith(".js"):
        continue
    if "/logos/" in u:
        continue
    out = name_for(u)
    if u.startswith("http"):
        req = urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0"})
        data = urllib.request.urlopen(req, timeout=60).read()
    else:
        data = open(EXP + u, "rb").read()
    im = Image.open(io.BytesIO(data))
    keep_alpha = im.mode in ("RGBA", "LA", "P")
    im = im.convert("RGBA" if keep_alpha else "RGB")
    im.save(OUT + out, "WEBP", quality=82, method=6)
    m[raw] = "/images/" + out
    m[u] = "/images/" + out
    print(f"{im.size} {len(data)//1024}KB -> {os.path.getsize(OUT+out)//1024}KB  {out}")
json.dump(m, open(ROOT + "/design/tools/image-map.json", "w"), indent=1)
