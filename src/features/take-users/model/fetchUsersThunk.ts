import { createAsyncThunk } from "@reduxjs/toolkit";

import { handleHttpError, type HttpError, type UserDto } from "shared/api";

import { getUsers } from "../api/endpoints.ts";

export const fetchUsersThunk = createAsyncThunk<
  UserDto[],
  void,
  { rejectValue: HttpError }
>("session/fetchUsersThunk", async (_, { rejectWithValue }) => {
  try {
    return await getUsers();
  } catch (error) {
    return rejectWithValue(handleHttpError(error));
  }
});
