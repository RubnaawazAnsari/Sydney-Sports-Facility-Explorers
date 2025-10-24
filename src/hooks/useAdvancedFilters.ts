import { useAtom } from 'jotai';
import { 
  selectedTagsAtom, 
  priceFilterAtom, 
  accessibilityFilterAtom,
  facilityTypeFilterAtom,
  searchQueryAtom
} from '@/lib/jotai/atoms';

interface UseAdvancedFiltersReturn {
  // Tag filtering
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  toggleTag: (tag: string) => void;
  clearTags: () => void;
  
  // Price filtering
  priceFilter: string;
  setPriceFilter: (price: string) => void;
  
  // Accessibility filtering
  accessibilityFilter: string;
  setAccessibilityFilter: (accessibility: string) => void;
  
  // Clear all filters
  clearAllFilters: () => void;
  
  // Active filter count
  activeFilterCount: number;
}

export function useAdvancedFilters(): UseAdvancedFiltersReturn {
  const [selectedTags, setSelectedTags] = useAtom(selectedTagsAtom);
  const [priceFilter, setPriceFilter] = useAtom(priceFilterAtom);
  const [accessibilityFilter, setAccessibilityFilter] = useAtom(accessibilityFilterAtom);
  const [facilityType, setFacilityType] = useAtom(facilityTypeFilterAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearTags = () => {
    setSelectedTags([]);
  };

  const clearAllFilters = () => {
    setSelectedTags([]);
    setPriceFilter('all');
    setAccessibilityFilter('all');
    setFacilityType('all');
    setSearchQuery('');
  };

  const activeFilterCount = [
    selectedTags.length > 0,
    priceFilter !== 'all',
    accessibilityFilter !== 'all',
    facilityType !== 'all',
    searchQuery.trim() !== ''
  ].filter(Boolean).length;

  return {
    selectedTags,
    setSelectedTags,
    toggleTag,
    clearTags,
    priceFilter,
    setPriceFilter,
    accessibilityFilter,
    setAccessibilityFilter,
    clearAllFilters,
    activeFilterCount
  };
}
