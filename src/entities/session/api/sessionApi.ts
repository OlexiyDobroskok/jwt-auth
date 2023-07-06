import axios from "axios";
import { appConfig } from "shared/lib";

export const sessionApi = axios.create({
  baseURL: appConfig.SESSION_API_ENDPOINT,
  withCredentials: true,
});
