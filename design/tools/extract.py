# -*- coding: utf-8 -*-
"""Step 1 of the port: clean the rendered Claude Design snapshots and list every
translatable string per page (design/tools/strings/<page>.json)."""
import json, os, re
from bs4 import BeautifulSoup, NavigableString, Comment

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SNAP = os.path.join(ROOT, 'snapshots')
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'strings')
os.makedirs(OUT, exist_ok=True)

PAGES = ['home', 'why-it-matters', 'for-clients', 'approach', 'about']
TEXT_ATTRS = ['alt', 'aria-label', 'placeholder', 'title']


def clean(html):
    s = BeautifulSoup(html, 'html.parser')
    for c in s.find_all(string=lambda t: isinstance(t, Comment)):
        c.extract()
    for el in s.find_all(True):
        for a in list(el.attrs):
            if a.startswith('data-dc-') or a == 'data-sc-id':
                del el[a]
    # unwrap display:contents hosts
    for el in s.find_all(class_=['sc-host-x', 'sc-host']):
        el.unwrap()
    return s


def strings_of(main):
    seen, out = set(), []
    for t in main.find_all(string=True):
        if isinstance(t, Comment):
            continue
        if t.parent.name in ('style', 'script'):
            continue
        v = ' '.join(t.split())
        if not v or not re.search(r'[A-Za-z]', v):
            continue
        if v not in seen:
            seen.add(v); out.append(v)
    for el in main.find_all(True):
        for a in TEXT_ATTRS:
            v = el.get(a)
            if v and re.search(r'[A-Za-z]', v) and v not in seen:
                seen.add(v); out.append(v)
    return out


if __name__ == '__main__':
    for p in PAGES:
        d = json.load(open(os.path.join(SNAP, p + '.en.1440.json'), encoding='utf-8'))
        s = clean(d['html'])
        main = s.find('main')
        # forms are replaced by the shared component, so skip their strings
        for f in main.find_all('form', class_='k-form'):
            f.decompose()
        strs = strings_of(main)
        path = os.path.join(OUT, p + '.json')
        existing = {}
        if os.path.exists(path):
            existing = json.load(open(path, encoding='utf-8'))
        data = {k: existing.get(k, '') for k in strs}
        json.dump(data, open(path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        print(p, len(strs), 'strings', d['title'])
