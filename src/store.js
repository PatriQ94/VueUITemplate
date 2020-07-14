import Vue from "vue";
import Vuex from "vuex";

//Load Vuex
Vue.use(Vuex);

//Initialize store
export const store = new Vuex.Store({
  state: {
    accessToken: localStorage.getItem("access_Token"),
    refreshToken: localStorage.getItem("refresh_Token"),
    notification:{
      show: false,
      color: "success",
      text : ""
    }
  },
  getters: {
    loggedIn(state) {
      return state.accessToken != null;
    },
    getAccessToken(state) {
      return state.accessToken;
    },
    getRefreshToken(state) {
      return state.refreshToken;
    },
  },
  actions: {
    loginOrRegister(context, credentials) {
      return new Promise((resolve) => {
        localStorage.setItem("access_Token", credentials.accessToken);
        localStorage.setItem("refresh_Token", credentials.refreshToken);

        //save to storage via mutation
        context.commit("login", {
          accessToken: credentials.accessToken,
          refreshToken: credentials.refreshToken,
        });
        resolve(credentials.accessToken);
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
    raiseNotification(context, notificationInfo){
      context.commit("raiseNotification", notificationInfo);
    }
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
    raiseNotification(state, notificationInfo){
      state.notification = notificationInfo
    }
  },
});
