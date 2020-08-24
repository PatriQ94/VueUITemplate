<template>
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
</template>

<script>
import api from "@/api";

export default {
  name: "Footer",
  data() {
    return {
      connectionBtnColor: "normal"
    };
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

<style></style>
