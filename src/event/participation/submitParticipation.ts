import type { Config } from "../../config.js";
import { COMMON_ERRORS } from "../../constants/api.js";
import { API_ROUTES } from "../../routes.js";
import type { Unwrap } from "../../types.js";
import { mapServiceError } from "../../utils/errorHandler.js";
import { fetchClient } from "../../utils/fetchClient.js";
import type {
  SubmitParticipationErrorCode,
  SubmitParticipationParams,
  SubmitParticipationResponse,
} from "./types.js";

const SUBMIT_PARTICIPATION_ERRORS: Record<number, SubmitParticipationErrorCode> = {
  ...COMMON_ERRORS,
};

export async function submitParticipation(
  config: Config,
  params: SubmitParticipationParams,
): Promise<SubmitParticipationResponse> {
  const response = await fetchClient<Unwrap<SubmitParticipationResponse>>(
    config,
    API_ROUTES.EVENT.PARTICIPATION.SUBMIT,
    {
      method: "PUT",
      params: params,
    },
  );

  if (!response.success) {
    if (response.status === 412) {
      const msg = response.error.message.toLowerCase();
      if (msg.includes("duplicate key value"))
        SUBMIT_PARTICIPATION_ERRORS[412] = "ALREADY_PARTICIPATED";
      else SUBMIT_PARTICIPATION_ERRORS[412] = "EVENT_NOT_FOUND";
    }
    return mapServiceError<SubmitParticipationErrorCode>(response, SUBMIT_PARTICIPATION_ERRORS);
  }

  return { success: true, data: response.data };
}
