import LandingPage from "./views/LandingPage.vue";
import About from "./views/About.vue";
import Garage from "./views/Garage.vue";
import Login from "./views/Login.vue";
import Logout from "./components/Logout.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: LandingPage,
    meta: {
      requiresVisitor: true,
      title: "Home",
    },
  },
  {
    path: "/garage",
    name: "garage",
    component: Garage,
    meta: {
      requiresAuth: true,
      title: "Garage",
    },
  },
  {
    path: "/About",
    name: "about",
    component: About,
    meta: {
      requiresAuth: true,
      title: "About",
    },
  },
  {
    path: "/Login",
    name: "login",
    component: Login,
    meta: {
      requiresVisitor: true,
      title: "Login",
    },
  },
  {
    path: "/Logout",
    name: "logout",
    component: Logout,
  },
];

export default routes;
