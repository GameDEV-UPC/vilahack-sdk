import type { GlobalError } from "../types.js";

export interface TeamResponse {
  name: string;
  id: string;
  members: string[];
}

export type CreateTeamError = GlobalError | "TEAM_ALREADY_EXISTS";

export type GetTeamError = GlobalError | "TEAM_NOT_FOUND";

export type JoinTeamError = GlobalError | "TEAM_NOT_FOUND" | "ALREADY_IN_TEAM" | "TEAM_FULL";

export type LeaveTeamError = GlobalError | "NOT_ON_TEAM";

export type CreateTeamResponse =
  | { success: true; data: string }
  | { success: false; code: CreateTeamError; message?: string };

export type GetTeamResponse =
  | { success: true; data: TeamResponse }
  | { success: false; code: GetTeamError; message?: string };

export type JoinTeamResponse =
  | { success: true; data: TeamResponse }
  | { success: false; code: JoinTeamError; message?: string };

export type LeaveTeamResponse =
  | { success: true }
  | { success: false; code: LeaveTeamError; message?: string };
