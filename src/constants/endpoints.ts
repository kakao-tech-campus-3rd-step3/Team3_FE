export const AUTH_API = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/auth/logout',
  REGISTER: '/api/auth/register',
  VERIFY_EMAIL: '/api/auth/verify-email',
  SEND_VERIFICATION: '/api/auth/send-verification',
};

export const PROFILE_API = {
  GET_PROFILE: '/api/profiles/me',
  UPDATE_PROFILE: '/api/profiles/me',
  DELETE_PROFILE: '/api/profiles/me',
};

export const RECOMMENDED_MATCH_API = {
  GET_RECOMMENDED_MATCH: '/recommendedMatch',
};

export const TEAM_API = {
  CREATE: '/api/teams',
  DETAIL: (teamId: string | number) => `/api/teams/${teamId}`,
  UPDATE: (teamId: string | number) => `/api/teams/${teamId}`,
  DELETE: (teamId: string | number) => `/api/teams/${teamId}`,
  GET_UNIVERSITY_LIST: '/api/universities',
  GET_TEAMS_BY_UNIVERSITY: '/api/teams',
  JOIN_TEAM: '/api/teams/join',
  GET_JOIN_REQUESTS: (teamId: string | number) =>
    `/api/teams/${teamId}/joinRequests`,
  GET_JOIN_WAITING_LIST: (teamId: string | number) =>
    `/api/teams/${teamId}/join-waiting`,
};

export const TEAM_MEMBER_API = {
  GET_MEMBERS: (teamId: string | number, page: number = 0, size: number = 10) =>
    `/api/teams/${teamId}/users?page=${page}&size=${size}`,
  GET_MEMBER: (teamId: string | number, userId: string | number) =>
    `/api/teams/${teamId}/users/${userId}`,
  UPDATE_ROLE: (teamId: string | number, userId: string | number) =>
    `/api/teams/${teamId}/users/${userId}`,
  REMOVE_MEMBER: (teamId: string | number, userId: string | number) =>
    `/api/teams/${teamId}/users/${userId}`,
};

export const TEAM_MATCH_API = {
  GET_TEAM_RECENT_MATCHES: (teamId: string | number) =>
    `/api/teams/${teamId}/matches`,
};

export const MATCH_CREATE_API = {
  CREATE: '/api/matches',
};

export const MATCH_WAITING_API = {
  GET_WAITING_LIST: '/api/matches/waiting',
};

export const VENUE_API = {
  GET_VENUES: '/api/venues',
};

export const MATCH_REQUEST_API = {
  MATCH_REQUEST: (waitingId: string | number) =>
    `/api/matches/${waitingId}/request`,
};
