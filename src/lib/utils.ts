const BASE_PATH = '/';

export function withBase(path: string): string {
  if (path.startsWith(BASE_PATH)) {
    return path;
  }
  if (path.startsWith('http') || path.startsWith('mailto:') || path.startsWith('tel:') || path.startsWith('#')) {
    return path;
  }
  return `${BASE_PATH}${path}`;
}
