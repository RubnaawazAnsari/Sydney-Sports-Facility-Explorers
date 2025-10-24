import { useEffect, useRef, useState, useCallback } from 'react';
import { useAtom } from 'jotai';
import { 
  coordinatesAtom, 
  mapBoundsAtom,
  isMapInteractingAtom 
} from '@/lib/jotai/atoms';

interface UseMapboxReturn {
  mapContainer: React.RefObject<HTMLDivElement | null>;
  isMapLoaded: boolean;
  map: React.RefObject<mapboxgl.Map | null>;
}

export function useMapbox(): UseMapboxReturn {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  
  const [coordinates] = useAtom(coordinatesAtom);
  const [, setMapBounds] = useAtom(mapBoundsAtom);
  const [, setIsMapInteracting] = useAtom(isMapInteractingAtom);
  
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const initializeMap = useCallback(() => {
    if (!mapContainer.current || map.current) return;

    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    
    if (!mapboxToken) {
      return;
    }

    map.current = new window.mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [151.2093, -33.8688],
      zoom: 11,
      accessToken: mapboxToken
    });

    map.current.on('load', () => {
      setIsMapLoaded(true);
    });

    map.current.on('moveend', () => {
      if (!map.current) return;
      
      const bounds = map.current.getBounds();
      if (bounds) {
        setMapBounds({
          north: bounds.getNorth(),
          south: bounds.getSouth(),
          east: bounds.getEast(),
          west: bounds.getWest()
        });
      }
    });

    map.current.on('movestart', () => setIsMapInteracting(true));
    map.current.on('moveend', () => setIsMapInteracting(false));
    map.current.on('zoomstart', () => setIsMapInteracting(true));
    map.current.on('zoomend', () => setIsMapInteracting(false));
  }, [setMapBounds, setIsMapInteracting]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    if (typeof window === 'undefined' || !window.mapboxgl) {
      const timer = setTimeout(() => {
        if (window.mapboxgl) {
          initializeMap();
        }
      }, 100);
      return () => clearTimeout(timer);
    }

    initializeMap();
  }, [initializeMap]);

  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (map.current && coordinates) {
      map.current.flyTo({
        center: [coordinates.lng, coordinates.lat],
        zoom: 13,
        duration: 1000
      });
    }
  }, [coordinates]);

  return {
    mapContainer,
    isMapLoaded,
    map
  };
}
