import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  type HttpError,
  handleHttpError,
  type SessionDto,
  userService,
} from "shared/api";
import { clearSession, createSession } from "entities/session";

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
