import re

with open('src/lib/data/iraq-svg-paths.ts', 'r', encoding='utf-8') as f:
    content = f.read()

def parse_points(path_str):
    raw = re.findall(r'([0-9\.]+)\s+([0-9\.]+)', path_str)
    return [(float(x), float(y)) for x, y in raw]

def get_gov(gov_id):
    pattern = rf'id:\s*"{gov_id}".*?path:\s*"([^"]+)"'
    m = re.search(pattern, content, re.DOTALL)
    return parse_points(m.group(1))

baghdad_pts = get_gov("baghdad")
print("Baghdad points count:", len(baghdad_pts))
for p in baghdad_pts:
    print(f"  {p}")

print("\n--- Neighbor points near (420-490, 360-440) ---")
for n in ["salah_al_deen", "babylon", "wasit", "diyala", "al_anbar"]:
    pts = get_gov(n)
    near = [p for p in pts if 420 <= p[0] <= 490 and 360 <= p[1] <= 440]
    print(f"{n}: {len(near)} points near Baghdad")
