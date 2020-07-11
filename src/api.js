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

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("This is some axios interceptor 2 for error");
    return Promise.reject(error);
  }
);

export default api;
