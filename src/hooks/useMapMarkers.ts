import { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { 
  filteredExperiencesAtom,
  selectedExperienceAtom 
} from '@/lib/jotai/atoms';
import type { Experience } from '@/types/storyblok';

interface UseMapMarkersOptions {
  map: mapboxgl.Map | null;
  isMapLoaded: boolean;
}

export function useMapMarkers({ map, isMapLoaded }: UseMapMarkersOptions) {
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [experiences] = useAtom(filteredExperiencesAtom);
  const [selectedExperience, setSelectedExperience] = useAtom(selectedExperienceAtom);

  useEffect(() => {
    if (!map || !isMapLoaded) return;

    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    experiences.forEach((experience: Experience) => {
      if (!experience.coordinates) return;

      const marker = new window.mapboxgl.Marker({
        color: selectedExperience?.id === experience.id ? '#0ea5e9' : '#3b82f6'
      })
        .setLngLat([experience.coordinates.lng, experience.coordinates.lat])
        .addTo(map);

      marker.getElement().addEventListener('click', () => {
        setSelectedExperience(experience);
      });

      markers.current.push(marker);
    });
  }, [experiences, isMapLoaded, selectedExperience, map, setSelectedExperience]);

  return {
    markers: markers.current
  };
}
