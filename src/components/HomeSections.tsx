import {Link} from 'react-router-dom';
import {ArrowUpRight,MessageCircle} from 'lucide-react';
import {products,imageUrl,imageSet,priceLabel} from '../data/catalog';
import {config} from '../config';
import {whatsappUrl} from '../commerce';
import ProductCard from './ProductCard';
export function Photo({file,alt,priority=false,className='',sizes='(max-width:700px) 90vw, 45vw'}:{file:string;alt:string;priority?:boolean;className?:string;sizes?:string}){return <img className={className} src={imageUrl(file)} srcSet={imageSet(file)} sizes={sizes} alt={alt} width="900" height="1200" loading={priority?'eager':'lazy'} fetchPriority={priority?'high':undefined}/>;}
export function Selection({ids,title,eyebrow}:{ids:string[];title:React.ReactNode;eyebrow:string}){return <section className="selection section"><div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div><Link className="text-link" to="/koleksi">Jelajahi semua koleksi <ArrowUpRight size={18}/></Link></div><div className="product-grid">{ids.map(id=><ProductCard key={id} product={products.find(p=>p.id===id)!}/>)}</div></section>;}
export function ProductCaption({id,number}:{id:string;number?:string}){const p=products.find(p=>p.id===id)!;return <Link className="product-caption" to={'/produk/'+p.slug}><span>{number&&<small>{number} / </small>}{p.name}</span><span>{priceLabel(p)} <ArrowUpRight size={16}/></span></Link>;}
export function Contact(){return <section className="home-contact"><span className="eyebrow">PILIHAN YANG PERSONAL</span><h2>Mari temukan<br/><em>favoritmu.</em></h2><p>Butuh teman memilih warna atau ingin memastikan detail koleksi? Sapa kami, lalu lanjutkan pilihanmu dengan nyaman.</p><a className="button" href={whatsappUrl(`Halo ${config.brand}, saya ingin dibantu memilih koleksi.`)} target="_blank" rel="noreferrer"><MessageCircle size={18}/>Hubungi {config.brand}<ArrowUpRight size={18}/></a></section>;}
