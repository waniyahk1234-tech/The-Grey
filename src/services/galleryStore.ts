import { galleryItems, GalleryItem } from '../data/gallery';

const GALLERY_STORAGE_KEY = 'the_grey_live_gallery';

export function getLiveGalleryItems(): GalleryItem[] {
  if (typeof window === 'undefined') return galleryItems;
  try {
    const stored = localStorage.getItem(GALLERY_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading gallery items:', e);
  }
  return galleryItems;
}

export function saveGalleryItems(items: GalleryItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('the_grey_gallery_updated', { detail: items }));
  } catch (e) {
    console.error('Error saving gallery items:', e);
  }
}

export function addGalleryItem(item: Omit<GalleryItem, 'id'>): GalleryItem {
  const current = getLiveGalleryItems();
  const newItem: GalleryItem = {
    ...item,
    id: `gal-${Date.now()}`,
  };
  const updated = [newItem, ...current];
  saveGalleryItems(updated);
  return newItem;
}

export function updateGalleryItem(item: GalleryItem): void {
  const current = getLiveGalleryItems();
  const updated = current.map((g) => (g.id === item.id ? item : g));
  saveGalleryItems(updated);
}

export function deleteGalleryItem(id: string): void {
  const current = getLiveGalleryItems();
  const updated = current.filter((g) => g.id !== id);
  saveGalleryItems(updated);
}

export function resetGalleryToDefault(): void {
  saveGalleryItems(galleryItems);
}
