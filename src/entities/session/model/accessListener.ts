import { createListenerMiddleware } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { baseApi } from "shared/api";
import { type AppStartListening } from "shared/store";

import { refreshThunk } from "./refreshThunk";
import {
  clearRefreshTimerId,
  clearSession,
  createSession,
  setRefreshTimerId,
} from "./sessionSlice";
import { type AccessAxiosRequestConfig } from "./types";

export const accessListener = createListenerMiddleware();

export const startAccessListening =
  accessListener.startListening as AppStartListening;

startAccessListening({
  actionCreator: createSession,
  effect: ({ payload }, { dispatch, getState }) => {
    const { session } = getState();
    if (session.refreshTimerId) {
      window.clearTimeout(session.refreshTimerId);
    }
    const refreshTimeout = 14 * 60 * 1000;
    const refreshTimerId = window.setTimeout(
      () => dispatch(refreshThunk()),
      refreshTimeout
    );
    dispatch(setRefreshTimerId(refreshTimerId));

    baseApi.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${payload.accessToken}`;
      return config;
    });

    baseApi.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error instanceof AxiosError) {
          try {
            const originalRequest = error.config as AccessAxiosRequestConfig;
            if (error.response?.status === 401 && !originalRequest?._retry) {
              baseApi.interceptors.request.clear();
              originalRequest._retry = true;
              const accessToken = await dispatch(refreshThunk()).unwrap();
              if (originalRequest.headers?.Authorization) {
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              }
              return baseApi.request(originalRequest);
            }
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  },
});

startAccessListening({
  actionCreator: clearSession,
  effect: (_, { getState, dispatch }) => {
    const { session } = getState();
    if (session.refreshTimerId) {
      window.clearTimeout(session.refreshTimerId);
      dispatch(clearRefreshTimerId());
    }
    baseApi.interceptors.request.clear();
    baseApi.interceptors.response.clear();
  },
});
