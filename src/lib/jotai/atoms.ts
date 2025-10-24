
import { atom } from 'jotai';
import type { Experience } from '@/types/storyblok';

export const selectedLocationAtom = atom<string>('');

export const coordinatesAtom = atom<{ lat: number; lng: number } | null>(null);

export const mapBoundsAtom = atom<{
  north: number;
  south: number;
  east: number;
  west: number;
} | null>(null);

export const searchQueryAtom = atom<string>('');

export const facilityTypeFilterAtom = atom<string>('all');

export const selectedTagsAtom = atom<string[]>([]);

export const priceFilterAtom = atom<string>('all');

export const accessibilityFilterAtom = atom<string>('all');

export const searchRadiusAtom = atom<number>(10);

export const experiencesAtom = atom<Experience[]>([]);

export const filteredExperiencesAtom = atom<Experience[]>((get) => {
  const experiences = get(experiencesAtom);
  const searchQuery = get(searchQueryAtom);
  const facilityType = get(facilityTypeFilterAtom);
  const selectedTags = get(selectedTagsAtom);
  const priceFilter = get(priceFilterAtom);
  const accessibilityFilter = get(accessibilityFilterAtom);
  const mapBounds = get(mapBoundsAtom);
  const coordinates = get(coordinatesAtom);
  const radius = get(searchRadiusAtom);

  return experiences.filter((experience) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = experience.title.toLowerCase().includes(query);
      const matchesSuburb = experience.locationTag?.toLowerCase().includes(query);
      if (!matchesName && !matchesSuburb) return false;
    }

    if (facilityType !== 'all') {
      if (experience.tags && !experience.tags.includes(facilityType)) {
        return false;
      }
    }

    if (selectedTags.length > 0) {
      if (!experience.tags || !selectedTags.every(tag => experience.tags!.includes(tag))) {
        return false;
      }
    }

    if (priceFilter !== 'all') {
      if (!experience.pricing || experience.pricing.toLowerCase() !== priceFilter.toLowerCase()) {
        return false;
      }
    }

    if (accessibilityFilter !== 'all') {
      if (accessibilityFilter === 'accessible' && !experience.accessibility) {
        return false;
      }
      if (accessibilityFilter === 'not-accessible' && experience.accessibility) {
        return false;
      }
    }

    if (mapBounds && experience.coordinates) {
      const { lat, lng } = experience.coordinates;
      if (
        lat < mapBounds.south ||
        lat > mapBounds.north ||
        lng < mapBounds.west ||
        lng > mapBounds.east
      ) {
        return false;
      }
    }

    if (coordinates && experience.coordinates) {
      const distance = calculateDistance(coordinates, experience.coordinates);
      if (distance > radius) return false;
    }

    return true;
  });
});

export const isLoadingAtom = atom<boolean>(false);

export const errorAtom = atom<string | null>(null);

export const isMapInteractingAtom = atom<boolean>(false);

export const selectedExperienceAtom = atom<Experience | null>(null);

function calculateDistance(
  coord1: { lat: number; lng: number },
  coord2: { lat: number; lng: number }
): number {
  const R = 6371;
  const dLat = (coord2.lat - coord1.lat) * (Math.PI / 180);
  const dLng = (coord2.lng - coord1.lng) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coord1.lat * (Math.PI / 180)) *
      Math.cos(coord2.lat * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

