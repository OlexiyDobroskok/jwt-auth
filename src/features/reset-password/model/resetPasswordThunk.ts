import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  type ApiException,
  type ApiResponseMessage,
  handleApiError,
} from "shared/api";
import { resetPassword } from "../api/endpoints";

export const resetPasswordThunk = createAsyncThunk<
  ApiResponseMessage,
  Email,
  { rejectValue: ApiException }
>("user/resetPassword", async (email, { rejectWithValue }) => {
  try {
    return await resetPassword(email);
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});
