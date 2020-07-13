<template>
  <v-app>
    <v-snackbar
      v-model="notification"
      :color="notificationColor"
      :timeout="timeout"
      :top="true"
      :right="true"
    >
      {{ notificationText }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="notification = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-app-bar app>
      <v-toolbar-title class="headline">
        <span class="font-weight-light">Car</span>
        <span>API</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!loggedIn" text to="/">
        <span>Home</span>
      </v-btn>
      <v-btn v-if="loggedIn" text to="/garage">
        <span>Garage</span>
      </v-btn>
      <v-btn v-if="loggedIn" text to="/about">
        <span>About</span>
      </v-btn>
      <v-btn v-if="!loggedIn" text to="/login">
        <span>Login/Register</span>
      </v-btn>
      <v-btn v-if="loggedIn" text to="/logout">
        <span>Logout</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main content with vue-router-->
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer absolute class="font-weight-medium" app>
      <v-col heigth="200" class="text-center" cols="12">
        <v-btn v-bind:color="connectionBtnColor" @click="checkConnection()">
          <span>Check connection with back-end</span>
          <v-icon right>bluetooth</v-icon>
        </v-btn>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import api from "@/api";

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
      notification: false,
      notificationColor: "success",
      notificationText: "",
      timeout: 3000
    };
  },
  computed: {
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
          this.notificationColor = "success";
          this.notificationText = "Connected with the back-end API";
          this.notification = true;
          setTimeout(() => {
            this.loadInProgress = false;
            this.connectionBtnColor = "normal";
          }, this.timeout);
          return response;
        })
        .catch(error => {
          this.connectionBtnColor = "error";
          this.notificationColor = "error";
          this.notificationText = "Not connected with the back-end API";
          this.notification = true;
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
