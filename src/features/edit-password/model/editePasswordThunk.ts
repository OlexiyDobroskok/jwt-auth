import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  type EditPasswordRequest,
  handleHttpError,
  type HttpError,
  type ResponseMessage,
  userService,
} from "shared/api";

export const editePasswordThunk = createAsyncThunk<
  ResponseMessage,
  EditPasswordRequest,
  { rejectValue: HttpError }
>("user/changePassword", async (editData, { rejectWithValue }) => {
  try {
    const response = await userService.editePassword(editData);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleHttpError(error));
  }
});
