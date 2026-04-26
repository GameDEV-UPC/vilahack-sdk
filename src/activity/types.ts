import type { GlobalError, ServiceResponse } from "../types.js";

export interface Activity {
  id: string;
  start: string;
  end: string;
  description: string;
}

export interface ActivityParams {
  id: string;
}

export type GetActivityErrorCode = GlobalError | "ACTIVITY_NOT_FOUND";
export type ListActivitiesErrorCode = GlobalError;

export type GetActivityResponse = ServiceResponse<Activity, GetActivityErrorCode>;
export type ListActivitiesResponse = ServiceResponse<Activity[], ListActivitiesErrorCode>;
