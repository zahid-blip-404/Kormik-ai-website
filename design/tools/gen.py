# -*- coding: utf-8 -*-
"""Step 2 of the port: turn each rendered Claude Design snapshot into an Astro page
component (src/components/pages/<Name>.astro) with English + Bangla text inline.

    python design/tools/gen.py

Re-run after editing design/tools/strings/*.json. Join is hand-built (see Join.astro)."""
import html as htmllib, json, os, re, sys
from bs4 import BeautifulSoup, Comment

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from extract import clean

TOOLS = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(TOOLS))
SNAP = os.path.join(ROOT, 'design', 'snapshots')
OUT = os.path.join(ROOT, 'src', 'components', 'pages')
os.makedirs(OUT, exist_ok=True)

PAGES = {  # snapshot -> component name, form source key
    'home': 'Home', 'why-it-matters': 'WhyItMatters', 'for-clients': 'ForClients',
    'approach': 'Approach', 'about': 'About',
}
ROUTES = {
    'Home.dc.html': '/', 'Why it matters.dc.html': '/why-it-matters', 'For clients.dc.html': '/for-clients',
    'Approach.dc.html': '/approach', 'About.dc.html': '/about', 'Join.dc.html': '/join',
}
IMG = json.load(open(os.path.join(TOOLS, 'image-map.json'), encoding='utf-8'))
TEXT_ATTRS = ['alt', 'aria-label', 'placeholder', 'title']
# Production fixes on top of the design. The Home hero container and grid carry fixed pixel sizes from the
# design canvas (1316px / 1195px). They are kept exactly at 1316px and wider (so desktop matches the design)
# and released below that, where they would otherwise clip the hero on tablets and phones.
EXTRA_CSS = {
    # The hero collage photos are placed in px for the 520 x 572.55 fist box; restated as percentages so the
    # collage scales with the box on smaller screens (identical at the 520px desktop size).
    'home': '#hero-mark img:nth-of-type(1) { left: 4.4231% !important; top: 2.2705% !important; width: 117.1154% !important; height: 92.9176% !important; } '
            '#hero-mark img:nth-of-type(2) { left: 2.1154% !important; top: 11.5274% !important; width: 24.2308% !important; height: 19.5616% !important; } '
            '#hero-mark img:nth-of-type(3) { left: 30% !important; top: 0 !important; width: 20% !important; height: 31.7876% !important; } '
            '@media (max-width: 1315px) { [data-screen-label="Hero"] > .k-container { width: auto !important; height: auto !important; } [data-screen-label="Hero"] > .k-container > div { width: auto !important; height: auto !important; } }',
}
BN_DIGITS = str.maketrans('0123456789', '০১২৩৪৫৬৭৮৯')


def asset(u):
    u = htmllib.unescape(u)
    if u.startswith('assets/logos/'):
        return '/brand/' + u.split('/')[-1]
    return IMG.get(u) or IMG.get(u.replace('&', '&amp;')) or u


def fix_urls_in_css(css):
    return re.sub(r'url\((["\']?)(assets/[^)"\']+)\1\)', lambda m: f'url({asset(m.group(2))})', css)


def route(h):
    path, _, frag = h.partition('#')
    if path in ROUTES:
        return ROUTES[path] + ('#' + frag if frag else '')
    return None


def js(s):
    return json.dumps(s, ensure_ascii=False)


