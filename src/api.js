import axios from "axios";
import { store } from "./store";
import router from "./router";

let api = axios.create({
  baseURL: "https://localhost:5001",
});

// Add a request interceptor
api.interceptors.request.use(function(config) {
  if (store.getters.loggedIn) {
    config.headers.Authorization = "Bearer " + store.getters.getAccessToken;
  } else {
    config.headers.Authorization = null;
  }
  return config;
});

// Add a response interceptor
api.interceptors.response.use(
  function(response) {
    //Successful response
    return response;
  },
  function(error) {
    // Return any error which is not due to authentication
    if (error.response.status !== 401) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    // Logout user if token refresh didn't work
    if (error.config.url == "/api/Auth/RefreshToken") {
      store.dispatch("logout").then(() => {
        router.push({ name: "login" });
        return new Promise((resolve, reject) => {
          reject(error);
        });
      });
    }

    return api
      .post("/api/Auth/RefreshToken", {
        accessToken: store.getters.getAccessToken,
        refreshToken: store.getters.getRefreshToken,
      })
      .then((response) => {
        //Get access and refresh token from the response
        const accessToken = response.data.value.accessToken;
        const refreshToken = response.data.value.refreshToken;

        //Override existing tokens
        store
          .dispatch("loginOrRegister", {
            accessToken: accessToken,
            refreshToken: refreshToken,
          })
          .then(() => {
            // Make a new request with refreshed tokens
            const config = error.config;
            return new Promise((resolve, reject) => {
              api
                .request(config)
                .then((response) => {
                  resolve(response);
                })
                .catch((error) => {
                  reject(error);
                });
            });
          })
          .catch((error) => {
            store.dispatch("logout").then(() => {
              router.push({ name: "login" });
              return new Promise((resolve, reject) => {
                reject(error);
              });
            });
          });
      })
      .catch((error) => {
        Promise.reject(error);
      });
  }
);

export default api;
