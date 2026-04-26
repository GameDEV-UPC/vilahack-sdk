import type { GlobalError, ServiceResponse } from "../../types.js";

export type Gender = "man" | "woman" | "nonbinary" | "agender" | "other" | "unspecified";
export type TShirtSize = "xs" | "s" | "m" | "l" | "xl" | "xxl";
export type Discovery = "social_media" | "website" | "acquaintances" | "posters" | "other";
export type Experience = "expert" | "experienced" | "inexperienced" | "aware" | "newbie";
export type ApplicationStatus =
  | "applied"
  | "accepted"
  | "confirmed"
  | "cancelled"
  | "participating"
  | "disqualified"
  | "finisher"
  | "winner";

export interface Application {
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
  status: ApplicationStatus;
}

export interface ApplicationSummary {
  id: string;
  name: string;
  created_at: string;
  status: ApplicationStatus;
}

export interface ApplicationParams {
  id?: string;
}

export type SubmitApplicationRequest = Omit<Application, "created_at" | "check_in" | "status">;
export type UpdateApplicationRequest = Partial<
  Omit<Application, "created_at" | "check_in" | "status">
>;
export type SubmitApplicationErrorCode = GlobalError | "EMAIL_ALREADY_IN_USE";
export type GetApplicationErrorCode = GlobalError | "APPLICATION_NOT_FOUND";
export type UpdateApplicationErrorCode = GlobalError | "UPDATE_APPLICATION_ERROR";
export type ListApplicationSummariesErrorCode = GlobalError;

export type SubmitApplicationResponse = ServiceResponse<void, SubmitApplicationErrorCode>;
export type GetApplicationResponse = ServiceResponse<Application, GetApplicationErrorCode>;
export type UpdateApplicationResponse = ServiceResponse<void, UpdateApplicationErrorCode>;
export type ListApplicationSummariesResponse = ServiceResponse<ApplicationSummary[]>;
