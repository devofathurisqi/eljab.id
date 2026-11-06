import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {config} from '../src/config.ts';
import {whatsappUrl} from '../src/commerce.ts';
test('authorized brand, exact destination and independent browser storage',()=>{assert.equal(config.brand,"eljab.id");assert.equal(config.whatsapp,"6282241183864");assert.equal(config.whatsappDisplay,"+62 822-4118-3864");assert.equal(config.storageKey,"eljab-bag-v1");assert.equal(config.favoritesKey,"eljab-favorites-v1");assert.equal(new URL(whatsappUrl('Tes warna & jumlah')).pathname,'/'+"6282241183864");});
test('all catalog content remains identical to the authorized Sugarshawl snapshot',()=>{assert.equal(createHash('sha256').update(JSON.stringify(JSON.parse(readFileSync(new URL('../src/data/products.json',import.meta.url),'utf8')))).digest('hex'),"dd29149a76f598573f2c042a56c6c5cc6f64087180b92ce11f98d80657dd15eb");});
