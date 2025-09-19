export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  MY_PAGE: '/my',
  TEAM_MANAGEMENT: '/team/management/:teamId',
  TEAM_MANAGEMENT_SETTINGS: '/team/management/:teamId/settings',
  TEAM_MANAGEMENT_RECENT_MATCHES: '/team/management/:teamId/recent-matches',
  TEAM_CREATION: '/team/creation',
  TEAM_JOIN_LIST: '/team/join-list',
  TEAM_GUIDE: '/team/guide',
  NOT_FOUND: '*',
} as const;

export function getTeamManagementUrl(teamId: string | number) {
  return ROUTES.TEAM_MANAGEMENT.replace(':teamId', String(teamId));
}

export function getTeamManagementSettingsUrl(teamId: string | number) {
  return ROUTES.TEAM_MANAGEMENT_SETTINGS.replace(':teamId', String(teamId));
}

export function getTeamManagementRecentMatchesUrl(teamId: string | number) {
  return ROUTES.TEAM_MANAGEMENT_RECENT_MATCHES.replace(
    ':teamId',
    String(teamId)
  );
}

export function getTeamApiUrl(teamId: string | number) {
  return `/api/teams/${teamId}`;
}
