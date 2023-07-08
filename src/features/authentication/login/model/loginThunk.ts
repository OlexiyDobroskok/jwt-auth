import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSession } from "entities/session";
import {
  type HttpError,
  handleHttpError,
  type SessionDto,
  userService,
  type LoginRequest,
} from "shared/api";

export const loginThunk = createAsyncThunk<
  SessionDto,
  LoginRequest,
  { dispatch: AppDispatch; rejectValue: HttpError }
>("session/login", async (loginData, { dispatch, rejectWithValue }) => {
  try {
    const response = await userService.login(loginData);
    const sessionDto = response.data;
    dispatch(createSession(sessionDto));
    return sessionDto;
  } catch (error) {
    return rejectWithValue(handleHttpError(error));
  }
});
