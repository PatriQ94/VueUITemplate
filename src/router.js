import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { store } from "./store";

Vue.config.productionTip = false;

//Set up VueRouter
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: "history"
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      //Redirect to login route
      next({
        name: "login"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      //Redirect to moviesearch route
      next({
        name: "moviesearch"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
