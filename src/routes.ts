export const API_ROUTES = {
  USER: {
    APPLICATION: {
      GET: "/user/application",
      SUBMIT: "/user/application",
      UPDATE: "/user/application/update",
      LIST: {
        SUMMARIES: "/user/application/index",
      },
    },
    ATTENDANCE: {
      CHECKIN: "/user/attendance/check_in",
      ACCEPT: "/user/attendance/accept",
      CONFIRM: "/user/attendance/confirm",
      CANCEL: "/user/attendance/cancel",
    },
    QR: "/user/qr.svg",
  },
  TEAM: {
    GET: "/team",
    LEAVE: "/team/leave",
    JOIN: "/team/join",
    CREATE: "/team/create",
    UPDATE: "/team/update",
  },
  PUZZLE: {
    GET: "/puzzle",
    LIST: {
      ALL: "/puzzle/all",
      BY_CATEGORY: "/puzzle/all/by_category",
    },
    SOLVE: "/puzzle/solve",
    FILES: "/puzzle/files",
    CLUE: {
      NEXT: "/puzzle/clue/next",
    },
  },
  LEADERBOARD: {
    GET: "/leaderboard",
  },
  EVENT: {
    GET: "/event",
    LIST: {
      ALL: "/event/all",
    },
    PARTICIPATION: {
      SUBMIT: "/event/participation",
      LIST: "/event/participation/all",
    },
  },
} as const;
