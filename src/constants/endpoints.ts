export const AUTH_API = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  LOGOUT_ALL: '/api/auth/logout-all',
  REFRESH: '/api/auth/refresh',
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
  EXIT_TEAM: (teamId: string | number) => `/api/teams/${teamId}/users/me`,
  GET_JOIN_REQUESTS: (teamId: string | number) =>
    `/api/teams/${teamId}/joinRequests`,
  GET_JOIN_WAITING_LIST: (teamId: string | number) =>
    `/api/teams/${teamId}/join-waiting`,
  JOIN_WAITING: (teamId: string | number) =>
    `/api/teams/${teamId}/join-waiting`,
  APPROVE_JOIN_REQUEST: (teamId: string | number, requestId: string | number) =>
    `/api/teams/${teamId}/join-waiting/${requestId}/approve`,
  REJECT_JOIN_REQUEST: (teamId: string | number, requestId: string | number) =>
    `/api/teams/${teamId}/join-waiting/${requestId}/reject`,
  CANCEL_JOIN_REQUEST: (
    teamId: string | number,
    joinWaitingId: string | number
  ) => `/api/teams/${teamId}/join-waiting/${joinWaitingId}/cancel`,
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
  DELEGATE_LEADERSHIP: (teamId: string | number, memberId: string | number) =>
    `/api/teams/${teamId}/members/${memberId}/delegate-leadership`,
};

export const TEAM_MATCH_API = {
  GET_TEAM_RECENT_MATCHES: () => `/api/teams/me/matches`,
  GET_TEAM_MATCH_REQUESTS: () => `/api/matches/receive/me/pending`,
  UPDATE_MATCH_REQUEST: (teamId: string | number, requestId: string | number) =>
    `/api/teams/${teamId}/match-requests/${requestId}`,
};

export const MATCH_CREATE_API = {
  CREATE: '/api/matches',
};

export const MATCH_WAITING_API = {
  GET_WAITING_LIST: '/api/matches/waiting',
  GET_MY_CREATED_MATCHES: '/api/matches/waiting/me',
  CANCEL_WAITING: (waitingId: string | number) =>
    `/api/matches/waiting/${waitingId}/cancel`,
};

export const VENUE_API = {
  GET_VENUES: '/api/venues',
};

export const MATCH_REQUEST_API = {
  MATCH_REQUEST: (waitingId: string | number) =>
    `/api/matches/${waitingId}/request`,
  ACCEPT_REQUEST: (requestId: string | number) =>
    `/api/matches/requests/${requestId}/accept`,
  REJECT_REQUEST: (requestId: string | number) =>
    `/api/matches/requests/${requestId}/reject`,
  CANCEL_REQUEST: (requestId: string | number) =>
    `/api/matches/requests/${requestId}`,
  GET_MY_APPLIED_MATCHES: '/api/matches/requests/me',
};

export const USER_JOIN_WAITING_API = {
  GET_MY_JOIN_WAITING: (
    page: number = 0,
    size: number = 10,
    sort: string = 'createdAt,desc'
  ) => `/api/users/me/join-waiting?page=${page}&size=${size}&sort=${sort}`,
};
