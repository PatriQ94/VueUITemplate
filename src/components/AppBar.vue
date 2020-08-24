<template>
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
</template>

<script>
export default {
  name: "AppBar",
  data() {
    return {
      logoutLoginButtonColor: { background: "#BC4123" }
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  }
};
</script>

<style></style>
