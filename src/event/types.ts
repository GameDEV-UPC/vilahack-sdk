import type { GlobalError, ServiceResponse } from "../types.js";

export interface Event {
  id: string;
  name: string;
  description: string;
  location: string;
  begins_at: string;
  ends_at?: string;
}

export interface GetEventParams {
  id: string;
}

export type ListEventsErrorCode = GlobalError;
export type GetEventErrorCode = GlobalError | "EVENT_NOT_FOUND";

export type ListEventsResponse = ServiceResponse<Event[], ListEventsErrorCode>;
export type GetEventResponse = ServiceResponse<Event, GetEventErrorCode>;
