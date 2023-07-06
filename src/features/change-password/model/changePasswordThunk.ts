import { createAsyncThunk } from "@reduxjs/toolkit";
import { type ChangePasswordBody } from "../api/types";
import {
  type ApiException,
  type ApiResponseMessage,
  handleApiError,
} from "shared/api";
import { editPass } from "../api/endpoints";

export const changePasswordThunk = createAsyncThunk<
  ApiResponseMessage,
  ChangePasswordBody,
  { rejectValue: ApiException }
>("user/changePassword", async (passwords, { rejectWithValue }) => {
  try {
    return await editPass(passwords);
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});
