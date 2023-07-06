import { sessionApi, type UserDto } from "entities/session";

export const getUsers = async () => {
  const res = await sessionApi.get<UserDto[]>("/");
  return res.data;
};
