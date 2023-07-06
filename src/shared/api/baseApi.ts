import axios from "axios";
import { appConfig } from "../lib";

export const baseApi = axios.create({
  baseURL: appConfig.API_ENDPOINT,
});
