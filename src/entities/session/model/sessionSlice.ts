import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { sessionApi } from "../api/sessionApi";

export interface SessionState {
  isAuthorize: boolean;
  accessToken?: Token;
  userId?: Id;
  isActivated?: boolean;
  reqAccessInterceptorId?: number;
}

const initialState: SessionState = {
  isAuthorize: false,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    createSession: (
      state,
      {
        payload,
      }: PayloadAction<{ userId: Id; accessToken: Token; isActivated: boolean }>
    ) => {
      state.userId = payload.userId;
      state.accessToken = payload.accessToken;
      state.isActivated = payload.isActivated;
      state.isAuthorize = true;
    },
    clearSession: (state) => {
      state.userId = undefined;
      state.accessToken = undefined;
      state.isActivated = undefined;
      state.isAuthorize = false;
      if (state.reqAccessInterceptorId) {
        sessionApi.interceptors.request.clear();
      }
      state.reqAccessInterceptorId = undefined;
    },
  },
});

export const selectIsAuthorized = (state: RootState) =>
  state.session.isAuthorize;

export const { createSession, clearSession } = sessionSlice.actions;
