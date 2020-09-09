import LandingPage from "./views/LandingPage.vue";
import About from "./views/About.vue";
import Login from "./views/Login.vue";
import Logout from "./components/Logout.vue";
import MovieSearch from "./views/MovieSearch.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: LandingPage,
    meta: {
      requiresVisitor: true,
      title: "Home"
    }
  },
  {
    path: "/moviesearch",
    name: "moviesearch",
    component: MovieSearch,
    meta: {
      requiresAuth: true,
      title: "MovieSearch"
    }
  },
  {
    path: "/About",
    name: "about",
    component: About,
    meta: {
      requiresAuth: true,
      title: "About"
    }
  },
  {
    path: "/Login",
    name: "login",
    component: Login,
    meta: {
      requiresVisitor: true,
      title: "Login"
    }
  },
  {
    path: "/Logout",
    name: "logout",
    component: Logout
  }
];

export default routes;
