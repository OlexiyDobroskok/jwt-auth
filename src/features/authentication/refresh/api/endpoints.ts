import { sessionApi, type SessionDto } from "entities/session";

export const refresh = async () => {
  const res = await sessionApi.get<SessionDto>("/refresh");
  return res.data;
};
