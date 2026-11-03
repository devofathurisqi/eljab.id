import {Link} from 'react-router-dom';
import {ArrowUpRight} from 'lucide-react';
import {Logo} from '../components/Layout';
import {ShoppingSteps} from '../App';
import {config} from '../config';
import {whatsappUrl} from '../commerce';
export default function About(){return <><section className="about-hero section"><div><span className="eyebrow">CERITA {config.brand}</span><h1>{config.storyTitle}</h1><p>{config.story}</p><p>Jelajahi koleksi, bandingkan pilihan warna, lalu simpan favoritmu. Kami siap membantu memastikan detail produk dan ketersediaannya melalui WhatsApp.</p><Link to="/koleksi" className="button">Temukan pilihanmu <ArrowUpRight size={18}/></Link></div><div className="about-identity"><Logo/><p>{config.tagline}</p><a className="text-link" href={whatsappUrl(`Halo ${config.brand}, saya ingin bertanya tentang koleksi.`)} target="_blank" rel="noreferrer">Berbincang dengan kami <ArrowUpRight size={18}/></a></div></section><ShoppingSteps/></>;}
