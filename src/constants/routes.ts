export const ROUTES = {
  HOME: '/',
  LOGIN: '/(auth)/login',
  REGISTER: '/(auth)/register',
  WELCOME: '/(auth)/welcome',
  FORGOT_PASSWORD: '/(auth)/forgot_password',
  PROFILE: '/profile',

  EDIT_PROFILE: '/profile/edit',
  PRIVACY_POLICY: '/profile/privacy-policy',
  TERMS_OF_SERVICE: '/profile/terms-of-service',
  SUPPORT: '/profile/support',
  DATA_DELETION: '/profile/data_deletion',

  TEAM_GUIDE: '/team/guide',
  TEAM_CREATION: '/team/creation',
  TEAM_JOIN_UNIVERSITY: '/team/join_university',
  TEAM_JOIN_LIST: '/team/join_list',

  MATCH_MAKING: '/match_making/match_info',
  MEMBER_READY: '/member_ready',
  TEAMMATE_REGISTER: '/match_making/teammate_register',
  TEAM_FORMATION: '/match_making/team_formation',
  MATCH_APPLICATION: '/match_application',
  CHECK_CREATED_MATCHES: '/check_created_matches',
  CHECK_APPLIED_MATCHES: '/check_applied_matches',
  MATCH_SET: '/match_set',

  MERCENARY: '/mercenary',
  MERCENARY_CREATE: '/mercenary/create',
  MERCENARY_EDIT: '/mercenary/edit',
  MERCENARY_APPLY: '/mercenary/apply',

  TEAM_REVIEW: '/review/team_review',
  TOURNAMENT: '/tournament',

  LINEUP: '/match_application/lineup',
  CREATE_LINEUP: '/match_application/create_lineup',

  TABS: '/(tabs)',
  MATCH_INFO_TAB: '/(tabs)/match_info',
} as const;

export type RouteKey = keyof typeof ROUTES;

export const getTeamManagementUrl = (teamId: string | number) =>
  `/team/management/${teamId}`;
export const getTeamManagementSettingsUrl = (teamId: string) =>
  `/team/management/${teamId}/settings`;
export const getTeamManagementRecentMatchesUrl = (teamId: string) =>
  `/team/management/${teamId}/recent_matches`;
export const getTeamManagementEditUrl = (teamId: string | number) =>
  `/team/management/${teamId}/edit`;
export const getTeamManagementMembersUrl = (teamId: string | number) =>
  `/team/management/${teamId}/members`;
export const getTeamManagementMatchRequestsUrl = (teamId: string | number) =>
  `/team/management/${teamId}/match_requests`;
