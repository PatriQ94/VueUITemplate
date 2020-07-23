import Vue from "vue";
import App from "./App.vue";
import { store } from "./store";
import vuetify from "./plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import router from "./router";

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
