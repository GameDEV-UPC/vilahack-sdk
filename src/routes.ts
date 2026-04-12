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
  PUZZLE: {
    GET: (puzzleId: string) => `/puzzle/${puzzleId}`,
    GET_ALL: "/puzzle/all",
    GET_ALL_BY_CATEGORY: "/puzzle/all/by_category",
  },
} as const;
