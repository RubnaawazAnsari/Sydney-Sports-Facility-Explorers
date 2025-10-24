import type { MapboxPlace, MapboxSearchResult, MapboxPlaceDetails } from '@/types/mapbox';

function getMapboxToken(): string | undefined {
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  }
  return process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
}

function isMapboxAvailable(): boolean {
  const token = getMapboxToken();
  return typeof window !== 'undefined' && !!token;
}

const MAPBOX_BASE_URL = 'https://api.mapbox.com';

export async function searchPlaces(
  query: string,
  options: {
    proximity?: [number, number];
    types?: string[];
    limit?: number;
    country?: string;
  } = {}
): Promise<MapboxPlace[]> {
  if (!isMapboxAvailable()) {
    return [];
  }

  const token = getMapboxToken();
  if (!token) {
    return [];
  }

  try {
    const params = new URLSearchParams({
      access_token: token,
      q: query,
      types: options.types?.join(',') || 'place,locality,neighborhood',
      limit: (options.limit || 5).toString()
    });

    if (options.proximity) {
      params.append('proximity', `${options.proximity[0]},${options.proximity[1]}`);
    }

    if (options.country) {
      params.append('country', options.country);
    }

    const response = await fetch(`${MAPBOX_BASE_URL}/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?${params}`);
    
    if (!response.ok) {
      throw new Error(`Mapbox API error: ${response.status}`);
    }

    const data: MapboxSearchResult = await response.json();
    return data.features || [];

    } catch {
    return [];
  }
}

export async function reverseGeocode(
  lng: number,
  lat: number
): Promise<MapboxPlace | null> {
  if (!isMapboxAvailable()) {
    return null;
  }

  const token = getMapboxToken();
  if (!token) {
    return null;
  }

  try {
    const params = new URLSearchParams({
      access_token: token,
      types: 'place,locality,neighborhood'
    });

    const response = await fetch(`${MAPBOX_BASE_URL}/geocoding/v5/mapbox.places/${lng},${lat}.json?${params}`);
    
    if (!response.ok) {
      throw new Error(`Mapbox API error: ${response.status}`);
    }

    const data: MapboxSearchResult = await response.json();
    return data.features?.[0] || null;

    } catch {
    return null;
  }
}

export async function getPlaceDetails(
  placeId: string
): Promise<MapboxPlaceDetails | null> {
  if (!isMapboxAvailable()) {
    return null;
  }

  const token = getMapboxToken();
  if (!token) {
    return null;
  }

  try {
    const params = new URLSearchParams({
      access_token: token
    });

    const response = await fetch(`${MAPBOX_BASE_URL}/geocoding/v5/mapbox.places/${placeId}.json?${params}`);
    
    if (!response.ok) {
      throw new Error(`Mapbox API error: ${response.status}`);
    }

    const data: MapboxSearchResult = await response.json();
    const place = data.features?.[0];
    
    if (!place) {
      return null;
    }

    return {
      id: place.id,
      place_name: place.place_name,
      center: place.center,
      bbox: place.bbox,
      context: place.context || [],
      properties: place.properties || {}
    };

    } catch {
    return null;
  }
}

export async function getAutocompleteSuggestions(
  query: string,
  options: {
    proximity?: [number, number];
    types?: string[];
    limit?: number;
    country?: string;
  } = {}
): Promise<string[]> {
  try {
    const places = await searchPlaces(query, options);
    return places.map(place => place.place_name);
    } catch {
    return [];
  }
}