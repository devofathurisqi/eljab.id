import type { CSSProperties } from 'react';
import type { Product, Variant } from '../types';
import { variantPhoto, variantSwatch } from '../product-photos';

export default function VariantSwatch({ product, variant, selected, onSelect, label }: {
  product: Product;
  variant: Variant;
  selected: boolean;
  onSelect: () => void;
  label?: string;
}) {
  const color = variantSwatch(product, variant);
  const title = color ? variant.name : `${variant.name} — ${variantPhoto(product, variant) ? 'lihat foto varian' : 'foto belum tersedia'}`;
  return <button aria-label={label || variant.name} title={title} aria-pressed={selected}
    className={`${selected ? 'active' : ''} ${color ? '' : 'unverified-swatch'}`}
    style={{ '--swatch': color || 'transparent' } as CSSProperties} onClick={onSelect} />;
}
