type FloralMotif = 'bouquet' | 'sprig' | 'flourish';

const dimensions = {
  bouquet: {width: 300, height: 340},
  sprig: {width: 190, height: 300},
  flourish: {width: 360, height: 110},
} as const;

export default function Floral({motif = 'bouquet', className = '', priority = false}: {
  motif?: FloralMotif;
  className?: string;
  priority?: boolean;
}) {
  return <img
    className={`floral-art ${className}`}
    src={`/assets/brand/floral-${motif}.svg`}
    {...dimensions[motif]}
    alt=""
    aria-hidden="true"
    draggable={false}
    loading={priority ? 'eager' : 'lazy'}
    decoding="async"
  />;
}
