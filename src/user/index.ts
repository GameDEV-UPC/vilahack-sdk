export * from "./types.js";

import type { Config } from "../config.js";
import { ApplicationModule } from "./application/index.js";
import { checkInUser } from "./checkInUser.js";
import { getUserQR } from "./getUserQR.js";
import type {
  CheckInUserResponse,
  UserQRRequest,
  GetUserQRResponse,
  CheckInUserRequest,
} from "./types.js";

export class UserModule {
  public application: ApplicationModule;

  constructor(private config: Config) {
    this.application = new ApplicationModule(this.config);
  }

  public async checkIn(data: CheckInUserRequest): Promise<CheckInUserResponse> {
    return checkInUser(this.config, data);
  }

  public async getQR(data?: UserQRRequest): Promise<GetUserQRResponse> {
    return getUserQR(this.config, data);
  }
}
