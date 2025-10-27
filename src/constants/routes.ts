export const ROUTES = {
  HOME: '/',
  LOGIN: '/(auth)/login',
  REGISTER: '/(auth)/register',
  PROFILE: '/profile',

  EDIT_PROFILE: '/profile/edit',
  PRIVACY_POLICY: '/profile/privacy-policy',
  TERMS_OF_SERVICE: '/profile/terms-of-service',
  SUPPORT: '/profile/support',
  DATA_DELETION: '/profile/data-deletion',

  TEAM_GUIDE: '/team/guide',
  TEAM_CREATION: '/team/creation',
  TEAM_JOIN_UNIVERSITY: '/team/join-university',
  TEAM_JOIN_LIST: '/team/join-list',

  MATCH_MAKING: '/match_making/match_info',
  MATCH_APPLICATION: '/match_application',
  CHECK_CREATED_MATCHES: '/check_created_matches',
  CHECK_APPLIED_MATCHES: '/check_applied_matches',
  MATCH_SET: '/match_set',

  TEAM_REVIEW: '/review/team_review',
  TOURNAMENT: '/tournament',
} as const;

export type RouteKey = keyof typeof ROUTES;

export const getTeamManagementUrl = (teamId: string | number) =>
  `/team/management/${teamId}`;
export const getTeamManagementSettingsUrl = (teamId: string) =>
  `/team/management/${teamId}/settings`;
export const getTeamManagementRecentMatchesUrl = (teamId: string) =>
  `/team/management/${teamId}/recent-matches`;
