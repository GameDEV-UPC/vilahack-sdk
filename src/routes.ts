export const API_ROUTES = {
  USER: {
    GET: "/user/application",
    SIGNUP: "/user/application",
    UPDATE: "/user/application/update",
    CHECKIN: "/user/check_in",
    QR: "/user/qr.svg",
  },
  TEAM: {
    GET: "/team",
    LEAVE: "/team/leave",
    JOIN: (teamId: string) => `/team/join/${teamId}`,
    CREATE: (teamName: string) => `/team/${teamName}`,
    UPDATE: (newName: string) => `/team/update/${newName}`,
  },
  PUZZLE: {
    GET: (puzzleId: string) => `/puzzle/${puzzleId}`,
    GET_ALL: "/puzzle/all",
    GET_ALL_BY_CATEGORY: "/puzzle/all/by_category",
  },
} as const;
