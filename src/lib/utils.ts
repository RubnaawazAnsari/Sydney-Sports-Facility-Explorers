/**
 * Utility functions for the Sydney Sports Facility Explorer
 * 
 * Common utilities for class name merging, formatting, and other
 * helper functions used throughout the application.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with proper conflict resolution
 * 
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format distance for display
 * 
 * @param distance - Distance in kilometers
 * @returns Formatted distance string
 */
export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance.toFixed(1)}km`;
}

/**
 * Format facility type for display
 * 
 * @param type - Facility type string
 * @returns Formatted type string
 */
export function formatFacilityType(type: string): string {
  return type
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Truncate text to specified length
 * 
 * @param text - Text to truncate
 * @param length - Maximum length
 * @returns Truncated text with ellipsis
 */
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

/**
 * Debounce function for search inputs
 * 
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Debounce function specifically for async functions
 * 
 * @param func - Async function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced async function
 */
export function debounceAsync<T extends (...args: unknown[]) => Promise<unknown>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Check if coordinates are valid
 * 
 * @param lat - Latitude
 * @param lng - Longitude
 * @returns True if coordinates are valid
 */
export function isValidCoordinates(lat: number, lng: number): boolean {
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    !isNaN(lat) &&
    !isNaN(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
}

/**
 * Generate a unique ID for components
 * 
 * @returns Unique ID string
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Format phone number for display
 * 
 * @param phone - Phone number string
 * @returns Formatted phone number
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format Australian phone numbers
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 6)} ${cleaned.slice(6)}`;
  }
  
  if (cleaned.length === 8) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
  }
  
  return phone;
}

/**
 * Get facility type color class
 * 
 * @param type - Facility type
 * @returns Tailwind color class
 */
export function getFacilityTypeColor(type: string): string {
  const colorMap: Record<string, string> = {
    park: 'text-facility-park',
    'sports-center': 'text-facility-sports',
    'recreation-center': 'text-facility-recreation',
    gym: 'text-facility-fitness',
    'swimming-pool': 'text-facility-sports',
    'tennis-court': 'text-facility-sports',
    'basketball-court': 'text-facility-sports',
    'football-field': 'text-facility-sports',
    'cricket-ground': 'text-facility-sports',
    'outdoor-fitness': 'text-facility-fitness',
  };
  
  return colorMap[type] || 'text-gray-600';
}

/**
 * Get facility type background color class
 * 
 * @param type - Facility type
 * @returns Tailwind background color class
 */
export function getFacilityTypeBgColor(type: string): string {
  const colorMap: Record<string, string> = {
    park: 'bg-facility-park/10',
    'sports-center': 'bg-facility-sports/10',
    'recreation-center': 'bg-facility-recreation/10',
    gym: 'bg-facility-fitness/10',
    'swimming-pool': 'bg-facility-sports/10',
    'tennis-court': 'bg-facility-sports/10',
    'basketball-court': 'bg-facility-sports/10',
    'football-field': 'bg-facility-sports/10',
    'cricket-ground': 'bg-facility-sports/10',
    'outdoor-fitness': 'bg-facility-fitness/10',
  };
  
  return colorMap[type] || 'bg-gray-100';
}

