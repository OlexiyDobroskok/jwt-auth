import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  handleHttpError,
  type HttpError,
  type SessionDto,
  userService,
} from "shared/api";

import { clearSession, createSession } from "./sessionSlice";

export const refreshThunk = createAsyncThunk<
  SessionDto,
  void,
  { dispatch: AppDispatch; rejectValue: HttpError }
>("session/refresh", async (_, { dispatch, rejectWithValue }) => {
  try {
    const response = await userService.refresh();
    const sessionDto = response.data;
    dispatch(createSession(sessionDto));
    return sessionDto;
  } catch (error) {
    const apiException = handleHttpError(error);
    if (apiException.status === 401) {
      dispatch(clearSession());
    }

    return rejectWithValue(apiException);
  }
});
