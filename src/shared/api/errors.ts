import { isAxiosError } from "axios";

import { type ResponseError } from "./types";

export interface HttpError {
  message: Message;
  status?: StatusCode;
}

export const handleHttpError = (error: unknown): HttpError => {
  if (isAxiosError(error)) {
    const responseError: ResponseError = error.response?.data;
    if (error.response && Object.hasOwn(responseError, "message")) {
      return {
        message: responseError.message,
        status: error.response.status,
      };
    }
    return { message: error.message };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  if (typeof error === "string") {
    return { message: error };
  }
  return { message: "unknown error" };
};
