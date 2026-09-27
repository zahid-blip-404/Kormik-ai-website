import json,re,glob,os
refs={}
for f in glob.glob('snapshots/*.en.1440.json'):
    d=json.load(open(f,encoding='utf-8')); h=d['html']+d['styles']
    name=os.path.basename(f).split('.')[0]
    for m in re.findall(r'src="([^"]+)"',h)+re.findall(r'url\((?:&quot;|["\'])?([^)"\'&]+)',h):
        refs.setdefault(m,set()).add(name)
s=open('claude-design-export/Join.dc.html',encoding='utf-8').read()
for m in re.findall(r'src="([^"{]+)"',s)+re.findall(r'url\(([^)]+)\)',s):
    refs.setdefault(m,set()).add('join')
for k,v in sorted(refs.items()): print(sorted(v), k)
