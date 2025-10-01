import { useQuery } from '@tanstack/react-query';

import { getVenues } from '@/src/api/venue';
import type { Venue } from '@/src/types/venue';

export const useVenues = () => {
  return useQuery<Venue[], Error>({
    queryKey: ['venues'],
    queryFn: getVenues,
  });
};
