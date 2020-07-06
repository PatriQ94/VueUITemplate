<template>
  <v-container>
    <AddNew></AddNew>
    <v-layout row wrap>
      <v-flex xs12 sm12 md6 lg4 v-for="car in cars" :key="car.id">
        <v-card class="text-center ma-3" :elevation="10">
          <v-responsive class="pt-4">
            <v-avatar size="100" class="grey lighten-2">
              <img :src="car.avatar" />
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

export default {
  components: {
    AddNew
  },
  data() {
    return {
      cars: [
        {
          id: 8,
          brand: "Škoda",
          model: "Superb",
          year: 2005,
          kilometers: 2000,
          avatar: "skoda.png"
        },
        {
          id: 9,
          brand: "Volkswagen",
          model: "Amarok",
          year: 2020,
          kilometers: 50000,
          avatar: "volkswagen.png"
        },
        {
          id: 10,
          brand: "Škoda",
          model: "Octavia",
          year: 2015,
          kilometers: 500000,
          avatar: "skoda.png"
        },
        {
          id: 11,
          brand: "BMW",
          model: "M3",
          year: 2013,
          kilometers: 310,
          avatar: "bmw.png"
        },
        {
          id: 12,
          brand: "Volkswagen",
          model: "Golf",
          year: 2013,
          kilometers: 3100,
          avatar: "volkswagen.png"
        },
        {
          id: 13,
          brand: "Volkswagen",
          model: "Polo",
          year: 2013,
          kilometers: 7000,
          avatar: "volkswagen.png"
        }
      ]
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
    updateKilometers() {
      this.notificationColor = "success";
      this.notificationText = "Connected with the back-end API";
      this.notification = true;
    },
    removeCar() {}
  },
  created() {
    //this.getCarsByUser();
  }
};
</script>

<style></style>
