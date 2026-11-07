import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {initialProductPhoto,productPhotos,variantPhoto,catalogVariant} from '../src/product-photos.ts';
import {cartSummary,orderMessage} from '../src/commerce.ts';

const products=JSON.parse(readFileSync(new URL('../src/data/products.json',import.meta.url),'utf8'));

const audit=JSON.parse(readFileSync(new URL('../catalog/variant-photo-audit.json',import.meta.url),'utf8'));

test('every current and legacy variant has an explicit photo decision and unchanged source asset',()=>{
 let verified=0,hidden=0,legacy=0;
 assert.deepEqual(Object.keys(audit.products).sort(),products.map(p=>p.id).sort());
 for(const p of products){
  const choices=[...p.variants,...(p.legacyVariants||[])];
  assert.deepEqual(Object.keys(audit.products[p.id]).sort(),choices.map(v=>v.id).sort(),p.id);
  for(const v of choices){
   const decision=audit.products[p.id][v.id],photo=variantPhoto(p,v);
   assert.equal(decision.name,v.name);assert.equal(decision.sourceImage,v.image);
   assert.equal(createHash('sha256').update(readFileSync(new URL('../public/assets/images/'+v.image,import.meta.url))).digest('hex'),decision.sourceSha256,p.id+': '+v.id);
   assert.equal(photo,decision.status==='verified'?v.image:'',p.id+': '+v.id);
   assert.deepEqual(productPhotos(p,v),photo?[photo]:[],p.id+': '+v.id);
   assert.equal(initialProductPhoto(p,v),photo,p.id+': '+v.id);
   assert.ok(decision.reason);
   if(photo){verified++;assert.ok(!v.reference);for(const suffix of ['','-360','-640','-960'])assert.ok(existsSync(new URL('../public/assets/images/'+photo.replace('.webp',suffix+'.webp'),import.meta.url)));}
   else if(p.variants.includes(v))hidden++;else legacy++;
  }
 }
 assert.deepEqual(audit.summary,{products:27,variants:468,verifiedPhotos:verified,hiddenPhotos:hidden,hiddenLegacyPhotos:legacy});
 assert.equal(verified,359);assert.equal(hidden,109);assert.equal(legacy,21);
});

test('group posters, conflicting labels and uncertain color never fall back to another photo',()=>{
 for(const [id,variantId] of [['paris-legend','white'],['paris-japan','granola'],['zoya-instan','black'],['paris-legend','burgundy'],['mukena-segenggam-lily','pink']]){
  const p=products.find(p=>p.id===id),v=p.variants.find(v=>v.id===variantId);
  assert.ok(v,id+': '+variantId);assert.equal(variantPhoto(p,v),'');assert.equal(initialProductPhoto(p,v),'');assert.deepEqual(productPhotos(p,v),[]);
 }
 for(const p of products)for(const v of p.legacyVariants||[])assert.equal(variantPhoto(p,v),'');
 const pending=products.find(p=>p.id==='inner-tali');assert.deepEqual(productPhotos(pending),[]);assert.equal(initialProductPhoto(pending),'');
});

test('changed and newly added mappings require a new individual photo review',()=>{
 const p=products.find(p=>p.id==='modal-viscose'),v=p.variants[0];
 for(const changed of [{...v,image:p.variants[1].image},{...v,name:'New shade'},{...v,id:'new-shade'},{...v,reference:true}]){
  assert.equal(variantPhoto(p,changed),'');assert.equal(variantPhoto({...p,variants:[changed]},changed),'');
 }
 assert.equal(variantPhoto({...p,id:'new-product'},v),'');assert.equal(variantPhoto(p), '');
});

test('color filters and shade searches must agree on the same variant',()=>{
 const p=products.find(p=>p.id==='paris-legend');
 assert.equal(catalogVariant(p,'Lavender','Black'),undefined);
 assert.equal(catalogVariant(p,'Pink','Red').name,'Beet Red');
 assert.equal(catalogVariant(p,'Lavender','Paris Legend').family,'Lavender');
 assert.equal(catalogVariant({...p,colorFamily:'Missing'},'Missing'),undefined);
 for(const p of products)for(const v of p.variants){
  const selected=catalogVariant(p,v.family||p.colorFamily,v.name);
  assert.ok(selected,p.id+': '+v.id);assert.equal(selected.family||p.colorFamily,v.family||p.colorFamily);
  assert.ok(selected.name.toLowerCase().includes(v.name.toLowerCase()));
 }
});

test('Zea price is Rp48000 throughout cart totals and the WhatsApp order',()=>{
 const zea=products.find(p=>p.id==='zea-sport-instan');
 const cart=[{productId:zea.id,variantId:zea.variants[1].id,quantity:2}];
 assert.equal(zea.retailPrice,48000);
 assert.equal(cartSummary(cart,products).subtotal,96000);
 const message=orderMessage(cart,products);
 assert.match(message,/48\.000/);
 assert.match(message,/96\.000/);
 assert.match(message,/Taupe/);
 assert.doesNotMatch(message,/tanya harga/i);
});
