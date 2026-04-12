import type { GlobalError, ServiceResponse } from "../types.js";

export type Gender = "man" | "woman" | "nonbinary" | "agender" | "other" | "unspecified";
export type TShirtSize = "xs" | "s" | "m" | "l" | "xl" | "xxl";
export type Discovery = "social_media" | "website" | "acquaintances" | "posters" | "other";
export type Experience = "expert" | "experienced" | "inexperienced" | "aware" | "newbie";
export type Status = "applied" | "accepted" | "disqualified" | "finisher" | "winner";

export interface UserProfile {
  name: string;
  phone: string;
  longitude: number;
  latitude: number;
  studies: string;
  gender: Gender;
  university: string;
  discovery: Discovery;
  experience: Experience;
  first_time: boolean;
  why: string;
  tshirt_size: TShirtSize;
  dietary_preference: string[];
  accessibility_needs: string;
  dvcs: string | null;
  linkedin: string | null;
  website: string | null;
  allows_cv_sharing: boolean;
  allows_marketing: boolean;
  created_at: string;
  check_in: string | null;
  comment: string | null;
  status: Status;
}

export interface UserRequest {
  id?: string;
  qr?: string;
}
export interface QRRequest {
  m?: string;
  b?: string;
}

export type SignUpRequest = Omit<UserProfile, "created_at" | "check_in" | "status">;
export type UpdateUserRequest = Partial<Omit<UserProfile, "created_at" | "check_in" | "status">>;

export type SignUpErrorCode = GlobalError | "EMAIL_ALREADY_IN_USE";
export type GetUserErrorCode = GlobalError | "USER_NOT_FOUND";
export type UpdateUserErrorCode = GlobalError | "USER_UPDATE_ERROR";
export type CheckInUserErrorCode = GlobalError | "USER_ALREADY_CHECKED_IN";
export type GetQRErrorCode = GlobalError;

export type SignUpResponse = ServiceResponse<void, SignUpErrorCode>;
export type GetUserResponse = ServiceResponse<UserProfile, GetUserErrorCode>;
export type UpdateUserResponse = ServiceResponse<void, UpdateUserErrorCode>;
export type CheckInUserResponse = ServiceResponse<void, CheckInUserErrorCode>;
export type GetQRResponse = ServiceResponse<string, GetQRErrorCode>;
