import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import { store } from "./store";
import routes from "./routes";
import vuetify from "./plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.config.productionTip = false;

//Set up VueRouter
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: "history",
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      //Redirect to login route
      next({
        name: "login",
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      //Redirect to garage route
      next({
        name: "garage",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
