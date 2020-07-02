import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import { store } from "./store";
import routes from "./routes";
import vuetify from "./plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: "history",
});

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
