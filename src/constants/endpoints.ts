export const AUTH_API = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  LOGOUT_ALL: '/api/auth/logout-all',
  REFRESH: '/api/auth/refresh',
  REGISTER: '/api/auth/register',
  VERIFY_EMAIL: '/api/auth/verify-email',
  SEND_VERIFICATION: '/api/auth/send-verification',
  SEND_CODE: '/api/auth/signup/email/send-code',
  VERIFY_CODE: '/api/auth/signup/email/verify-code',
};

export const PASSWORD_RESET_API = {
  SEND_CODE: '/api/password-reset/send-code',
  VERIFY_CODE: '/api/password-reset/verify-code',
  CONFIRM: '/api/password-reset/confirm',
};

export const PROFILE_API = {
  GET_PROFILE: '/api/profiles/me',
  UPDATE_PROFILE: '/api/profiles/me',
  DELETE_PROFILE: '/api/profiles/me',
  GET_PROFILE_BY_ID: (id: string | number) => `/api/profiles/${id}`,
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
  GET_MEMBERS_SLICE: (
    teamId: string | number,
    cursorId?: number,
    size: number = 10
  ) => {
    const query = new URLSearchParams();
    if (cursorId !== undefined) query.append('cursorId', String(cursorId));
    query.append('size', String(size));
    return `/api/teams/${teamId}/users/slice?${query.toString()}`;
  },
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

export const TEAM_REVIEW_API = {
  CREATE: '/api/team-reviews',
  DETAIL: (id: number | string) => `/api/team-reviews/${id}`,
  LIST: (reviewedTeamId: number | string) =>
    `/api/team-reviews?reviewedTeamId=${reviewedTeamId}`,
};

export const MATCH_CREATE_API = {
  CREATE: '/api/matches',
};

export const MATCH_WAITING_API = {
  GET_WAITING_LIST: '/api/matches/waiting',
  GET_WAITING_LIST_BY_TEAM: (teamId: string | number) =>
    `/api/matches/waiting?teamId=${teamId}`,
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
  GET_ENEMY_TEAM: (matchId: string | number) =>
    `/api/matches/${matchId}/enemyTeam`,
};

export const USER_JOIN_WAITING_API = {
  GET_MY_JOIN_WAITING: (
    page: number = 0,
    size: number = 10,
    sort: string = 'audit.createdAt,desc',
    isMercenary: boolean = false
  ) =>
    `/api/users/me/join-waiting?page=${page}&size=${size}&sort=${sort}&isMercenary=${isMercenary}`,
};

export const MERCENARY_API = {
  GET_RECRUITMENTS: '/api/mercenaries/recruitments',
  GET_RECRUITMENT_BY_ID: (id: number) => `/api/mercenaries/recruitments/${id}`,
  GET_MY_RECRUITMENTS: '/api/mercenaries/recruitments/me',
  CREATE_RECRUITMENT: '/api/mercenaries/recruitments',
  UPDATE_RECRUITMENT: (id: number) => `/api/mercenaries/recruitments/${id}`,
  DELETE_RECRUITMENT: (id: number) => `/api/mercenaries/recruitments/${id}`,
};

export const LINEUP_API = {
  CREATE: '/api/lineups',
  GET_LINEUP: (lineupId: number | string) => `/api/lineups/${lineupId}`,
};
