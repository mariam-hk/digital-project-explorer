import re

with open('src/lib/data/iraq-svg-paths.ts', 'r', encoding='utf-8') as f:
    content = f.read()

def parse_path(path_str):
    raw = re.findall(r'([0-9\.]+)\s+([0-9\.]+)', path_str)
    return [(float(x), float(y)) for x, y in raw]

def format_path(pts):
    # deduplicate consecutive
    dedup = [pts[0]]
    for p in pts[1:]:
        if abs(p[0] - dedup[-1][0]) > 0.05 or abs(p[1] - dedup[-1][1]) > 0.05:
            dedup.append(p)
    if dedup[-1] != dedup[0]:
        dedup.append(dedup[0])
    return "M " + " L ".join(f"{p[0]:.1f} {p[1]:.1f}" for p in dedup) + " Z"

def get_path_str(gov_id):
    pattern = rf'id:\s*"{gov_id}".*?path:\s*"([^"]+)"'
    m = re.search(pattern, content, re.DOTALL)
    return m.group(1)

# 1. New Baghdad
baghdad_new_pts = [
    (452.0, 364.0),
    (472.0, 372.0),
    (482.0, 392.0),
    (474.0, 416.0),
    (456.0, 426.0),
    (434.0, 418.0),
    (424.0, 396.0),
    (434.0, 374.0),
    (452.0, 364.0)
]

# 2. Salah al-Deen:
salah_pts = parse_path(get_path_str("salah_al_deen"))
# idx 0..12 is south-east, idx 259..261 is south-west
# Keep 13..258 and insert (434.0, 374.0) -> (452.0, 364.0) -> (472.0, 372.0)
salah_new = salah_pts[13:259] + [(434.0, 374.0), (452.0, 364.0), (472.0, 372.0), salah_pts[13]]

# 3. Diyala:
diyala_pts = parse_path(get_path_str("diyala"))
# keep idx 22..394 and insert (472.0, 372.0) -> (482.0, 392.0)
diyala_new = [(472.0, 372.0), (482.0, 392.0)] + diyala_pts[22:395] + [(472.0, 372.0)]

# 4. Wasit:
wasit_pts = parse_path(get_path_str("wasit"))
# keep idx 0..214 and idx 250..292 and insert (482.0, 392.0) -> (474.0, 416.0) -> (456.0, 426.0)
wasit_new = wasit_pts[0:215] + [(482.0, 392.0), (474.0, 416.0), (456.0, 426.0)] + wasit_pts[250:]

# 5. Babylon:
babylon_pts = parse_path(get_path_str("babylon"))
# keep idx 0..128 and idx 171..179 and insert (456.0, 426.0) -> (434.0, 418.0) -> (424.0, 396.0)
babylon_new = babylon_pts[0:129] + [(456.0, 426.0), (434.0, 418.0), (424.0, 396.0)] + babylon_pts[171:]

# 6. Al-Anbar:
anbar_pts = parse_path(get_path_str("al_anbar"))
# keep idx 0..84 and idx 99..139 and insert (424.0, 396.0) -> (434.0, 374.0)
anbar_new = anbar_pts[0:85] + [(424.0, 396.0), (434.0, 374.0)] + anbar_pts[99:]

updated_paths = {
    "baghdad": (format_path(baghdad_new_pts), 452.0, 395.0),
    "salah_al_deen": (format_path(salah_new), 392.1, 288.0),
    "diyala": (format_path(diyala_new), 501.7, 338.7),
    "wasit": (format_path(wasit_new), 547.7, 447.9),
    "babylon": (format_path(babylon_new), 455.0, 460.0),
    "al_anbar": (format_path(anbar_new), 250.9, 427.4),
}

# Update content
new_content = content
for gov_id, (new_path, cx, cy) in updated_paths.items():
    # Replace path
    pat = rf'(id:\s*"{gov_id}".*?cx:\s*)[0-9\.]+(,.*?cy:\s*)[0-9\.]+(,.*?path:\s*)"[^"]+"'
    repl = rf'\g<1>{cx}\g<2>{cy}\g<3>"{new_path}"'
    new_content = re.sub(pat, repl, new_content, flags=re.DOTALL)

with open('src/lib/data/iraq-svg-paths.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully updated src/lib/data/iraq-svg-paths.ts with prominent Baghdad and seamless neighbors!")
