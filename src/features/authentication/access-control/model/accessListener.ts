import { createListenerMiddleware } from "@reduxjs/toolkit";
import { type AppStartListening } from "shared/store";
import { clearSession, createSession } from "entities/session";
import { AxiosError } from "axios";
import { refreshThunk } from "../../refresh";
import { type AccessAxiosRequestConfig } from "./types";
import { baseApi } from "shared/api";

export const accessListener = createListenerMiddleware();

export const startAccessListening =
  accessListener.startListening as AppStartListening;

startAccessListening({
  actionCreator: createSession,
  effect: ({ payload }, { dispatch }) => {
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
  effect: () => {
    baseApi.interceptors.request.clear();
    baseApi.interceptors.response.clear();
  },
});
