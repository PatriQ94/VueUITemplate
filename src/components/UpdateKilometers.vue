<template>
  <v-dialog max-width="600px" v-model="updateKmPopup">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on">
        <span>Update kilometers</span>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Current car kilometers {{ kilometers }}</v-card-title>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "@/api";
import carService from "@/services/CarService";

export default {
  props: { kilometers: Number },
  data() {
    return {
      updateKmPopup: false
    };
  },
  created() {
    carService.UpdateKilometers();
  }
};
</script>

<style></style>
