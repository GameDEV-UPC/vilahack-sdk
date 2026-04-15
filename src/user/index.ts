export * from "./types.js";

import type { Config } from "../config.js";
import { checkInUser } from "./checkInUser.js";
import { getQR } from "./getQr.js";
import { getUser } from "./getUser.js";
import { signUp } from "./signUp.js";
import { getApplicationsIndex } from "./getApplicationsIndex.js";
import type {
  UserRequest,
  GetUserResponse,
  SignUpRequest,
  SignUpResponse,
  CheckInUserResponse,
  QRRequest,
  GetQRResponse,
  UpdateUserResponse,
  UpdateUserRequest,
  GetApplicationIndexResponse,
} from "./types.js";
import { updateUser } from "./updateUser.js";

export class UserModule {
  constructor(private config: Config) {}

  public async get(data?: UserRequest): Promise<GetUserResponse> {
    return getUser(this.config, data);
  }

  public async update(data: UpdateUserRequest): Promise<UpdateUserResponse> {
    return updateUser(this.config, data);
  }

  public async signUp(data: SignUpRequest): Promise<SignUpResponse> {
    return signUp(this.config, data);
  }

  public async checkIn(data: UserRequest): Promise<CheckInUserResponse> {
    return checkInUser(this.config, data);
  }

  public async getQR(data?: QRRequest): Promise<GetQRResponse> {
    return getQR(this.config, data);
  }

  public async getApplicationsIndex(): Promise<GetApplicationIndexResponse> {
    return getApplicationsIndex(this.config);
  }
}
