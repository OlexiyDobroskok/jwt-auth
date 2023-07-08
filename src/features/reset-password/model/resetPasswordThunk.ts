import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  handleHttpError,
  type HttpError,
  type ResetPasswordRequest,
  type ResponseMessage,
  userService,
} from "shared/api";

export const resetPasswordThunk = createAsyncThunk<
  ResponseMessage,
  ResetPasswordRequest,
  { rejectValue: HttpError }
>("user/resetPassword", async (resetData, { rejectWithValue }) => {
  try {
    const response = await userService.resetPassword(resetData);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleHttpError(error));
  }
});
