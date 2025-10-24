
'use client';

import { useMapbox } from '@/hooks/useMapbox';
import { useMapMarkers } from '@/hooks/useMapMarkers';

export function MapView() {
  
  const { mapContainer, isMapLoaded, map } = useMapbox();
  
  useMapMarkers({ 
    map: map.current, 
    isMapLoaded 
  });

  return (
    <div className="relative h-full">
      <div 
        ref={mapContainer} 
        className="w-full h-full"
        style={{ minHeight: '400px' }}
      />
      
      <div className="absolute top-4 right-4 space-y-2">
        <div className="bg-white rounded-lg shadow-lg p-3">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              defaultChecked
              className="rounded border-gray-300 text-sydney-600 focus:ring-sydney-500"
            />
            Search as I move the map
          </label>
        </div>
      </div>

      {!isMapLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-sydney-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-sm text-gray-600">Map loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}
