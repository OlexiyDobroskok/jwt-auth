import { type AxiosRequestConfig } from "axios";

export interface AccessAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}
