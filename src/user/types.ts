import type { GlobalError } from "../types.js";

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

export type SignUpRequest = Omit<UserProfile, "created_at" | "check_in" | "status">;

export type SignUpError = GlobalError | "EMAIL_ALREADY_IN_USE";
export type GetUserError = GlobalError | "USER_NOT_FOUND";

export type SignUpResponse =
  | { success: true }
  | { success: false; code: SignUpError; message?: string };

export type GetUserResponse =
  | { success: true; data: UserProfile }
  | { success: false; code: GetUserError; message?: string };
