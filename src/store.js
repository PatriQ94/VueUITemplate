import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

//Load Vuex
Vue.use(Vuex);

//Set default URL for axios
axios.defaults.baseURL = "https://localhost:5001/api/";
// axios.defaults.headers.common["Authorization"] =
//   "Bearer " + context.state.accessToken;

//Initialize store
export const store = new Vuex.Store({
  state: {
    accessToken: localStorage.getItem("access_Token"),
    refreshToken: localStorage.getItem("refresh_Token"),
  },
  getters: {
    loggedIn(state) {
      return state.accessToken != null;
    },
  },
  actions: {
    login(context, credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post("Auth/Login", {
            email: credentials.email,
            password: credentials.password,
          })
          .then((response) => {
            if (response.data.errorMessage != null) {
              reject(response.data.errorMessage);
              return;
            }

            //Get access and refresh token from the response
            const accessToken = response.data.value.accessToken;
            const refreshToken = response.data.value.refreshToken;

            //save to localStorage
            localStorage.setItem("access_Token", accessToken);
            localStorage.setItem("refresh_Token", refreshToken);

            //save to storage via mutation
            context.commit("login", {
              accessToken: accessToken,
              refreshToken: refreshToken,
            });

            resolve(response);
          })
          .catch((error) => {
            reject(error);
            return;
          });
      });
    },
    logout(context) {
      if (context.getters.loggedIn) {
        return new Promise((resolve) => {
          localStorage.removeItem("access_Token");
          localStorage.removeItem("refresh_Token");
          context.commit("logout");
          resolve(true);
        });
      }
    },
    checkConnection() {
      return new Promise((resolve, reject) => {
        axios
          .get("Auth/Ping")
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  mutations: {
    login(state, tokens) {
      (state.accessToken = tokens.accessToken),
        (state.refreshToken = tokens.refreshToken);
    },
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});
