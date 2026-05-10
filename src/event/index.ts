export * from "./types.js";

import type { Config } from "../config.js";
import { getEvent } from "./getEvent.js";
import { listAllEvents } from "./listAllEvents.js";
import { ParticipationModule } from "./participation/index.js";
import type { GetEventParams, ListEventsResponse } from "./types.js";

export class EventModule {
  public participation: ParticipationModule;
  constructor(private config: Config) {
    this.participation = new ParticipationModule(this.config);
  }

  public async get(params: GetEventParams) {
    return getEvent(this.config, params);
  }

  public async list(): Promise<ListEventsResponse> {
    return listAllEvents(this.config);
  }
}
