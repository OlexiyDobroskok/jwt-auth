import axios from "axios";
import { appConfig } from "shared/lib";

export const sessionApi = axios.create({
  baseURL: appConfig.API_ENDPOINT,
  withCredentials: true,
});
