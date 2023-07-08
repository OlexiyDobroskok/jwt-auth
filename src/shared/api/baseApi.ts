import axios from "axios";
import { appConfig } from "../config";

export const baseApi = axios.create({
  baseURL: appConfig.API_ENDPOINT,
  withCredentials: true,
});
