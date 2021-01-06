import axios from "axios";

const baseURL = "http://localhost:4444/api";

export const instance = axios.create({
  baseURL: baseURL,
  timeout: 4000,
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `${token}` : "";
  return config;
});
