import { SITE_CONFIG } from './constants';

export function withBase(path: string): string {
  const base = SITE_CONFIG.base || '/';
  const normalizedBase = base === '/' ? '' : base;
  
  if (path.startsWith(normalizedBase + '/') || path === normalizedBase) {
    return path;
  }
  if (path.startsWith('http') || path.startsWith('mailto:') || path.startsWith('tel:') || path.startsWith('#')) {
    return path;
  }
  return `${normalizedBase}${path}`;
}
