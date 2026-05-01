import type { GlobalError, ServiceResponse } from "../types.js";

export interface Event {
  id: string;
  description: string;
  location: string;
  begins_at: string;
  ends_at?: string;
}

export interface ParticipateEventParams {
  user: string;
  event: string;
}

export type ListEventsErrorCode = GlobalError;
export type ParticipateEventErrorCode = GlobalError | "EVENT_NOT_FOUND" | "ALREADY_PARTICIPATED";

export type ListEventsResponse = ServiceResponse<Event[], ListEventsErrorCode>;
export type ParticipateEventResponse = ServiceResponse<void, ParticipateEventErrorCode>;
