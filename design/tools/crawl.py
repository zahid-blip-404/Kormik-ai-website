# Static QA of the built site: every internal link, #anchor, image and CSS url must resolve.
import os, re, glob
from bs4 import BeautifulSoup

ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), '.vercel', 'output', 'static')
pages = {}
for f in glob.glob(os.path.join(ROOT, '**', '*.html'), recursive=True):
    rel = os.path.relpath(f, ROOT).replace(os.sep, '/')
    url = '/' + rel
    url = url[: -len('index.html')] if url.endswith('index.html') else url[:-5]
    url = url.rstrip('/') or '/'
    pages[url] = BeautifulSoup(open(f, encoding='utf-8').read(), 'html.parser')
print('pages:', sorted(pages))

problems, checked = [], 0
for url, s in pages.items():
    for a in s.find_all('a', href=True):
        h = a['href']; checked += 1
        if h.startswith(('http', 'mailto:', 'tel:')):
            continue
        path, _, frag = h.partition('#')
        target = (path.rstrip('/') or '/') if path else url
        if target not in pages:
            problems.append((url, h, 'missing page')); continue
        if frag and not pages[target].find(id=frag):
            problems.append((url, h, 'missing anchor'))
    for img in s.find_all('img'):
        src = img.get('src', '')
        if src.startswith('/') and not os.path.exists(ROOT + src):
            problems.append((url, src, 'missing image'))
        if not img.has_attr('alt'):
            problems.append((url, src, 'img without alt'))
    for m in re.findall(r'url\(([^)]+)\)', str(s)):
        m = m.strip('\'"')
        if m.startswith('/') and not os.path.exists(ROOT + m):
            problems.append((url, m, 'missing css url'))
    for b in s.find_all('button'):
        if not b.get_text(strip=True) and not b.get('aria-label'):
            problems.append((url, str(b)[:80], 'button without label'))
    if url.startswith('/bn'):
        # English words left on Bangla pages (ignoring brand, units and the email placeholder)
        text = ' '.join(t for t in s.find('main').find_all(string=True) if t.parent.name not in ('style', 'script'))
        words = set(re.findall(r'\b[A-Za-z]{4,}\b', text)) - {'kormik', 'Kormik', 'contact', 'email', 'confirm', 'KORMIK', 'DHAKA'}
        if words:
            problems.append((url, sorted(words)[:15], 'english on bn page'))

print('links checked', checked, '| problems', len(problems))
for p in problems:
    print(p)
