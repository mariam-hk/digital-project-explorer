import json
import math

with open('iraq_topo.json', 'r', encoding='utf-8') as f:
    topo = json.load(f)

scale = topo['transform']['scale']
translate = topo['transform']['translate']
arcs = topo['arcs']

def decode_arc(arc_idx):
    if arc_idx < 0:
        raw = arcs[~arc_idx]
        forward = []
        x, y = 0, 0
        for pt in raw:
            x += pt[0]
            y += pt[1]
            forward.append([x * scale[0] + translate[0], y * scale[1] + translate[1]])
        return forward[::-1]
    else:
        raw = arcs[arc_idx]
        forward = []
        x, y = 0, 0
        for pt in raw:
            x += pt[0]
            y += pt[1]
            forward.append([x * scale[0] + translate[0], y * scale[1] + translate[1]])
        return forward

for g in topo['objects']['iraq']['geometries']:
    name = g['properties']['name']
    all_pts = []
    for ring in g['arcs']:
        for a_idx in ring:
            all_pts.extend(decode_arc(a_idx))
    xs = [p[0] for p in all_pts]
    ys = [p[1] for p in all_pts]
    w = max(xs) - min(xs)
    h = max(ys) - min(ys)
    name_clean = name.encode('ascii', 'replace').decode('ascii')
    print(f"{name_clean:15}: lon [{min(xs):.2f}, {max(xs):.2f}] (w={w:.2f}), lat [{min(ys):.2f}, {max(ys):.2f}] (h={h:.2f})")
