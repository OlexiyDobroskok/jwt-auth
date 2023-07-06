import { createAsyncThunk } from "@reduxjs/toolkit";
import { type UserDto } from "entities/session";
import { type ApiException, handleApiError } from "shared/api";
import { getUsers } from "../api/endpoints.ts";

export const fetchUsersThunk = createAsyncThunk<
  UserDto[],
  void,
  { rejectValue: ApiException }
>("session/fetchUsersThunk", async (_, { rejectWithValue }) => {
  try {
    return await getUsers();
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});
