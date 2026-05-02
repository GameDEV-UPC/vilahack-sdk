export * from "./types.js";

import type { Config } from "../../config.js";
import { listAllPaticpations } from "./listAllParticipations.js";
import { submitParticipation } from "./submitParticipation.js";
import type {
  ListParticipationParams,
  ListParticipationResponse,
  SubmitParticipationParams,
  SubmitParticipationResponse,
} from "./types.js";

export class ParticipationModule {
  constructor(private config: Config) {}

  public async submit(params: SubmitParticipationParams): Promise<SubmitParticipationResponse> {
    return submitParticipation(this.config, params);
  }

  public async list(params?: ListParticipationParams): Promise<ListParticipationResponse> {
    return listAllPaticpations(this.config, params);
  }
}
