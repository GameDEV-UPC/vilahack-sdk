export * from "./types.js";

import type { Config } from "../config.js";
import { createTeam } from "./createTeam.js";
import { getTeam } from "./getTeam.js";
import { joinTeam } from "./joinTeam.js";
import { leaveTeam } from "./leaveTeam.js";
import type {
  CreateTeamResponse,
  GetTeamResponse,
  JoinTeamResponse,
  LeaveTeamResponse,
} from "./types.js";

export class TeamModule {
  constructor(private config: Config) {}

  public async get(): Promise<GetTeamResponse> {
    return getTeam(this.config);
  }

  public async leave(): Promise<LeaveTeamResponse> {
    return leaveTeam(this.config);
  }

  public async create(teamName: string): Promise<CreateTeamResponse> {
    return createTeam(this.config, teamName);
  }

  public async join(teamName: string): Promise<JoinTeamResponse> {
    return joinTeam(this.config, teamName);
  }
}
