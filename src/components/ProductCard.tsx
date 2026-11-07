import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Heart, Plus, ArrowUpRight } from 'lucide-react';
import type { Product } from '../types';
import { priceLabel } from '../data/catalog';
import { catalogVariant, hasVariantQuery, initialProductPhoto, variantPhoto } from '../product-photos';
import { useShop } from '../store';
import ProductImage from './ProductImage';
import VariantSwatch from './VariantSwatch';
export default function ProductCard({ product:p }:{product:Product}) {
 const [params]=useSearchParams(),color=params.get('warna')||'',query=params.get('q')||'';
 const context=JSON.stringify([p.id,color,query]);
 const [choice,setChoice]=useState<{context:string;id:string}>();
 const manual=choice?.context===context?p.variants.find(v=>v.id===choice.id):undefined;
 const picked=Boolean(manual||color||hasVariantQuery(p,query));
 const selected=manual||catalogVariant(p,color,query);
 const {favorites,toggleFavorite,add}=useShop();
 const href=`/produk/${p.slug}${picked&&selected?`?varian=${selected.id}`:''}`;
 const photo=picked?variantPhoto(p,selected):initialProductPhoto(p),contain=!p.modelImages?.includes(photo)&&(p.contain||(picked&&selected?.contain));
 return <article className={`product-card ${!selected?'inquiry-card':''}`}><div className={`product-photo ${contain?'contain-photo':''}`}>
  <Link to={href} aria-label={`Lihat ${p.name}`}><ProductImage file={photo} sizes="(max-width:700px) 45vw, 24vw" alt={picked?`${p.name} — ${selected?.name||color}`:`${p.name} — tampilan koleksi`} width="600" height="800" loading="lazy" fallback={<div className="photography-inquiry"><span className="eyebrow">MARI PILIH BERSAMA</span><span>{p.name}</span><small>{picked?`Foto ${selected?.name||color} belum tersedia`:'Tanyakan foto & pilihan warna'} <ArrowUpRight size={16}/></small></div>}/></Link>
  <button className={`favorite-button ${favorites.includes(p.id)?'is-favorite':''}`} aria-label={`Simpan ${p.name}`} aria-pressed={favorites.includes(p.id)} onClick={()=>toggleFavorite(p.id)}><Heart size={17}/></button>
  {selected&&(picked||p.variants.length===1?<button className="card-quick" onClick={()=>add(p.id,selected.id,1)}><span>Tambahkan ke tas</span><Plus size={17}/></button>:<Link className="card-quick" to={href+'#pilihan-varian'}><span>Pilih warna</span><ArrowUpRight size={17}/></Link>)}
 </div><div className="product-meta"><span className="product-material">{p.category}</span><Link to={href} className="product-name">{p.name}<ArrowUpRight size={15}/></Link><div className="product-bottom"><span className="product-price">{priceLabel(p)}</span><div className="card-swatches">{p.variants.slice(0,4).map(v=><VariantSwatch key={v.id} product={p} variant={v} label={`${p.name}: ${v.name}`} selected={picked&&selected?.id===v.id} onSelect={()=>setChoice({context,id:v.id})}/>)}{p.variants.length>4&&<Link to={`/produk/${p.slug}#pilihan-varian`} aria-label={`Lihat ${p.variants.length} varian`}>+{p.variants.length-4}</Link>}</div></div>{p.variants.length>1&&<Link className="variant-count-link" to={`/produk/${p.slug}#pilihan-varian`}>{p.variants.length} pilihan warna / motif <ArrowUpRight size={12}/></Link>}</div></article>;
}
