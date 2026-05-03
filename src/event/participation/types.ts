import type { GlobalError, ServiceResponse } from "../../types.js";

export interface EventParticipationSummary {
  id: string;
  name: string;
  started: string;
}

export interface UserParticipationSummary {}

export interface Participation {
  event: EventParticipationSummary;
  user: UserParticipationSummary;
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
