export * from "./types.js";

import type { Config } from "../../config.js";
import { getUserApplication } from "./getApplication.js";
import { submitUserApplication } from "./submitApplication.js";
import type {
  GetApplicationResponse,
  SubmitApplicationRequest,
  SubmitApplicationResponse,
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  ApplicationParams,
} from "./types.js";
import { updateUserApplication } from "./updateApplication.js";

export class ApplicationModule {
  constructor(private config: Config) {}

  public async get(data?: ApplicationParams): Promise<GetApplicationResponse> {
    return getUserApplication(this.config, data);
  }

  public async update(data: UpdateApplicationRequest): Promise<UpdateApplicationResponse> {
    return updateUserApplication(this.config, data);
  }

  public async submit(data: SubmitApplicationRequest): Promise<SubmitApplicationResponse> {
    return submitUserApplication(this.config, data);
  }
}
