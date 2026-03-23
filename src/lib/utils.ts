// Utility function to handle base path for links
const BASE_PATH = '/LingXu';

export function withBase(path: string): string {
  // If path already starts with BASE_PATH, return as is
  if (path.startsWith(BASE_PATH)) {
    return path;
  }
  
  // If path is external (http, https, mailto, tel, #), return as is
  if (path.startsWith('http') || path.startsWith('mailto:') || path.startsWith('tel:') || path.startsWith('#')) {
    return path;
  }
  
  // Add base path
  return `${BASE_PATH}${path}`;
}
