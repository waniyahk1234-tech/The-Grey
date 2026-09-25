/**
 * THE GREY · DYNAMIC MENU STORE & MANAGEMENT SERVICE
 * 
 * Provides live local state & persistence for all menu items.
 * Allows The Grey's admin to add new dishes, edit prices, descriptions,
 * dietary tags, and toggle signature offerings in real-time.
 */

import { sampleMenuItems, MenuItem } from '../data/menu';

const MENU_STORAGE_KEY = 'the_grey_live_menu';

/**
 * Get current menu items (from localStorage or default seed)
 */
export function getLiveMenuItems(): MenuItem[] {
  if (typeof window === 'undefined') return sampleMenuItems;

  try {
    const stored = localStorage.getItem(MENU_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    // Initialize with default sample items
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(sampleMenuItems));
    return sampleMenuItems;
  } catch (err) {
    console.warn('Menu load error, fallback to defaults:', err);
    return sampleMenuItems;
  }
}

/**
 * Save menu items and dispatch update event
 */
function saveMenuItems(items: MenuItem[]): void {
  try {
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('the_grey_menu_updated', { detail: items }));
  } catch (err) {
    console.error('Failed to save menu items:', err);
  }
}

/**
 * Add a new menu item
 */
export function addMenuItem(item: Omit<MenuItem, 'id'>): MenuItem {
  const current = getLiveMenuItems();
  const newItem: MenuItem = {
    ...item,
    id: `dish-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
  };
  const updated = [newItem, ...current];
  saveMenuItems(updated);
  return newItem;
}

/**
 * Update an existing menu item
 */
export function updateMenuItem(item: MenuItem): void {
  const current = getLiveMenuItems();
  const updated = current.map((dish) => (dish.id === item.id ? item : dish));
  saveMenuItems(updated);
}

/**
 * Delete a menu item
 */
export function deleteMenuItem(id: string): void {
  const current = getLiveMenuItems();
  const updated = current.filter((dish) => dish.id !== id);
  saveMenuItems(updated);
}

/**
 * Reset menu back to default seasonal state
 */
export function resetMenuToDefault(): MenuItem[] {
  saveMenuItems(sampleMenuItems);
  return sampleMenuItems;
}
