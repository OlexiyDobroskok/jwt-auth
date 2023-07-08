import { createAsyncThunk } from "@reduxjs/toolkit";

import { clearSession } from "entities/session";
import { handleHttpError, type HttpError, userService } from "shared/api";

export const logoutThunk = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; rejectValue: HttpError }
>("session/logout", async (_, { dispatch, rejectWithValue }) => {
  try {
    await userService.logout();
    dispatch(clearSession());
  } catch (error) {
    return rejectWithValue(handleHttpError(error));
  }
});
