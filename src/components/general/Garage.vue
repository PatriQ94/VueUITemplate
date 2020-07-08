<template>
  <v-container>
    <AddNew></AddNew>
    <v-layout row wrap>
      <v-flex xs12 sm12 md6 lg4 v-for="car in cars" :key="car.id">
        <v-card class="text-center ma-3" :elevation="10">
          <v-responsive class="pt-4">
            <v-avatar size="100" class="grey lighten-2">
              <img :src="avatarPath(car.brand)" />
            </v-avatar>
          </v-responsive>
          <v-card-text>
            <div class="subheading">{{car.brand}}</div>
            <div class="grey--text">{{car.model}}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="updateKilometers">
              <span>Update kilometers</span>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="removeCar">
              <span>Remove</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AddNew from "./AddNew";
import garageHelper from "@/helpers/garageHelper.js";

export default {
  components: {
    AddNew
  },
  data() {
    return {
      cars: garageHelper.getDummyData()
    };
  },
  methods: {
    getCarsByUser() {
      this.$store
        .dispatch("getCarsByUser")
        .then(response => {
          this.cars = response.data.value;
        })
        .catch(error => {
          return error;
        });
    },
    updateKilometers() {},
    removeCar() {},
    avatarPath(brand) {
      if (brand == "Škoda") {
        return "skoda.png";
      } else if (brand == "Volkswagen") {
        return "volkswagen.png";
      } else if (brand == "BMW") {
        return "bmw.png";
      }
    }
  },
  created() {
    //this.getCarsByUser();
  }
};
</script>

<style></style>
