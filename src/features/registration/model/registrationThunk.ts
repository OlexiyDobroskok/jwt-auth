import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  type HttpError,
  handleHttpError,
  type RegisterUserRequest,
  type SessionDto,
  userService,
} from "shared/api";
import { createSession } from "entities/session";

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
