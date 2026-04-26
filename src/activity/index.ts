export * from "./types.js";

import type { Config } from "../config.js";
import { getActivity } from "./getActivity.js";
import { listAllActivities } from "./listAllActivities.js";
import type { ActivityParams, GetActivityResponse, ListActivitiesResponse } from "./types.js";

export class ActivityModule {
  constructor(private config: Config) {}

  public async get(params: ActivityParams): Promise<GetActivityResponse> {
    return getActivity(this.config, params);
  }

  public async list(): Promise<ListActivitiesResponse> {
    return listAllActivities(this.config);
  }
}
