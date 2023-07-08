import { baseApi, type UserDto } from "shared/api";

export const getUsers = async () => {
  const res = await baseApi.get<UserDto[]>("/");
  return res.data;
};
