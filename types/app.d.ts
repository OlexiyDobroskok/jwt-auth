declare global {
  type ApiErrors = Record<string, string>[];

  type Id = string;
  type Email = string;
  type Password = string;
  type Token = string;
  type Message = string;
  type StatusCode = number;

  declare type RootState = import("../src/app/appStore").RootState;
  declare type AppDispatch = import("../src/app/appStore").AppDispatch;
}

export {};
