export * from "./types.js";

import type { Config } from "../../config.js";
import { acceptAttendance } from "./acceptAttendance.js";
import { cancelAttendance } from "./cancelAttendance.js";
import { checkInAttendance } from "./checkInAttendance.js";
import { confirmAttendance } from "./confirmAttendance.js";
import type {
  AcceptAttendanceResponse,
  AttendanceParams,
  CancelAttendanceResponse,
  CheckInAttendanceResponse,
  ConfirmAttendanceResponse,
} from "./types.js";

export class AttendanceModule {
  constructor(private config: Config) {}

  public async checkIn(params: AttendanceParams): Promise<CheckInAttendanceResponse> {
    return checkInAttendance(this.config, params);
  }

  public async accept(params: AttendanceParams): Promise<AcceptAttendanceResponse> {
    return acceptAttendance(this.config, params);
  }

  public async confirm(): Promise<ConfirmAttendanceResponse> {
    return confirmAttendance(this.config);
  }

  public async cancel(): Promise<CancelAttendanceResponse> {
    return cancelAttendance(this.config);
  }
}
