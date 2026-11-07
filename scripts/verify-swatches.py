"""Verify approved fabric samples without creating or modifying any files (Pillow)."""
from pathlib import Path
from hashlib import sha256
import json
from PIL import Image, ImageStat

root = Path(__file__).resolve().parents[1]
audit = json.loads((root / 'catalog/swatch-audit.json').read_text(encoding='utf8'))
photos = json.loads((root / 'src/data/variant-photos.json').read_text(encoding='utf8'))
count = 0
for product_id, variants in audit['products'].items():
    for variant_id, entry in variants.items():
        reviewed = photos.get(product_id, {}).get(variant_id, {})
        if entry['status'] != 'sampled':
            assert 'swatchHex' not in reviewed, (product_id, variant_id)
            continue
        source = root / 'public/assets/images' / entry['image']
        assert sha256(source.read_bytes()).hexdigest() == entry['sourceSha256']
        with Image.open(source) as raw:
            image = raw.convert('RGB')
        assert list(image.size) == entry['sourceSize']
        bounds = [round(n * (image.width if i % 2 == 0 else image.height)) for i, n in enumerate(entry['crop'])]
        assert bounds == entry['pixelCrop']
        rgb = ImageStat.Stat(image.crop(bounds)).median[:3]
        color = '#' + ''.join(f'{round(n):02x}' for n in rgb)
        assert color == entry['color'] == reviewed.get('swatchHex'), (product_id, variant_id, color)
        count += 1
assert count == audit['summary']['sampled']
print(f'Verified {count} fabric samples against original photo pixels, crop bounds, dimensions and SHA-256.')
