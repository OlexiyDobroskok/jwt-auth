import { sessionApi, type SessionDto } from "entities/session";
import { type RegistrationRequestBody } from "./types";

export const registration = async (
  registrationBody: RegistrationRequestBody
) => {
  const res = await sessionApi.post<SessionDto>(
    "/registration",
    registrationBody
  );
  return res.data;
};
