import type { GlobalError, ServiceResponse } from "../../types.js";

export interface ParticipationSummary {
  id: string;
  name: string;
  started: string;
}
export type EventParticipationSummary = ParticipationSummary;
export type UserParticipationSummary = ParticipationSummary;
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
