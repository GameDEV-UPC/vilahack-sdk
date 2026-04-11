import type { Config } from "../config.js";
import { createTeam } from "./createTeam.js";
import { getTeam } from "./getTeam.js";
import { joinTeam } from "./joinTeam.js";
import { leaveTeam } from "./leaveTeam.js";

export class TeamModule {
  constructor(private config: Config) {}

  public async getTeam() {
    return getTeam(this.config);
  }

  public async leaveTeam() {
    return leaveTeam(this.config);
  }

  public async createTeam(teamName: string) {
    return createTeam(this.config, teamName);
  }

  public async joinTeam(teamName: string) {
    return joinTeam(this.config, teamName);
  }
}