def build(page, name):
    d = json.load(open(os.path.join(SNAP, page + '.en.1440.json'), encoding='utf-8'))
    strings = json.load(open(os.path.join(TOOLS, 'strings', page + '.json'), encoding='utf-8'))
    missing = [k for k, v in strings.items() if not v]
    if missing:
        raise SystemExit(f'{page}: {len(missing)} strings have no Bangla yet, e.g. {missing[:3]}')

    s = clean(d['html'])
    main = s.find('main')
    exprs = {}

    def token(expr):
        k = f'@@X{len(exprs)}@@'
        exprs[k] = expr
        return k

    # trade icons live in shadow DOM in the snapshot: render them with <TradeIcon>
    for el in main.find_all('k-trade-icon'):
        el.replace_with(token(f'<TradeIcon name={js(el.get("name", "toolbox"))} size={{{int(el.get("size", 24))}}} />'))

    # early-access forms -> shared component
    forms = main.find_all('form', class_='k-form')
    for i, f in enumerate(forms):
        chips = f.find_all(class_='k-chip')
        active = next((j for j, c in enumerate(chips) if 'is-active' in (c.get('class') or [])), 0)
        f.replace_with(token(f'<EarlyAccessForm lang={{lang}} id={js(f"ea-{page}-{i}")} defaultRole={{{active}}} source={js(page)} />'))

    for el in main.find_all(True):
        if el.get('href'):
            r = route(el['href'])
            if r is not None:
                el['href'] = token(f'{{href({js(r)})}}')
        if el.get('src'):
            el['src'] = asset(el['src'])
        if el.get('style') and 'url(' in el['style']:
            el['style'] = fix_urls_in_css(el['style'])
        for a in TEXT_ATTRS:
            v = el.get(a)
            if v and re.search(r'[A-Za-z]', v):
                el[a] = token(f'{{L({js(v)}, {js(strings[v])})}}')

    for t in list(main.find_all(string=True)):
        if isinstance(t, Comment) or t.parent.name in ('style', 'script'):
            continue
        raw = str(t)
        if '@@X' in raw:
            continue
        v = ' '.join(raw.split())
        if not v:
            continue
        lead = raw[:len(raw) - len(raw.lstrip())]
        trail = raw[len(raw.rstrip()):]
        if re.search(r'[A-Za-z]', v):
            expr = f'{{L({js(v)}, {js(strings[v])})}}'
        elif re.search(r'[0-9]', v):
            expr = f'{{L({js(v)}, {js(v.translate(BN_DIGITS))})}}'
        else:
            expr = '{' + js(v) + '}' if ('{' in v or '}' in v) else None
        if expr:
            t.replace_with(lead + token(expr) + trail)

    main['data-page'] = page
    body = str(main)
    # attribute tokens: attr="@@Xn@@" -> attr={...}
    body = re.sub(r'="(@@X\d+@@)"', lambda m: '=' + exprs[m.group(1)].strip(), body)
    # text / element tokens
    body = re.sub(r'@@X\d+@@', lambda m: exprs[m.group(0)], body)
    # leftovers that Astro would read as expressions
    assert '@@X' not in body

    blocks = d['styles'].split('/* ---- */')[3:]
    shared = ['html { scroll-behavior: smooth; }', 'body { margin: 0; background: var(--paper); }',
              'a { color: var(--indigo); text-decoration-color: var(--orange); }', 'a:hover { color: var(--indigo); }',
              '@media (max-width: 768px) { .k-nav__menu, .k-lang__opt, .k-chip { min-height: 44px; } .k-btn--link { min-height: 44px; display: inline-flex; } }']
    css = '\n'.join(fix_urls_in_css(b.strip()) for b in blocks)
    for rule in shared:
        css = css.replace(rule, '')
    css = '\n'.join(l.strip() for l in css.splitlines() if l.strip())
    if page in EXTRA_CSS:
        css += '\n' + EXTRA_CSS[page]

    uses_icon = 'TradeIcon' in body
    uses_form = 'EarlyAccessForm' in body
    out = ['---', f'// Generated from the Claude Design export by design/tools/gen.py ({page}). Edit the strings in',
           f'// design/tools/strings/{page}.json and re-run the generator rather than editing this file by hand.',
           "import { makeL, localize, type Lang } from '../../lib/i18n';"]
    if uses_form:
        out.append("import EarlyAccessForm from '../EarlyAccessForm.astro';")
    if uses_icon:
        out.append("import TradeIcon from '../TradeIcon.astro';")
    out += ['interface Props { lang: Lang }', 'const { lang } = Astro.props;', 'const L = makeL(lang);',
            'const href = (p: string) => localize(p, lang);', '---', body]
    if css:
        out += ['<style is:global>', css, '</style>']
    path = os.path.join(OUT, name + '.astro')
    open(path, 'w', encoding='utf-8', newline='\n').write('\n'.join(out) + '\n')
    print(f'{page}: {len(exprs)} expressions, forms={len(forms)}, css={len(css)} -> {os.path.relpath(path, ROOT)}')


if __name__ == '__main__':
    for p, n in PAGES.items():
        build(p, n)
