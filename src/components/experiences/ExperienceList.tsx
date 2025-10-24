
'use client';

import { useRef } from 'react';
import { useAtom } from 'jotai';
import { filteredExperiencesAtom } from '@/lib/jotai/atoms';
import { ExperienceCard } from './ExperienceCard';
import { EmptyState } from './EmptyState';
import { cn } from '@/lib/utils';
import { useExperiences } from '@/hooks/useExperiences';
import { useGsapAnimation } from '@/hooks/useGsapAnimation';
import { useExperienceSelection } from '@/hooks/useExperienceSelection';

export function ExperienceList() {
  const [filteredExperiences] = useAtom(filteredExperiencesAtom);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { isLoading, error } = useExperiences();
  const { selectedExperience, setSelectedExperience } = useExperienceSelection({ containerRef });
  
  useGsapAnimation({ 
    items: filteredExperiences, 
    containerRef 
  });

  
  if (isLoading) {
    return (
      <div className="h-full flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 bg-white">
          <h2 className="text-lg font-semibold text-gray-900">Loading facilities...</h2>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="p-6 space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-pulse">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  
  if (error) {
    return (
      <div className="h-full flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 bg-white">
          <h2 className="text-lg font-semibold text-gray-900">Error loading facilities</h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-sydney-600 text-white px-4 py-2 rounded-lg hover:bg-sydney-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  
  if (filteredExperiences.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {filteredExperiences.length}+ facilities found
          </h2>
          
          {selectedExperience && (
            <button
              onClick={() => setSelectedExperience(null)}
              className="text-sm text-sydney-600 hover:text-sydney-700 font-medium"
            >
              Clear selection
            </button>
          )}
        </div>
      </div>

      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto scrollbar-thin"
      >
        <div className="p-6 space-y-4">
          {filteredExperiences.map((experience) => (
            <div
              key={experience.id}
              data-experience-id={experience.id}
              className={cn(
                "experience-card transition-all duration-200",
                selectedExperience?.id === experience.id
                  ? "ring-2 ring-sydney-500 ring-offset-2"
                  : ""
              )}
            >
              <ExperienceCard
                experience={experience}
                isSelected={selectedExperience?.id === experience.id}
                onClick={() => setSelectedExperience(experience)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
