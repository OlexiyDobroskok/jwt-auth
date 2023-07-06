import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  type ApiException,
  type ApiResponseMessage,
  handleApiError,
} from "shared/api";
import { resetPassword } from "../api/endpoints";
import { type ResetPasswordBody } from "../api/types";

export const resetPasswordThunk = createAsyncThunk<
  ApiResponseMessage,
  ResetPasswordBody,
  { rejectValue: ApiException }
>("user/resetPassword", async (resetData, { rejectWithValue }) => {
  try {
    return await resetPassword(resetData);
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});
