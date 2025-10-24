import { useAtom } from 'jotai';
import { facilityTypeFilterAtom } from '@/lib/jotai/atoms';

interface FacilityType {
  value: string;
  label: string;
}

interface UseFacilityFilterReturn {
  facilityType: string;
  setFacilityType: (type: string) => void;
  facilityTypes: FacilityType[];
}

export function useFacilityFilter(): UseFacilityFilterReturn {
  const [facilityType, setFacilityType] = useAtom(facilityTypeFilterAtom);

  const facilityTypes: FacilityType[] = [
    { value: 'all', label: 'All types of facilities' },
    { value: 'park', label: 'Parks' },
    { value: 'sports-center', label: 'Sports Centers' },
    { value: 'swimming-pool', label: 'Swimming Pools' },
    { value: 'tennis-court', label: 'Tennis Courts' },
    { value: 'basketball-court', label: 'Basketball Courts' },
    { value: 'football-field', label: 'Football Fields' },
    { value: 'gym', label: 'Gyms' },
    { value: 'recreation-center', label: 'Recreation Centers' },
  ];

  return {
    facilityType,
    setFacilityType,
    facilityTypes
  };
}
