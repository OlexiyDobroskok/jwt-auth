import { sessionApi, type SessionDto } from "entities/session";
import { type LoginRequestBody } from "./types";

export const login = async (loginBody: LoginRequestBody) => {
  const res = await sessionApi.post<SessionDto>("/login", loginBody);
  return res.data;
};
