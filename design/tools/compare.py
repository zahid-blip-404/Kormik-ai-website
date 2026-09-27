# Pixel comparison: design export (localhost:5510) vs built site (localhost:4321), full-page, headless Chrome.
#   python design/tools/compare.py [width ...]
import os, subprocess, sys
from PIL import Image, ImageChops

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'compare')
os.makedirs(OUT, exist_ok=True)
PAGES = [('Home', '/', 'home'), ('Why it matters', '/why-it-matters', 'why'), ('For clients', '/for-clients', 'clients'),
         ('Approach', '/approach', 'approach'), ('About', '/about', 'about'), ('Join', '/join', 'join')]
HEIGHT = {1440: 6400, 390: 10400}


def shot(url, w, h, path):
    if w < 500:  # headless Chrome windows can't be narrower than ~500px: render inside a w-wide iframe, then crop
        import urllib.parse
        url = f'http://localhost:5510/_harness.html?w={w}&h={h}&src=' + urllib.parse.quote(url, safe='')
        subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
                        f'--window-size=600,{h}', '--virtual-time-budget=9000', f'--screenshot={path}', url], check=True, capture_output=True, timeout=120)
        Image.open(path).crop((0, 0, w, h)).save(path)
        return
    subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
                    f'--window-size={w},{h}', '--virtual-time-budget=9000', '--run-all-compositor-stages-before-draw',
                    f'--screenshot={path}', url], check=True, capture_output=True, timeout=120)


def content_height(img):
    # trim the empty canvas below the page (headless paints white/transparent past the document)
    px = img.convert('RGB').load(); w, h = img.size
    for y in range(h - 1, 0, -1):
        if any(px[x, y] != (255, 255, 255) for x in range(0, w, 7)):
            return y + 1
    return h


widths = [int(a) for a in sys.argv[1:]] or [1440, 390]
for w in widths:
    for name, path, key in PAGES:
        a = os.path.join(OUT, f'{key}-{w}-design.png'); b = os.path.join(OUT, f'{key}-{w}-site.png')
        shot('http://localhost:5510/' + name.replace(' ', '%20') + '.dc.html', w, HEIGHT[w], a)
        shot('http://localhost:4321' + path, w, HEIGHT[w], b)
        A = Image.open(a).convert('RGB'); B = Image.open(b).convert('RGB')
        ha, hb = content_height(A), content_height(B)
        h = min(ha, hb)
        diff = ImageChops.difference(A.crop((0, 0, w, h)), B.crop((0, 0, w, h)))
        mask = diff.convert('L').point(lambda v: 255 if v > 40 else 0)
        bad = sum(1 for v in mask.getdata() if v)
        rows = [y for y in range(0, h, 4) if any(mask.getpixel((x, y)) for x in range(0, w, 3))]
        first = rows[0] if rows else None
        mask.save(os.path.join(OUT, f'{key}-{w}-diff.png'))
        print(f'{w} {key:9s} design_h={ha} site_h={hb} diff_px={bad} ({bad / (w * h) * 100:.2f}%) first_diff_y={first}')
