import json
import re

with open('src/lib/data/iraq-svg-paths.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's inspect the exact paths of baghdad, babylon, salah_al_deen, diyala, wasit, al_anbar
def extract_gov_path(gov_id):
    pattern = rf'id:\s*"{gov_id}".*?path:\s*"([^"]+)"'
    m = re.search(pattern, content, re.DOTALL)
    return m.group(1) if m else None

print("Baghdad path found:", extract_gov_path("baghdad") is not None)
print("Salah Al-Deen path found:", extract_gov_path("salah_al_deen") is not None)
print("Babylon path found:", extract_gov_path("babylon") is not None)
print("Wasit path found:", extract_gov_path("wasit") is not None)
print("Diyala path found:", extract_gov_path("diyala") is not None)
print("Al-Anbar path found:", extract_gov_path("al_anbar") is not None)
