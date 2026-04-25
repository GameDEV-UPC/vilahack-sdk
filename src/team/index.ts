export * from "./types.js";

import type { Config } from "../config.js";
import { createTeam } from "./createTeam.js";
import { getTeam } from "./getTeam.js";
import { joinTeam } from "./joinTeam.js";
import { getLeaderboard } from "./leaderboardTeam.js";
import { leaveTeam } from "./leaveTeam.js";
import type {
  TeamParams,
  CreateTeamResponse,
  GetLeaderboardResponse,
  GetTeamResponse,
  JoinTeamParams,
  JoinTeamResponse,
  LeaveTeamResponse,
  UpdateTeamResponse,
} from "./types.js";
import { updateTeam } from "./updateTeam.js";

export class TeamModule {
  constructor(private config: Config) {}

  public async get(): Promise<GetTeamResponse> {
    return getTeam(this.config);
  }

  public async leaderboard(): Promise<GetLeaderboardResponse> {
    return getLeaderboard(this.config);
  }

  public async leave(): Promise<LeaveTeamResponse> {
    return leaveTeam(this.config);
  }

  public async create(params: TeamParams): Promise<CreateTeamResponse> {
    return createTeam(this.config, params);
  }

  public async join(params: JoinTeamParams): Promise<JoinTeamResponse> {
    return joinTeam(this.config, params);
  }

  public async update(params: TeamParams): Promise<UpdateTeamResponse> {
    return updateTeam(this.config, params);
  }
}
