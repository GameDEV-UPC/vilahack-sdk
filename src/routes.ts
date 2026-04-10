export const API_ROUTES = {
  USER: {
    GET: "/user/application",
    SIGNUP: "/user/application",
  },
  TEAM: {
    GET: "/team",
    LEAVE: "/team/leave",
    JOIN: (teamId: string) => `/team/join/${teamId}`,
    CREATE: (teamName: string) => `/team/${teamName}`,
  },
} as const;
