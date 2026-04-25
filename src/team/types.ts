import type { GlobalError, ServiceResponse } from "../types.js";

export interface Team {
  name: string;
  id: string;
  members: string[];
}

export interface TeamParams {
  name: string;
}
export interface JoinTeamParams {
  id: string;
}

export type CreateTeamErrorCode = GlobalError | "TEAM_ALREADY_EXISTS";
export type GetTeamErrorCode = GlobalError | "TEAM_NOT_FOUND";
export type JoinTeamErrorCode = GlobalError | "TEAM_NOT_FOUND" | "ALREADY_IN_TEAM" | "TEAM_FULL";
export type LeaveTeamErrorCode = GlobalError | "NOT_ON_TEAM";
export type UpdateTeamErrorCode = GlobalError | "TEAM_ALREADY_EXISTS";

export type CreateTeamResponse = ServiceResponse<string, CreateTeamErrorCode>;
export type GetTeamResponse = ServiceResponse<Team, GetTeamErrorCode>;
export type JoinTeamResponse = ServiceResponse<Team, JoinTeamErrorCode>;
export type LeaveTeamResponse = ServiceResponse<void, LeaveTeamErrorCode>;
export type UpdateTeamResponse = ServiceResponse<void, UpdateTeamErrorCode>;
