import { useState, useCallback } from 'react';
import { useAtom } from 'jotai';
import { 
  selectedLocationAtom,
  coordinatesAtom 
} from '@/lib/jotai/atoms';
import { reverseGeocode } from '@/lib/mapbox/client';

interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
  };
}

interface GeolocationError {
  code: number;
  message: string;
}

interface UseGeolocationReturn {
  isSupported: boolean;
  isLoading: boolean;
  error: string | null;
  getCurrentPosition: () => Promise<void>;
  clearError: () => void;
}

export function useGeolocation(): UseGeolocationReturn {
  const [, setSelectedLocation] = useAtom(selectedLocationAtom);
  const [, setCoordinates] = useAtom(coordinatesAtom);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isSupported = typeof window !== 'undefined' && 'geolocation' in navigator;

  const getCurrentPosition = useCallback(async () => {
    if (!isSupported) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setIsLoading(true);
    setError(null);

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000, // 10 seconds
      maximumAge: 300000 // 5 minutes
    };

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });

      const { latitude, longitude } = position.coords;
      
      setCoordinates({ lat: latitude, lng: longitude });
      try {
        const place = await reverseGeocode(longitude, latitude);
        if (place) {
          setSelectedLocation(place.place_name);
        } else {
          setSelectedLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        }
      } catch {
        setSelectedLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
      }

    } catch (err) {
      const error = err as GeolocationError;
      let errorMessage = 'Unable to get your location';
      
      switch (error.code) {
        case 1:
          errorMessage = 'Location access denied. Please enable location permissions and try again.';
          break;
        case 2:
          errorMessage = 'Location information is unavailable. Please check your GPS settings.';
          break;
        case 3:
          errorMessage = 'Location request timed out. Please try again.';
          break;
        default:
          errorMessage = `Location error: ${error.message}`;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isSupported, setCoordinates, setSelectedLocation]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isSupported,
    isLoading,
    error,
    getCurrentPosition,
    clearError
  };
}
