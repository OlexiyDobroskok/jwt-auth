import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  type HttpError,
  type ResponseMessage,
  handleHttpError,
  userService,
  type CreatePasswordRequest,
} from "shared/api";

export const createPasswordThunk = createAsyncThunk<
  ResponseMessage,
  CreatePasswordRequest,
  { rejectValue: HttpError }
>("session/createPassword", async (editData, { rejectWithValue }) => {
  try {
    const response = await userService.createPassword(editData);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleHttpError(error));
  }
});
