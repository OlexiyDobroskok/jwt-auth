import { type ApiResponseMessage, baseApi } from "shared/api";
import { type ResetPasswordBody } from "./types";

export const resetPassword = async (resetData: ResetPasswordBody) => {
  const response = await baseApi.post<ApiResponseMessage>(
    "/password/reset",
    resetData
  );
  return response.data;
};
