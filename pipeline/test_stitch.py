import re

with open('src/lib/data/iraq-svg-paths.ts', 'r', encoding='utf-8') as f:
    content = f.read()

def parse_path(path_str):
    raw = re.findall(r'([0-9\.]+)\s+([0-9\.]+)', path_str)
    return [(float(x), float(y)) for x, y in raw]

def format_path(pts):
    return "M " + " L ".join(f"{p[0]:.1f} {p[1]:.1f}" for p in pts) + " Z"

def get_path_str(gov_id):
    pattern = rf'id:\s*"{gov_id}".*?path:\s*"([^"]+)"'
    m = re.search(pattern, content, re.DOTALL)
    return m.group(1)

# Current paths
salah_pts = parse_path(get_path_str("salah_al_deen"))
babylon_pts = parse_path(get_path_str("babylon"))
wasit_pts = parse_path(get_path_str("wasit"))
diyala_pts = parse_path(get_path_str("diyala"))
anbar_pts = parse_path(get_path_str("al_anbar"))

# New Baghdad points:
baghdad_new = [
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

# 1. Al-Anbar:
# Touches Baghdad from Tripoint 1 (434.0, 374.0) down to Tripoint 5 (424.0, 396.0)
# Find index in anbar_pts near (431.2, 372.7) / (433.6, 374.5) and near (424.0, 396.0)
new_anbar = []
for p in anbar_pts:
    # If point is inside or very close to old Baghdad junction:
    if 425 <= p[0] <= 445 and 375 <= p[1] <= 405:
        continue
    new_anbar.append(p)
# Insert the clean boundary
# We need to find where to insert (434.0, 374.0) -> (424.0, 396.0)
print("Anbar pts before:", len(anbar_pts), "after filter:", len(new_anbar))
