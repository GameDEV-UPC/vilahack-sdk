export * from "./types.js";

import type { Config } from "../config.js";
import { checkInUser } from "./checkInUser.js";
import { getQR } from "./getQR.js";
import { getUser } from "./getUser.js";
import { signUp } from "./signUp.js";
import { updateUser } from "./updateUser.js";
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
  CheckInUserRequest,
} from "./types.js";

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

  public async checkIn(data: CheckInUserRequest): Promise<CheckInUserResponse> {
    return checkInUser(this.config, data);
  }

  public async getQR(data?: QRRequest): Promise<GetQRResponse> {
    return getQR(this.config, data);
  }
}
