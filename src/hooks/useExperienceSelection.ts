import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { selectedExperienceAtom } from '@/lib/jotai/atoms';

interface UseExperienceSelectionOptions {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function useExperienceSelection({ containerRef }: UseExperienceSelectionOptions) {
  const [selectedExperience, setSelectedExperience] = useAtom(selectedExperienceAtom);

  useEffect(() => {
    if (selectedExperience && containerRef.current) {
      const selectedCard = containerRef.current.querySelector(
        `[data-experience-id="${selectedExperience.id}"]`
      );
      
      if (selectedCard) {
        selectedCard.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  }, [selectedExperience, containerRef]);

  return {
    selectedExperience,
    setSelectedExperience
  };
}
