import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type SessionDto, type UserDto } from "shared/api";

export interface SessionState {
  isAuthorize: boolean;
  user?: UserDto;
  accessToken?: Token;
}

const initialState: SessionState = {
  isAuthorize: false,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    createSession: (state, { payload }: PayloadAction<SessionDto>) => {
      state.user = payload.userDto;
      state.accessToken = payload.accessToken;
      state.isAuthorize = true;
    },
    clearSession: (state) => {
      state.user = undefined;
      state.accessToken = undefined;
      state.isAuthorize = false;
    },
  },
});

export const selectIsAuthorized = (state: RootState) =>
  state.session.isAuthorize;
export const selectUser = (state: RootState) => state.session.user;

export const { createSession, clearSession } = sessionSlice.actions;
