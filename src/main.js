import Vue from "vue";
import Master from "./components/layouts/Master.vue"
import VueRouter from "vue-router"
import {store} from "./store/store"
import routes from "./routes"


Vue.config.productionTip = false;
Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  store,
  router,
  render: h => h(Master)
}).$mount("#app");
