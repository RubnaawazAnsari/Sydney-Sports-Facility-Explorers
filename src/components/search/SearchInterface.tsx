

'use client';

import { useAtom } from 'jotai';
import { selectedLocationAtom } from '@/lib/jotai/atoms';
import { cn } from '@/lib/utils';
import { useLocationSearch } from '@/hooks/useLocationSearch';
import { useFacilityFilter } from '@/hooks/useFacilityFilter';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useAdvancedFilters } from '@/hooks/useAdvancedFilters';
import { useState } from 'react';

export function SearchInterface() {
  const [selectedLocation] = useAtom(selectedLocationAtom);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  const {
    searchQuery,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    isSearching,
    handleSearchChange,
    handleLocationSelect
  } = useLocationSearch();
  
  const { facilityType, setFacilityType, facilityTypes } = useFacilityFilter();
  
  const { 
    isSupported: isGeolocationSupported, 
    isLoading: isGeolocationLoading, 
    error: geolocationError, 
    getCurrentPosition, 
    clearError: clearGeolocationError 
  } = useGeolocation();
  
  const {
    selectedTags,
    toggleTag,
    clearTags,
    priceFilter,
    setPriceFilter,
    accessibilityFilter,
    setAccessibilityFilter,
    clearAllFilters,
    activeFilterCount
  } = useAdvancedFilters();

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search for name or suburb"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sydney-500 focus:border-sydney-500 transition-colors"
            />
            
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {isSearching ? (
                <div className="w-5 h-5 border-2 border-sydney-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </div>
          </div>
          
          <button
            onClick={() => handleLocationSelect(searchQuery)}
            disabled={!searchQuery.trim()}
            className="bg-sydney-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-sydney-700 focus:ring-2 focus:ring-sydney-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Search
          </button>
          
          {isGeolocationSupported && (
            <button
              onClick={getCurrentPosition}
              disabled={isGeolocationLoading}
              className="bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              title="Use my current location"
            >
              {isGeolocationLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
              <span className="hidden sm:inline">
                {isGeolocationLoading ? 'Getting location...' : 'My Location'}
              </span>
            </button>
          )}
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleLocationSelect(suggestion)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        {facilityTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => setFacilityType(type.value)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              facilityType === type.value
                ? "bg-sydney-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            {type.label}
          </button>
        ))}
        
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            showAdvancedFilters
              ? "bg-sydney-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          )}
        >
          {showAdvancedFilters ? 'Hide Filters' : 'More Filters'}
          {activeFilterCount > 0 && (
            <span className="ml-1 bg-white text-sydney-600 rounded-full px-1.5 py-0.5 text-xs">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {showAdvancedFilters && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Advanced Filters</h3>
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-sydney-600 hover:text-sydney-700 font-medium"
              >
                Clear all
              </button>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">Price</label>
            <div className="flex gap-2">
              {[
                { value: 'all', label: 'All' },
                { value: 'free', label: 'Free' },
                { value: 'paid', label: 'Paid' },
                { value: 'mixed', label: 'Mixed' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setPriceFilter(option.value)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                    priceFilter === option.value
                      ? "bg-sydney-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">Accessibility</label>
            <div className="flex gap-2">
              {[
                { value: 'all', label: 'All' },
                { value: 'accessible', label: 'Accessible' },
                { value: 'not-accessible', label: 'Not Accessible' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setAccessibilityFilter(option.value)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                    accessibilityFilter === option.value
                      ? "bg-sydney-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">Tags</label>
            <div className="flex gap-2 flex-wrap">
              {[
                'swimming', 'tennis', 'basketball', 'football', 'cricket', 'gym', 'park', 'recreation',
                'fitness', 'outdoor', 'indoor', 'sports', 'leisure', 'community'
              ].map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                    selectedTags.includes(tag)
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  {tag}
                  {selectedTags.includes(tag) && (
                    <span className="ml-1">✓</span>
                  )}
                </button>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <button
                onClick={clearTags}
                className="mt-2 text-xs text-sydney-600 hover:text-sydney-700 font-medium"
              >
                Clear tags
              </button>
            )}
          </div>
        </div>
      )}

      {geolocationError && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="flex-1">{geolocationError}</span>
          <button
            onClick={clearGeolocationError}
            className="text-red-600 hover:text-red-700"
            title="Dismiss error"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {selectedLocation && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Searching near: {selectedLocation}</span>
        </div>
      )}
    </div>
  );
}
