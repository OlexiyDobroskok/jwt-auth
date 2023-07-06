import { sessionApi } from "entities/session";
import { type ChangePasswordBody } from "./types";
import { type ApiResponseMessage } from "shared/api";

export const editPass = async (passwords: ChangePasswordBody) => {
  const response = await sessionApi.post<ApiResponseMessage>(
    "/password/edit",
    passwords
  );
  return response.data;
};
