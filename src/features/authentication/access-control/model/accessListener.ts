import { createListenerMiddleware } from "@reduxjs/toolkit";
import { type AppStartListening } from "shared/model";
import { clearSession, createSession, sessionApi } from "entities/session";
import { AxiosError } from "axios";
import { refreshThunk } from "../../refresh";
import { type AccessAxiosRequestConfig } from "./types";

export const accessListener = createListenerMiddleware();

export const startAccessListening =
  accessListener.startListening as AppStartListening;

startAccessListening({
  actionCreator: createSession,
  effect: ({ payload }, { dispatch }) => {
    sessionApi.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${payload.accessToken}`;
      return config;
    });

    sessionApi.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error instanceof AxiosError) {
          try {
            const originalRequest = error.config as AccessAxiosRequestConfig;
            if (error.response?.status === 401 && !originalRequest?._retry) {
              sessionApi.interceptors.request.clear();
              originalRequest._retry = true;
              const accessToken = await dispatch(refreshThunk()).unwrap();
              if (originalRequest.headers?.Authorization) {
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              }
              return sessionApi.request(originalRequest);
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
  effect: () => {
    sessionApi.interceptors.request.clear();
    sessionApi.interceptors.response.clear();
  },
});
