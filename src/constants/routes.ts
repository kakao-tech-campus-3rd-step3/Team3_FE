export const ROUTES = {
  HOME: '/',
  HOME_TABS: '/(tabs)',
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

  MERCENARY: '/mercenary',

  TOURNAMENT: '/tournament',
} as const;

export type RouteKey = keyof typeof ROUTES;

export const getTeamManagementSettingsUrl = (teamId: string) =>
  `/team/management/${teamId}/settings`;
export const getTeamManagementRecentMatchesUrl = (teamId: string) =>
  `/team/management/${teamId}/recent-matches`;
export const getTeamManagementEditUrl = (teamId: string) =>
  `/team/management/${teamId}/edit`;
export const getTeamManagementMembersUrl = (teamId: string) =>
  `/team/management/${teamId}/members`;
