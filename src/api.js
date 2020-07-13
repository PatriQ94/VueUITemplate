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

    //Get new tokens
    return getNewTokens()
      .then(() => {
        //Retry the request
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
        Promise.reject(error);
      });
  }
);

function getNewTokens() {
  var oldToken = store.getters.getRefreshToken;
  //Exchange old tokens for new one
  return new Promise((resolve, reject) => {
    api
      .post("/api/Auth/RefreshToken", {
        accessToken: store.getters.getAccessToken,
        refreshToken: store.getters.getRefreshToken,
      })
      .then((response) => {
        //Store newly generated tokens
        console.log(
          "Refreshing old token: " +
            oldToken +
            ", for new one: " +
            response.data.value.refreshToken
        );
        store
          .dispatch("loginOrRegister", {
            accessToken: response.data.value.accessToken,
            refreshToken: response.data.value.refreshToken,
          })
          .then((response) => {
            resolve(response);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default api;
