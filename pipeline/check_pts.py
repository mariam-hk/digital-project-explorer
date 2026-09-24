import re

with open('src/lib/data/iraq-svg-paths.ts', 'r', encoding='utf-8') as f:
    content = f.read()

govs = re.split(r'\{\s*id:', content)[1:]
for g in govs:
    id_m = re.search(r'\"([^\"]+)\"', g)
    if not id_m: continue
    gov_id = id_m.group(1)
    if gov_id in ['baghdad', 'babylon', 'salah_al_deen', 'diyala', 'wasit', 'al_anbar']:
        path_m = re.search(r'path:\s*\"([^\"]+)\"', g)
        if path_m:
            pts = re.findall(r'([0-9\.]+)\s+([0-9\.]+)', path_m.group(1))
            xs = [float(p[0]) for p in pts]
            ys = [float(p[1]) for p in pts]
            print(f'{gov_id}: x [{min(xs):.1f}, {max(xs):.1f}], y [{min(ys):.1f}, {max(ys):.1f}], count={len(pts)}')
