import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSession, type UserDto } from "entities/session";
import { type ApiException, handleApiError } from "shared/api";
import { createUser } from "entities/user";
import { type LoginRequestBody } from "../api/types";
import { login } from "../api/endpoints";

export const loginThunk = createAsyncThunk<
  UserDto,
  LoginRequestBody,
  { dispatch: AppDispatch; rejectValue: ApiException }
>("session/login", async (loginBody, { dispatch, rejectWithValue }) => {
  try {
    const { userDto, accessToken } = await login(loginBody);
    if (accessToken) {
      const { id, userName, email, isActivated, date } = userDto;
      dispatch(createSession({ userId: id, isActivated, accessToken }));
      dispatch(createUser({ id, userName, email, registrationDate: date }));
    }
    return userDto;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});
