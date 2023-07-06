import { type ApiResponseMessage, baseApi } from "shared/api";
import { type NewAccPassBody } from "./types";

export const createNewAccPass = async (passData: NewAccPassBody) => {
  const response = await baseApi.post<ApiResponseMessage>(
    "/password/create",
    passData
  );
  return response.data;
};
