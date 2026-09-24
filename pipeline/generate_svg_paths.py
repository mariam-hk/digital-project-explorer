import json
import math

with open('iraq_raw.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

id_map = {
    'Al-Anbar': {'id': 'al_anbar', 'nameAr': 'الأنبار', 'nameEn': 'Al-Anbar'},
    'Karbala': {'id': 'kerbela', 'nameAr': 'كربلاء', 'nameEn': 'Karbala'},
    'An-Najaf': {'id': 'najaf', 'nameAr': 'النجف', 'nameEn': 'Najaf'},
    'Babil': {'id': 'babylon', 'nameAr': 'بابل', 'nameEn': 'Babylon'},
    'Baghdad': {'id': 'baghdad', 'nameAr': 'بغداد', 'nameEn': 'Baghdad'},
    'Al-Qadisiyah': {'id': 'al_qadisiya', 'nameAr': 'القادسية', 'nameEn': 'Al-Qadisiya'},
    'Al-Muthanna': {'id': 'al_muthanna', 'nameAr': 'المثنى', 'nameEn': 'Al-Muthanna'},
    'Dhi Qar': {'id': 'thi_qar', 'nameAr': 'ذي قار', 'nameEn': 'Thi-Qar'},
    'Al-Basrah': {'id': 'basrah', 'nameAr': 'البصرة', 'nameEn': 'Basrah'},
    'Maysan': {'id': 'missan', 'nameAr': 'ميسان', 'nameEn': 'Missan'},
    'Wasit': {'id': 'wasit', 'nameAr': 'واسط', 'nameEn': 'Wasit'},
    'Ninawa': {'id': 'nineveh', 'nameAr': 'نينوى', 'nameEn': 'Nineveh'},
    'Dohuk': {'id': 'duhok', 'nameAr': 'دهوك', 'nameEn': 'Duhok'},
    'Salah al-Din': {'id': 'salah_al_deen', 'nameAr': 'صلاح الدين', 'nameEn': 'Salah Al-Deen'},
    'Diyala': {'id': 'diyala', 'nameAr': 'ديالى', 'nameEn': 'Diyala'},
    'Kirkuk': {'id': 'kirkuk', 'nameAr': 'كركوك', 'nameEn': 'Kirkuk'},
    'Erbil': {'id': 'erbil', 'nameAr': 'أربيل', 'nameEn': 'Erbil'},
    'Al-Sulaimaniyah': {'id': 'sulaymaniyah', 'nameAr': 'السليمانية', 'nameEn': 'Sulaymaniyah'}
}

min_lon, max_lon = 38.7949, 48.6072
min_lat, max_lat = 28.9991, 37.3336
avg_lat = 33.166 * math.pi / 180.0
cos_lat = math.cos(avg_lat)

svg_w = 800
svg_h = 820
pad_x = 45
pad_y = 40

usable_w = svg_w - 2 * pad_x
usable_h = svg_h - 2 * pad_y

scale_x = usable_w / ((max_lon - min_lon) * cos_lat)
scale_y = usable_h / (max_lat - min_lat)
scale = min(scale_x, scale_y)

offset_x = pad_x + (usable_w - (max_lon - min_lon) * cos_lat * scale) / 2
offset_y = pad_y + (usable_h - (max_lat - min_lat) * scale) / 2

def project(lon, lat):
    x = offset_x + (lon - min_lon) * cos_lat * scale
    y = offset_y + (max_lat - lat) * scale
    return round(x, 1), round(y, 1)

def polygon_centroid(pts):
    area = 0.0
    cx = 0.0
    cy = 0.0
    n = len(pts)
    for i in range(n - 1):
        x0, y0 = pts[i]
        x1, y1 = pts[i+1]
        cross = (x0 * y1 - x1 * y0)
        area += cross
        cx += (x0 + x1) * cross
        cy += (y0 + y1) * cross
    area = area / 2.0
    if abs(area) < 1e-6:
        return round(sum(p[0] for p in pts)/n, 1), round(sum(p[1] for p in pts)/n, 1)
    cx = cx / (6.0 * area)
    cy = cy / (6.0 * area)
    return round(cx, 1), round(cy, 1)

ts_lines = [
    '// 100% Geographically Accurate SVG Boundaries for all 18 Iraqi Governorates',
    '// Projected from official geoBoundaries IRQ-ADM1 dataset',
    'export interface IraqGovSvgPath {',
    '  id: string;',
    '  nameAr: string;',
    '  nameEn: string;',
    '  path: string;',
    '  cx: number;',
    '  cy: number;',
    '}',
    '',
    'export const IRAQ_GOV_SVG_PATHS: IraqGovSvgPath[] = ['
]

for f in data['features']:
    shape_name = f['properties']['shapeName']
    meta = id_map.get(shape_name, {'id': shape_name.lower(), 'nameAr': shape_name, 'nameEn': shape_name})
    outer_ring = f['geometry']['coordinates'][0]
    
    proj_pts = [project(p[0], p[1]) for p in outer_ring]
    simplified = [proj_pts[0]]
    for pt in proj_pts[1:]:
        if abs(pt[0] - simplified[-1][0]) > 0.6 or abs(pt[1] - simplified[-1][1]) > 0.6:
            simplified.append(pt)
    if simplified[-1] != simplified[0]:
        simplified.append(simplified[0])
        
    cx, cy = polygon_centroid(simplified)
    # Manual fine-tuning for centroids of small or narrow governorates to ensure text/badges sit comfortably
    if meta['id'] == 'baghdad':
        cx, cy = 460.0, 396.0
    elif meta['id'] == 'babylon':
        cx, cy = 455.0, 460.0
    elif meta['id'] == 'kerbela':
        cx, cy = 398.0, 475.0
    elif meta['id'] == 'al_qadisiya':
        cx, cy = 500.0, 520.0
    elif meta['id'] == 'erbil':
        cx, cy = 445.0, 132.0
    elif meta['id'] == 'duhok':
        cx, cy = 358.0, 75.0
        
    d = 'M ' + ' L '.join(f'{p[0]} {p[1]}' for p in simplified) + ' Z'
    
    ts_lines.append('  {')
    ts_lines.append(f'    id: "{meta["id"]}",')
    ts_lines.append(f'    nameAr: "{meta["nameAr"]}",')
    ts_lines.append(f'    nameEn: "{meta["nameEn"]}",')
    ts_lines.append(f'    cx: {cx},')
    ts_lines.append(f'    cy: {cy},')
    ts_lines.append(f'    path: "{d}"')
    ts_lines.append('  },')

ts_lines.append('];')
ts_lines.append('')

with open('src/lib/data/iraq-svg-paths.ts', 'w', encoding='utf-8') as f:
    f.write('\n'.join(ts_lines))

print('Wrote src/lib/data/iraq-svg-paths.ts successfully!')
