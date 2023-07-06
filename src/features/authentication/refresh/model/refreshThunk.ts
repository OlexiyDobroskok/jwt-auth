import { createAsyncThunk } from "@reduxjs/toolkit";
import { type ApiException, handleApiError } from "shared/api";
import { clearSession, createSession } from "entities/session";
import { createUser, removeUser } from "entities/user";
import { refresh } from "../api/endpoints";

export const refreshThunk = createAsyncThunk<
  Token,
  void,
  { dispatch: AppDispatch; rejectValue: ApiException }
>("user/refresh", async (_, { dispatch, rejectWithValue }) => {
  try {
    const { userDto, accessToken } = await refresh();
    if (accessToken) {
      const { id, email, userName, isActivated, date } = userDto;
      dispatch(
        createSession({
          userId: id,
          isActivated,
          accessToken,
        })
      );
      dispatch(createUser({ id, email, userName, registrationDate: date }));
    }
    return accessToken;
  } catch (error) {
    const apiException = handleApiError(error);
    if (apiException.status === 401) {
      dispatch(clearSession());
      dispatch(removeUser());
    }

    return rejectWithValue(apiException);
  }
});
