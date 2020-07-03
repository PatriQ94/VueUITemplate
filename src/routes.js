import LandingPage from "./components/general/LandingPage.vue";
import About from "./components/general/About.vue";
import Garage from "./components/general/Garage.vue";
import Login from "./components/auth/Login.vue";
import Logout from "./components/auth/Logout.vue";

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
