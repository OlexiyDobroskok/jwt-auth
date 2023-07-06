import { sessionApi } from "entities/session";
import { type ResetPasswordBody, type ResetPasswordDto } from "./types";

export const reset = async (newPassword: ResetPasswordBody) => {
  const response = await sessionApi.post<ResetPasswordDto>(
    "/reset",
    newPassword
  );
  return response.data;
};
