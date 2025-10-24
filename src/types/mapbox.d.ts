/**
 * Mapbox GL JS type declarations
 * 
 * Extends the global window object with Mapbox GL JS types
 * for proper TypeScript support.
 */

declare global {
  interface Window {
    mapboxgl: typeof import('mapbox-gl');
  }
}

export interface MapboxPlace {
  id: string;
  place_name: string;
  center: [number, number];
  bbox?: [number, number, number, number];
  context?: Array<{
    id: string;
    text: string;
    wikidata?: string;
    short_code?: string;
  }>;
  properties?: Record<string, unknown>;
}

export interface MapboxSearchResult {
  features: MapboxPlace[];
  query: string[];
}

export interface MapboxPlaceDetails {
  id: string;
  place_name: string;
  center: [number, number];
  bbox?: [number, number, number, number];
  context?: Array<{
    id: string;
    text: string;
    wikidata?: string;
    short_code?: string;
  }>;
  properties?: Record<string, unknown>;
}

export {};

