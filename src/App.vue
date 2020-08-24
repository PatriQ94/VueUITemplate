<template>
  <v-app v-bind:style="{ background: colors.backgroundColor }">
    <v-snackbar
      v-model="notification.show"
      :color="notification.color"
      :timeout="timeout"
      :top="true"
      :right="true"
    >
      {{ notification.text }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="notification.show = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    <v-app-bar flat app color="transparent" hide-on-scroll>
      <v-toolbar-title class="headline white--text">
        <span class="font-weight-light">Movie</span>
        <span>API</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="white--text" v-if="!loggedIn" text to="/">
        <span>Home</span>
      </v-btn>
      <v-btn class="white--text" v-if="loggedIn" text to="/moviesearch">
        <span>Movie search</span>
      </v-btn>
      <v-btn class="white--text" v-if="loggedIn" text to="/about">
        <span>About</span>
      </v-btn>
      <v-btn
        class="white--text"
        :style="logoutLoginButtonColor"
        v-if="!loggedIn"
        text
        to="/login"
      >
        <span>Login/Register</span>
      </v-btn>
      <v-btn
        class="white--text"
        :style="logoutLoginButtonColor"
        v-if="loggedIn"
        text
        to="/logout"
      >
        <span>Logout</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main content with vue-router-->
    <v-main>
      <v-container fluid>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>
    <v-footer
      color="#355B6D"
      :elevation="24"
      absolute
      class="font-weight-medium"
      app
    >
      <v-col heigth="200" class="text-center" cols="12">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind:color="connectionBtnColor"
              @click="checkConnection()"
              v-bind="attrs"
              v-on="on"
            >
              <span>Test connection</span>
              <v-icon right>bluetooth</v-icon>
            </v-btn>
          </template>
          <span>Check connection with the back-end server</span>
        </v-tooltip>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import api from "@/api";
import { mapState } from "vuex";

export default {
  name: "App",
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || "CarAPI";
      }
    }
  },
  data() {
    return {
      connectionBtnColor: "normal",
      loadInProgress: false,
      timeout: 3000,
      colors: {
        //backgroundColor: "#0B172A"
        backgroundColor: "#1B3F52"
      },
      logoutLoginButtonColor: { background: "#BC4123" }
    };
  },
  computed: {
    ...mapState(["notification"]),
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  },
  methods: {
    checkConnection() {
      if (this.loadInProgress == true) {
        return;
      }
      this.loadInProgress = true;
      api
        .get("/health")
        .then(response => {
          this.connectionBtnColor = "success";
          this.$store.dispatch("raiseNotification", {
            show: true,
            color: "success",
            text: "Connected with the back-end API"
          });

          setTimeout(() => {
            this.loadInProgress = false;
            this.connectionBtnColor = "normal";
          }, this.timeout);
          return response;
        })
        .catch(error => {
          this.$store.dispatch("raiseNotification", {
            show: true,
            color: "error",
            text: "Not connected with the back-end API"
          });
          this.connectionBtnColor = "error";
          setTimeout(() => {
            this.loadInProgress = false;
            this.connectionBtnColor = "normal";
          }, this.timeout);
          return error;
        });
    }
  }
};
</script>

<style lang="scss">
// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 0.2s;
// }
// .fade-enter,
// .fade-leave-to {
//   opacity: 0;
// }

.fade-enter-active,
.fade-leave-active {
  transition: transform 0.5s;
}

.fade-enter,
.fade-leave-to {
  transform: translateX(-100%);
}

.fade-enter-to,
.fade-leave {
  transform: translateX(0);
}
</style>
