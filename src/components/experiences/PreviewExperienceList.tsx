'use client';

import { useAtom } from 'jotai';
import { filteredExperiencesAtom, selectedExperienceAtom } from '@/lib/jotai/atoms';
import { ExperienceCard } from './ExperienceCard';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { EmptyState } from './EmptyState';
import { useExperiences } from '@/hooks/useExperiences';

export function PreviewExperienceList() {
  const [filteredExperiences] = useAtom(filteredExperiencesAtom);
  const [selectedExperience, setSelectedExperience] = useAtom(selectedExperienceAtom);
  
  const { isLoading, error, isDraftMode } = useExperiences({ isDraft: true });

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (filteredExperiences.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="p-4">

      {isDraftMode && (
        <div className="mb-4 p-3 bg-blue-100 border border-blue-300 rounded-lg">
          <div className="flex items-center gap-2 text-blue-800">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Draft Content</span>
            <span className="text-sm">- Showing unpublished changes from Storyblok</span>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {filteredExperiences.map((experience) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            isSelected={selectedExperience?.id === experience.id}
            onClick={() => setSelectedExperience(experience)}
          />
        ))}
      </div>
    </div>
  );
}
