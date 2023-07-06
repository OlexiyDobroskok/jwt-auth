import { isAxiosError } from "axios";
import { ResponseError } from "./types.ts";

export interface ApiException {
  error: Message;
  status?: StatusCode;
}

export const handleApiError = (error: unknown): ApiException => {
  if (isAxiosError(error)) {
    const responseError: ResponseError = error.response?.data;
    if (error.response && Object.hasOwn(responseError, "message")) {
      return {
        error: responseError.message,
        status: error.response.status,
      };
    }
    return { error: error.message };
  }

  if (error instanceof Error) {
    return { error: error.message };
  }

  if (typeof error === "string") {
    return { error: error };
  }
  return { error: "unknown error" };
};
