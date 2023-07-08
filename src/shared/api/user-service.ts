import {
  CreatePasswordRequest,
  EditPasswordRequest,
  LoginRequest,
  RegisterUserRequest,
  ResetPasswordRequest,
  ResponseMessage,
  SessionDto,
} from "./types";
import { AxiosRequestConfig } from "axios";
import { baseApi } from "./baseApi";

class UserService {
  async registration(data: RegisterUserRequest, config?: AxiosRequestConfig) {
    return baseApi.post<SessionDto>("/registration", data, config);
  }

  async login(data: LoginRequest, config?: AxiosRequestConfig) {
    return baseApi.post<SessionDto>("/login", data, config);
  }

  async logout(config?: AxiosRequestConfig) {
    return baseApi.get<void>("/logout", config);
  }

  async refresh(config?: AxiosRequestConfig) {
    return baseApi.get<SessionDto>("/refresh", config);
  }

  async createPassword(
    data: CreatePasswordRequest,
    config?: AxiosRequestConfig
  ) {
    return baseApi.post<ResponseMessage>("/password/create", data, config);
  }

  async editePassword(data: EditPasswordRequest, config?: AxiosRequestConfig) {
    return baseApi.post<ResponseMessage>("/password/edit", data, config);
  }

  async resetPassword(data: ResetPasswordRequest, config?: AxiosRequestConfig) {
    return baseApi.post<ResponseMessage>("/password/reset", data, config);
  }
}

export const userService = new UserService();
