import { useState, type ImgHTMLAttributes, type ReactNode } from 'react';
import { imageSet, imageUrl } from '../data/catalog';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'onError' | 'children'> & {
  file: string;
  fallback: ReactNode;
  children?: (image: ReactNode) => ReactNode;
};

export default function ProductImage({ file, fallback, children, ...props }: Props) {
  const [failed, setFailed] = useState('');
  if (!file || failed === file) return fallback;
  const image = <img {...props} key={file} src={imageUrl(file)} srcSet={imageSet(file)} onError={() => setFailed(file)} />;
  return children ? children(image) : image;
}
