import type { Config } from "./config.js";
import { PuzzleModule } from "./puzzle/index.js";
import { TeamModule } from "./team/index.js";
import { UserModule } from "./user/index.js";

export class VilahackClient {
  public user: UserModule;
  public team: TeamModule;
  public puzzle: PuzzleModule;

  constructor(private config: Config) {
    if (!config.baseUrl) throw new Error("[VILAHACK SDK] baseUrl is required");
    if (!config.getToken) throw new Error("[VILAHACK SDK] getToken is required");

    this.user = new UserModule(this.config);
    this.team = new TeamModule(this.config);
    this.puzzle = new PuzzleModule(this.config);
  }
}
