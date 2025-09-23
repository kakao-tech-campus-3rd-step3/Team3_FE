export const AUTH_API = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
};

export const PROFILE_API = {
  GET_PROFILE: '/profile',
};

export const HOME_API = {
  GET_HOME: '/home',
};

export const RECOMMENDED_MATCH_API = {
  GET_RECOMMENDED_MATCH: '/recommendedMatch',
};

export const TEAM_API = {
  CREATE: '/teams',
  DETAIL: (teamId: string | number) => `/teams/${teamId}`,
  UPDATE: (teamId: string | number) => `/teams/${teamId}`,
  DELETE: (teamId: string | number) => `/teams/${teamId}`,
  GET_UNIVERSITY_LIST: '/universities',
  GET_TEAMS_BY_UNIVERSITY: '/teams',
  JOIN_TEAM: '/teams/join',
  GET_JOIN_REQUESTS: (teamId: string | number) =>
    `/teams/${teamId}/joinRequests`,
};

export const TEAM_MEMBER_API = {
  GET_MEMBERS: (teamId: string | number) => `/teamMembers?teamId=${teamId}`,
  UPDATE_ROLE: (memberId: number) => `/teamMembers/${memberId}`,
  REMOVE_MEMBER: (memberId: number) => `/teamMembers/${memberId}`,
};

export const TEAM_REVIEW_API = {
  GET_REVIEWS: (teamId: string | number) => `/teamReviews?teamId=${teamId}`,
};

export const TEAM_MATCH_API = {
  GET_TEAM_RECENT_MATCHES: (teamId: string | number) =>
    `/teamMatches?teamId=${teamId}`,
};
