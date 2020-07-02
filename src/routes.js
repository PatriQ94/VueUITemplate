import LandingPage from "./components/general/LandingPage.vue";
import About from "./components/general/About.vue";
import Login from "./components/auth/Login.vue";
import Register from "./components/auth/Register.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: LandingPage
  },
  {
    path: "/About",
    name: "about",
    component: About
  },
  {
    path: "/Login",
    name: "login",
    component: Login
  },
  {
    path: "/Register",
    name: "register",
    component: Register
  }
];

export default routes;
