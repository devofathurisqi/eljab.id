import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { variantPhoto, variantSwatch } from '../src/product-photos.ts';

const read = file => JSON.parse(readFileSync(new URL(file, import.meta.url), 'utf8'));
const products = read('../src/data/products.json');
const audit = read('../catalog/swatch-audit.json');

test('all active and saved variants have an explicit fabric swatch or neutral decision', () => {
  let sampled = 0, neutral = 0, legacy = 0;
  assert.deepEqual(Object.keys(audit.products).sort(), products.map(p => p.id).sort());
  for (const p of products) {
    const choices = [...p.variants, ...(p.legacyVariants || [])];
    assert.deepEqual(Object.keys(audit.products[p.id]).sort(), choices.map(v => v.id).sort());
    for (const v of choices) {
      const entry = audit.products[p.id][v.id];
      assert.equal(entry.name, v.name);
      assert.equal(entry.image, v.image);
      assert.equal(variantSwatch(p, v), entry.status === 'sampled' ? entry.color : '', `${p.id}/${v.id}`);
      if (entry.status === 'sampled') {
        sampled++;
        assert.equal(variantPhoto(p, v), entry.image);
        assert.match(entry.color, /^#[0-9a-f]{6}$/i);
        assert.equal(entry.crop.length, 4);
        const [left, top, right, bottom] = entry.crop;
        assert.ok(left >= 0 && top >= 0 && right <= 1 && bottom <= 1 && left < right && top < bottom);
        assert.equal(createHash('sha256').update(readFileSync(new URL('../public/assets/images/' + entry.image, import.meta.url))).digest('hex'), entry.sourceSha256);
      } else {
        assert.ok(entry.reason);
        if (p.variants.includes(v)) neutral++; else legacy++;
      }
    }
  }
  assert.deepEqual(audit.summary, { sampled, neutral, legacy, activeVariants: sampled + neutral });
  assert.equal(sampled, 268); assert.equal(neutral, 200); assert.equal(legacy, 21);
});

test('Beet Red and other strong colors are fabric colors rather than the photo background', () => {
  const paris = products.find(p => p.id === 'paris-legend');
  const rgb = id => variantSwatch(paris, paris.variants.find(v => v.id === id)).slice(1).match(/../g).map(n => parseInt(n, 16));
  const [red, green, blue] = rgb('beet-red');
  assert.ok(red > green * 3 && red > blue * 2, 'Beet Red must be burgundy, not beige/grey');
  assert.equal(variantSwatch(paris, paris.variants.find(v => v.id === 'beet-red')), '#771830');
  const electric = rgb('electric-blue'); assert.ok(electric[2] > electric[0] * 3 && electric[2] > electric[1] * 3);
  const emerald = rgb('fresh-emerald'); assert.ok(emerald[1] > emerald[0] * 3);
});

test('legacy hex cannot override a reviewed fabric sample or supply a missing sample', () => {
  for (const p of products) for (const v of [...p.variants, ...(p.legacyVariants || [])]) {
    assert.equal(variantSwatch(p, { ...v, hex: '#00ff00' }), variantSwatch(p, v), `${p.id}/${v.id}`);
  }
  const p = products.find(p => p.id === 'paris-legend'), v = p.variants.find(v => v.id === 'beet-red');
  assert.equal(variantSwatch({ ...p, id: 'unknown' }, v), '');
  assert.equal(variantSwatch(p, { ...v, image: p.variants[0].image }), '');
  assert.equal(variantSwatch(p, { ...v, name: 'Different shade' }), '');
});

test('multi-color and gradient photos never receive an invented flat swatch', () => {
  for (const id of ['viscose-gradasi', 'printed-viscose', 'motif-tryspan', 'mukena-armani', 'hampers-soft-box']) {
    const p = products.find(p => p.id === id);
    assert.ok(p.variants.some(v => variantPhoto(p, v)));
    for (const v of p.variants) assert.equal(variantSwatch(p, v), '', `${id}/${v.id}`);
  }
});
