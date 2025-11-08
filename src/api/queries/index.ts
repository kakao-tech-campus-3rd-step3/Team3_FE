import { authQueries } from './auth/queries';
import { lineupQueries } from './lineup/queries';
import { matchQueries } from './match/queries';
import { mercenaryQueries } from './mercenary/queries';
import { profileQueries } from './profile/queries';
import { reviewQueries } from './review/queries';
import { teamQueries } from './team/queries';

// Export all queries
export { authQueries } from './auth/queries';
export { profileQueries } from './profile/queries';
export { teamQueries } from './team/queries';
export { matchQueries } from './match/queries';
export { lineupQueries } from './lineup/queries';
export { mercenaryQueries } from './mercenary/queries';
export { reviewQueries } from './review/queries';

// Export all queries combined
export const queries = {
  ...authQueries,
  ...profileQueries,
  ...teamQueries,
  ...matchQueries,
  ...lineupQueries,
  ...mercenaryQueries,
  ...reviewQueries,
} as const;

// Export all mutations and query hooks
export * from './auth/mutations';
export * from './profile/mutations';
export * from './team/mutations';
export * from './match/mutations';
export * from './lineup/mutations';
export * from './mercenary/mutations';
export * from './review/mutations';
