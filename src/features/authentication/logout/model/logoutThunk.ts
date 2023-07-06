import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearSession } from "entities/session";
import { type ApiException, handleApiError } from "shared/api";
import { removeUser } from "entities/user";
import { logout } from "../api/endpoints";

export const logoutThunk = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; rejectValue: ApiException }
>("user/logoutThunk", async (_, { dispatch, rejectWithValue }) => {
  try {
    await logout();
    dispatch(clearSession());
    dispatch(removeUser());
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});
