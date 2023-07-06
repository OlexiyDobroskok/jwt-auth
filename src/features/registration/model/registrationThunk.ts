import { createAsyncThunk } from "@reduxjs/toolkit";
import { type ApiException, handleApiError } from "shared/api";
import { createSession, type UserDto } from "entities/session";
import { createUser } from "entities/user";
import { type RegistrationRequestBody } from "../api/types.ts";
import { registration } from "../api/endpoints.ts";

export const registrationThunk = createAsyncThunk<
  UserDto,
  RegistrationRequestBody,
  { dispatch: AppDispatch; rejectValue: ApiException }
>(
  "session/registrationThunk",
  async (registrationBody, { dispatch, rejectWithValue }) => {
    try {
      const { userDto, accessToken } = await registration(registrationBody);
      if (accessToken) {
        const { id, isActivated, email, userName, date } = userDto;
        dispatch(createUser({ id, userName, email, registrationDate: date }));
        dispatch(
          createSession({
            userId: id,
            isActivated,
            accessToken,
          })
        );
      }
      return userDto;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);
