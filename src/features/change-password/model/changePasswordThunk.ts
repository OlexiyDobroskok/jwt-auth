import { createAsyncThunk } from "@reduxjs/toolkit";
import { type ResetPasswordBody, type ResetPasswordDto } from "../api/types.ts";
import { ApiException, handleApiError } from "shared/api";
import { reset } from "../api/endpoints";

export const changePasswordThunk = createAsyncThunk<
  ResetPasswordDto,
  ResetPasswordBody,
  { rejectValue: ApiException }
>("session/changePasswordThunk", async (newPassword, { rejectWithValue }) => {
  try {
    return await reset(newPassword);
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});
