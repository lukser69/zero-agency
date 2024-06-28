import { getAccessToken, removeFromStorage } from "@/services/auth-token.service";
import axios, { CreateAxiosDefaults } from "axios";
import { errorCatch } from "./error";
import { authService } from "@/services/auth.service";

const options: CreateAxiosDefaults = {
  baseURL: 'https://jsonplaceholder.typicode.com/',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  },
  withCredentials: true
}
  ;
const myAxios = axios.create(options);
const myAxiosWithAuth = axios.create(options);

myAxiosWithAuth.interceptors.request.use(config => {
  const accessToken = getAccessToken();

  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
})

myAxiosWithAuth.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config

    if (
      (error?.response?.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await authService.getNewTokens();
        return myAxiosWithAuth.request(originalRequest)
      } catch (error) {
        if (errorCatch(error) === 'jwt expired') removeFromStorage()
      }
    }

    throw error
  }
)

export { myAxios, myAxiosWithAuth }