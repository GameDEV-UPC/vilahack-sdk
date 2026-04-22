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
    GET_ALL: "/puzzle/all",
    GET_ALL_BY_CATEGORY: "/puzzle/all/by_category",
  },
} as const;
