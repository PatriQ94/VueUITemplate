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
      <v-btn text to="/">
        <span>Home</span>
      </v-btn>
      <v-btn text to="/about">
        <span>About</span>
      </v-btn>
      <v-btn text to="/login">
        <span>Login</span>
      </v-btn>
      <v-btn text to="/register">
        <span>Register</span>
      </v-btn>
      <v-btn text>
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
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
