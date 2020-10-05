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

    <!-- App bar on top of the screen -->
    <AppBar></AppBar>

    <!-- Main content with vue-router-->
    <v-main>
      <v-container fluid>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>

    <!-- Footer on bottom of the screen -->
    <Footer></Footer>
  </v-app>
</template>

<script>
import api from "@/api";
import { mapState } from "vuex";
import AppBar from "./components/AppBar";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    AppBar,
    Footer
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || "MovieAPI";
      }
    }
  },
  data() {
    return {
      timeout: 3000,
      colors: {
        //backgroundColor: "#0B172A"
        backgroundColor: "#1B3F52"
      }
    };
  },
  computed: {
    ...mapState(["notification"])
  },
  methods: {}
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
