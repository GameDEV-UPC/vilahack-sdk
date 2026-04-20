export * from "./types.js";

import type { Config } from "../config.js";
import { ApplicationModule } from "./application/index.js";
import { AttendanceModule } from "./attendance/index.js";
import { getUserQR } from "./getUserQR.js";
import type { UserQRParams, GetUserQRResponse } from "./types.js";

export class UserModule {
  public application: ApplicationModule;
  public attendance: AttendanceModule;

  constructor(private config: Config) {
    this.application = new ApplicationModule(this.config);
    this.attendance = new AttendanceModule(this.config);
  }

  public async getQR(data?: UserQRParams): Promise<GetUserQRResponse> {
    return getUserQR(this.config, data);
  }
}
