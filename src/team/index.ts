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
  UpdateTeamResponse,
} from "./types.js";
import { updateTeam } from "./updateTeam.js";

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

  public async join(teamId: string): Promise<JoinTeamResponse> {
    return joinTeam(this.config, teamId);
  }

  public async update(newName: string): Promise<UpdateTeamResponse> {
    return updateTeam(this.config, newName);
  }
}
