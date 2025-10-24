import { useState, useCallback } from 'react';
import { useAtom } from 'jotai';
import { 
  searchQueryAtom, 
  selectedLocationAtom,
  coordinatesAtom 
} from '@/lib/jotai/atoms';
import { searchPlaces } from '@/lib/mapbox/client';
import { debounceAsync } from '@/lib/utils';

interface UseLocationSearchReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  suggestions: string[];
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  isSearching: boolean;
  handleSearchChange: (value: string) => void;
  handleLocationSelect: (locationName: string) => Promise<void>;
}

export function useLocationSearch(): UseLocationSearchReturn {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [, setSelectedLocation] = useAtom(selectedLocationAtom);
  const [, setCoordinates] = useAtom(coordinatesAtom);
  
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearch = debounceAsync(async (...args: unknown[]) => {
    const query = args[0] as string;
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    try {
      const places = await searchPlaces(query, {
        country: 'AU',
        types: ['place', 'locality', 'neighborhood'],
        limit: 5
      });
      
      setSuggestions(places.map(place => place.place_name));
    } catch {
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  }, 300);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    debouncedSearch(value);
    setShowSuggestions(true);
  }, [setSearchQuery, debouncedSearch]);

  const handleLocationSelect = useCallback(async (locationName: string) => {
    setSelectedLocation(locationName);
    setSearchQuery(locationName);
    setShowSuggestions(false);
    
    try {
      const places = await searchPlaces(locationName, {
        country: 'AU',
        limit: 1
      });
      
      if (places.length > 0) {
        const [lng, lat] = places[0].center;
        setCoordinates({ lat, lng });
      }
    } catch {
    }
  }, [setSelectedLocation, setSearchQuery, setCoordinates]);

  return {
    searchQuery,
    setSearchQuery,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    isSearching,
    handleSearchChange,
    handleLocationSelect
  };
}
