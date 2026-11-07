import photos from './data/variant-photos.json' with { type: 'json' };
import type { Product, Variant } from './types';

const reviewedPhotos: Record<string, Record<string, { name: string; image: string; swatchHex?: string }>> = photos;

// Unknown, changed, legacy and group photos stay hidden until individually reviewed.
export function variantPhoto(product: Product, variant?: Variant): string {
  if (!variant || variant.reference) return '';
  const current = product.variants.find(v => v.id === variant.id);
  const reviewed = reviewedPhotos[product.id]?.[variant.id];
  return current && reviewed && current.name === variant.name && current.image === variant.image
    && reviewed.name === variant.name && reviewed.image === variant.image ? reviewed.image : '';
}

// A verified photo alone does not prove that a legacy hex sampled the fabric.
export function variantSwatch(product: Product, variant: Variant): string {
  if (!variantPhoto(product, variant)) return '';
  const color = reviewedPhotos[product.id]?.[variant.id]?.swatchHex;
  return color && /^#[0-9a-f]{6}$/i.test(color) ? color : '';
}

export function productPhotos(product: Product, variant?: Variant): string[] {
  if (variant) {
    const photo = variantPhoto(product, variant);
    return photo ? [photo] : [];
  }
  return [...new Set([...(product.modelImages || []), ...product.images])].filter(Boolean);
}

export function initialProductPhoto(product: Product, variant?: Variant): string {
  return variant ? variantPhoto(product, variant) : productPhotos(product)[0] || '';
}

export function hasVariantQuery(product: Product, query: string): boolean {
  const term = query.trim().toLowerCase();
  return Boolean(term && product.variants.some(v => v.name.toLowerCase().includes(term)));
}

export function catalogVariant(product: Product, color = '', query = ''): Variant | undefined {
  const term = query.trim().toLowerCase();
  const shadeQuery = hasVariantQuery(product, query);
  return product.variants.find(v => (!color || (v.family || product.colorFamily) === color)
    && (!shadeQuery || v.name.toLowerCase().includes(term)));
}
