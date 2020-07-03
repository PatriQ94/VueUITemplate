<template>
  <v-app>
    <v-app-bar app>
      <!-- -->
    </v-app-bar>
    <v-app-bar app>
      <v-toolbar-title class="headline">
        <span>Car</span>
        <span class="font-weight-light">API</span>
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
    <v-footer absolute class="font-weight-medium">
      <v-col class="text-center" cols="12">
        <v-btn v-bind:color="connectionBtnColor" @click="checkConnection()">
          <span>Check connection with back-end</span>
          <v-icon right>bluetooth</v-icon>
        </v-btn>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
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
      loadInProgress: false
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
      this.$store
        .dispatch("checkConnection")
        .then(response => {
          this.connectionBtnColor = "success";
          setTimeout(() => {
            this.loadInProgress = false;
            this.connectionBtnColor = "normal";
          }, 2000);
          return response;
        })
        .catch(error => {
          this.connectionBtnColor = "error";
          setTimeout(() => {
            this.loadInProgress = false;
            this.connectionBtnColor = "normal";
          }, 2000);
          return error;
        });
    }
  }
};
</script>
