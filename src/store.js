import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

//Load Vuex
Vue.use(Vuex);

//Set default URL for axios
axios.defaults.baseURL = "https://localhost:5001/api/";

//Initialize store
export const store = new Vuex.Store({
  state: {
    accessToken: localStorage.getItem("access_Token"),
    refreshToken: localStorage.getItem("refresh_Token"),
  },
  getters: {},
  actions: {
    login(context, credentials) {
      axios
        .post("Auth/Login", {
          email: credentials.email,
          password: credentials.password,
        })
        .then((response) => {
          if (response.data.ErrorMessage != null) {
            console.log(response.data.ErrorMessage);
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
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mutations: {
    login(state, tokens) {
      (state.accessToken = tokens.accessToken),
        (state.refreshToken = tokens.refreshToken);
    },
  },
});
