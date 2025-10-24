import { useState, useEffect, useCallback } from 'react';
import { useAtom } from 'jotai';
import { experiencesAtom } from '@/lib/jotai/atoms';
import type { Experience } from '@/types/storyblok';

interface UseExperiencesOptions {
  isDraft?: boolean;
}

interface UseExperiencesReturn {
  experiences: Experience[];
  isLoading: boolean;
  error: string | null;
  isDraftMode: boolean;
  refetch: () => Promise<void>;
}

export function useExperiences({ isDraft = false }: UseExperiencesOptions = {}): UseExperiencesReturn {
  const [, setExperiences] = useAtom(experiencesAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDraftMode, setIsDraftMode] = useState(false);

  const transformData = (data: Record<string, unknown>[]): Experience[] => {
    return data.map((item: Record<string, unknown>, index: number) => ({
      id: String(item.id || item.name || `fallback-${index}`),
      title: String(item.title || ''),
      description: String(item.description || ''),
      image: item.image as Experience['image'],
      tags: Array.isArray(item.tags) ? item.tags as string[] : [],
      externalLink: item.externalLink as Experience['externalLink'],
      locationTag: String(item.locationTag || ''),
      coordinates: item.coordinates as Experience['coordinates'],
      amenities: Array.isArray(item.amenities) ? item.amenities as string[] : [],
      pricing: (item.pricing === 'Free' || item.pricing === 'Paid' || item.pricing === 'Mixed') 
        ? item.pricing as 'Free' | 'Paid' | 'Mixed'
        : 'Free' as const,
      accessibility: typeof item.accessibility === 'string' ? item.accessibility : undefined,
      facilityType: String(item.facilityType || ''),
      sportsFacilities: Array.isArray(item.sportsFacilities) 
        ? item.sportsFacilities.map((sport: Record<string, unknown>) => ({
            name: String(sport.name || ''),
            description: String(sport.description || ''),
            available: Boolean(sport.available)
          }))
        : [],
      owner: String(item.owner || ''),
      status: String(item.status || ''),
      url: String(item.url || ''),
      updatedAt: String(item.updatedAt || new Date().toISOString()),
      createdAt: String(item.createdAt || new Date().toISOString())
    }));
  };

  const loadExperiences = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (isDraft) {
        try {
          const response = await fetch('/api/experiences/draft');
          const draftResult = await response.json();
          
          if (response.ok && draftResult.experiences && draftResult.experiences.length > 0) {
            setExperiences(draftResult.experiences);
            setIsDraftMode(true);
            return;
          }
        } catch {
        }
      }

      try {
        const response = await fetch('/api/experiences');
        const result = await response.json();
        
        if (response.ok) {
          setExperiences(result.experiences);
          setIsDraftMode(false);
          return;
        }
      } catch {
      }

      try {
        const realData = await import('@/lib/sample-data.json');
        const data = realData.default || realData;
        const transformedData = transformData(data);
        setExperiences(transformedData);
        setIsDraftMode(false);
      } catch {
        const sampleData: Experience[] = [
          {
            id: '1',
            title: 'Lyons Road Park',
            description: 'A beautiful park with excellent facilities for various sports and recreational activities.',
            locationTag: 'Corner of Lyons Road and Lambert Street, Camperdown, 2050',
            tags: ['park'],
            amenities: ['Wifi', 'Kitchen', 'Free Parking'],
            pricing: 'Free' as const,
            image: {
              id: 1,
              filename: '/api/placeholder/64/64',
              alt: 'Lyons Road Park',
              name: 'lyons-road-park',
              focus: '',
              title: 'Lyons Road Park',
              copyright: '',
              fieldtype: 'asset',
              meta_data: {}
            },
            externalLink: { url: '#', linktype: 'url' as const, id: '1', fieldtype: 'link' },
            coordinates: { lat: -33.8885, lng: 151.1873 },
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString()
          }
        ];
        setExperiences(sampleData);
        setIsDraftMode(false);
      }
    } catch {
      setError('Failed to load facilities. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [isDraft, setExperiences]);

  useEffect(() => {
    loadExperiences();
  }, [loadExperiences]);

  return {
    experiences: [],
    isLoading,
    error,
    isDraftMode,
    refetch: loadExperiences
  };
}
