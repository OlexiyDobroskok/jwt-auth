import { sessionApi } from "entities/session";

export const logout = async () => {
  await sessionApi.get("/logout");
};
