import { createAsyncThunk } from "@reduxjs/toolkit";

import { createSession } from "entities/session";
import {
  handleHttpError,
  type HttpError,
  type RegisterUserRequest,
  type SessionDto,
  userService,
} from "shared/api";

export const registrationThunk = createAsyncThunk<
  SessionDto,
  RegisterUserRequest,
  { dispatch: AppDispatch; rejectValue: HttpError }
>("session/registration", async (regData, { dispatch, rejectWithValue }) => {
  try {
    const response = await userService.registration(regData);
    const sessionDto = response.data;
    dispatch(createSession(sessionDto));
    return sessionDto;
  } catch (error) {
    return rejectWithValue(handleHttpError(error));
  }
});
