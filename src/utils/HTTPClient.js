import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  TOKEN_EXPIRED_ERROR_MESSAGE,
} from "./../constants";
import axios from "axios";
import config from "../config";

class HTTPClient {
  constructor() {
    let options = {
      baseURL: config.backendBaseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    };

    this.client = axios.create(options);
  }

  async get(endpoint, isNeedAuth = false) {
    this.setupInterceptors(isNeedAuth);
    return await (await this.client.get(endpoint)).data;
  }

  async post(endpoint, data, isNeedAuth = false) {
    this.setupInterceptors(isNeedAuth);
    return await (await this.client.post(endpoint, JSON.stringify(data))).data;
  }

  async refreshAccessToken() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    const config = {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    };

    const response = await (await this.client.get("user/token", config)).data;
    const accessToken = response.data[ACCESS_TOKEN_KEY];

    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  setupInterceptors(isNeedAuth, token = null) {
    this.client.interceptors.request.use((request) => {
      const accessToken = token
        ? token
        : localStorage.getItem(ACCESS_TOKEN_KEY);

      if (isNeedAuth) {
        const authHeader = `Bearer ${accessToken}`;
        request.headers.common["Authorization"] = authHeader;
      }

      return request;
    });

    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        const errorResponse = error.response;
        const status = errorResponse.status;
        const message = errorResponse.data.name;

        if (
          status === 403 &&
          message === TOKEN_EXPIRED_ERROR_MESSAGE &&
          !originalRequest._retry
        ) {
          await this.refreshAccessToken();

          originalRequest.headers["Authorization"] =
            "Bearer " + localStorage.getItem(ACCESS_TOKEN_KEY);

          return axios(originalRequest);
        }

        Promise.reject(error);
      }
    );
  }
}

export default HTTPClient;
