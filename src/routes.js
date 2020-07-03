import LandingPage from "./components/general/LandingPage.vue";
import About from "./components/general/About.vue";
import Garage from "./components/general/Garage.vue";
import Login from "./components/auth/Login.vue";
import Logout from "./components/auth/Logout.vue";
import Register from "./components/auth/Register.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: LandingPage,
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: "/garage",
    name: "garage",
    component: Garage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/About",
    name: "about",
    component: About,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/Login",
    name: "login",
    component: Login,
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: "/Register",
    name: "register",
    component: Register,
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: "/Logout",
    name: "logout",
    component: Logout,
  },
];

export default routes;
