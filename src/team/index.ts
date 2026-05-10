export * from "./types.js";

import type { Config } from "../config.js";
import { createTeam } from "./createTeam.js";
import { getTeam } from "./getTeam.js";
import { joinTeam } from "./joinTeam.js";
import { leaveTeam } from "./leaveTeam.js";
import type {
  TeamParams,
  CreateTeamResponse,
  GetTeamResponse,
  JoinTeamParams,
  JoinTeamResponse,
  LeaveTeamResponse,
  UpdateTeamResponse,
  GetTeamParams,
} from "./types.js";
import { updateTeam } from "./updateTeam.js";

export class TeamModule {
  constructor(private config: Config) {}

  public async get(params?: GetTeamParams): Promise<GetTeamResponse> {
    return getTeam(this.config, params);
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
