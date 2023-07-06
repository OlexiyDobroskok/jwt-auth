import { type ApiResponseMessage, baseApi } from "shared/api";

export const resetPassword = async (email: Email) => {
  const response = await baseApi.post<ApiResponseMessage>(
    "/password/reset",
    email
  );
  return response.data;
};
