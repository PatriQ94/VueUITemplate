<template>
  <v-container>
    <AddNew @getCarsByUser="getCarsByUser()"></AddNew>
    <v-layout row wrap>
      <v-flex xs12 sm12 md6 lg4 v-for="car in cars" :key="car.id">
        <v-card class="text-center ma-3" :elevation="5">
          <v-responsive class="pt-4">
            <v-avatar size="100" class="grey lighten-2">
              <img :src="avatarPath(car.brand)" />
            </v-avatar>
          </v-responsive>
          <v-card-text>
            <div class="subheading">{{ car.brand }}</div>
            <div class="grey--text">{{ car.model }}</div>
          </v-card-text>
          <v-card-actions>
            <UpdateKilometers :kilometers="car.kilometers"></UpdateKilometers>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="error"
                  @click="removeCar(car.id)"
                  v-bind="attrs"
                  v-on="on"
                >
                  <span>Remove</span>
                </v-btn>
              </template>
              <span>Remove this car</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AddNew from "@/components/AddNew.vue";
import UpdateKilometers from "@/components/UpdateKilometers.vue";
import api from "@/api";

export default {
  components: {
    AddNew,
    UpdateKilometers
  },
  data() {
    return {
      cars: []
    };
  },
  methods: {
    getCarsByUser() {
      api
        .get("/api/Car/GetByUser")
        .then(response => {
          this.cars = response.data.value;
        })
        .catch(() => {
          this.$store.dispatch("raiseNotification", {
            show: true,
            color: "error",
            text: "An error occured"
          });
        });
    },
    updateKilometers() {
      this.updateKmPopup = true;
    },
    removeCar(carId) {
      api
        .post("/api/Car/Remove", {
          CarID: carId
        })
        .then(() => {
          this.$store.dispatch("raiseNotification", {
            show: true,
            color: "success",
            text: "Successfuly removed car"
          });
          this.getCarsByUser();
        })
        .catch(error => {
          var errorMessage = null;
          if (
            error.response.data != null &&
            error.response.data.errorMessage != null
          ) {
            errorMessage = error.response.data.errorMessage;
          }
          if (errorMessage == null) {
            errorMessage = error.response.data;
          }

          this.$store.dispatch("raiseNotification", {
            show: true,
            color: "error",
            text: errorMessage
          });
        });
    },
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
    this.getCarsByUser();
  }
};
</script>

<style></style>
