import type { GlobalError, ServiceResponse } from "../../types.js";

export interface Participation {
  event: string;
  name: string;
  began_at: string;
  participated_at: string;
}

export interface SubmitParticipationParams {
  user: string;
  event: string;
}

export interface ListParticipationParams {
  user?: string;
  event?: string;
}

export type SubmitParticipationErrorCode = GlobalError | "EVENT_NOT_FOUND" | "ALREADY_PARTICIPATED";
export type ListParticipationErrorCode = GlobalError;

export type SubmitParticipationResponse = ServiceResponse<number, SubmitParticipationErrorCode>;
export type ListParticipationResponse = ServiceResponse<
  Participation[],
  ListParticipationErrorCode
>;
