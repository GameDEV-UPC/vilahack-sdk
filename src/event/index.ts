export * from "./types.js";

import type { Config } from "../config.js";
import { listAllEvents } from "./listAllEvents.js";
import { participateEvent } from "./participateEvent.js";
import type {
  ListEventsResponse,
  ParticipateEventParams,
  ParticipateEventResponse,
} from "./types.js";

export class EventModule {
  constructor(private config: Config) {}

  public async listAll(): Promise<ListEventsResponse> {
    return listAllEvents(this.config);
  }

  public async participate(params: ParticipateEventParams): Promise<ParticipateEventResponse> {
    return participateEvent(this.config, params);
  }
}
