import axios from 'axios';

import { VENUE_API } from '@/src/constants/endpoints';
import type { Venue } from '@/src/types/venue';

interface VenuePage {
  content: Venue[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export const getVenues = async (): Promise<Venue[]> => {
  const { data } = await axios.get<VenuePage>(VENUE_API.GET_VENUES, {
    baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  });
  return data.content;
};
