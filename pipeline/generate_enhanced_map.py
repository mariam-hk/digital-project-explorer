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

# Let's define the new Baghdad boundary:
# A prominent capital shape matching official Iraqi administrative maps:
# Border vertices around Baghdad clockwise starting from North:
# 1. North vertex (Tarmiyah): (452.0, 364.0)
# 2. North-East vertex (Husseiniyah / Diyala border): (472.0, 372.0)
# 3. East vertex (Mada'in / Nahrawan): (482.0, 392.0)
# 4. South-East vertex (Tigris bend / Wasit border): (474.0, 416.0)
# 5. South vertex (Mahmudiyah / Babil border): (456.0, 426.0)
# 6. South-West vertex (Latifiyah / Karbala/Babil junction): (434.0, 418.0)
# 7. West vertex (Abu Ghraib / Anbar border): (424.0, 396.0)
# 8. North-West vertex (Shoala / Tarmiyah / Salah al-Deen junction): (434.0, 374.0)

# Check the centroid:
# cx = (452 + 472 + 482 + 474 + 456 + 434 + 424 + 434) / 8 = 453.5
# cy = (364 + 372 + 392 + 416 + 426 + 418 + 396 + 374) / 8 = 394.75
# Bounding box: x in [424, 482] (width = 58), y in [364, 426] (height = 62)
# That is ~3.5 times the area of the previous sliver!

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

print("New Baghdad points defined:", len(baghdad_new_pts))
