import re

with open('src/lib/data/iraq-svg-paths.ts', 'r', encoding='utf-8') as f:
    content = f.read()

def parse_path(path_str):
    raw = re.findall(r'([0-9\.]+)\s+([0-9\.]+)', path_str)
    return [(float(x), float(y)) for x, y in raw]

def get_path_str(gov_id):
    pattern = rf'id:\s*"{gov_id}".*?path:\s*"([^"]+)"'
    m = re.search(pattern, content, re.DOTALL)
    return m.group(1)

for gov_id in ["salah_al_deen", "babylon", "wasit", "diyala", "al_anbar"]:
    pts = parse_path(get_path_str(gov_id))
    print(f"=== {gov_id} (total {len(pts)} pts) ===")
    for i, p in enumerate(pts):
        if 415 <= p[0] <= 495 and 355 <= p[1] <= 435:
            print(f"  idx {i:3d}: ({p[0]:.1f}, {p[1]:.1f})")
