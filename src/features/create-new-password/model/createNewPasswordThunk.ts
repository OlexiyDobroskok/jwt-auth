import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  type ApiException,
  type ApiResponseMessage,
  handleApiError,
} from "shared/api";
import { createNewAccPass } from "../api/endpoints";
import { NewAccPassBody } from "../api/types.ts";

export const createNewPasswordThunk = createAsyncThunk<
  ApiResponseMessage,
  NewAccPassBody,
  { rejectValue: ApiException }
>("user/createNewPassword", async (passData, { rejectWithValue }) => {
  try {
    return await createNewAccPass(passData);
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});
