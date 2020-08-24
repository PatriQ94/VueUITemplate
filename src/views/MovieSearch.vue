<template>
  <v-container class="mb-4">
    <v-layout row wrap>
      <v-flex xs6 sm4 md3 lg2 v-for="movie in movies" :key="movie.Id">
        <v-hover v-slot:default="{ hover }">
          <v-card class="ma-3" :elevation="hover ? 16 : 5" :style="cardColors">
            <v-responsive>
              <v-img :src="movie.posterPath"></v-img>
            </v-responsive>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-card-title v-bind="attrs" v-on="on" class="black--text">{{
                  movie.title
                }}</v-card-title>
              </template>
              <span>{{ movie.titleFull }}</span>
            </v-tooltip>

            <v-card-subtitle>
              {{ movie.releaseDate }}
            </v-card-subtitle>
            <v-card-actions>
              <span class="black--text caption mr-2">
                ({{ movie.voteAverage }})
              </span>

              <v-rating
                :value="movie.voteAverageStar"
                background-color="#0B172A"
                color="#BC4123"
                dense
                half-increments
                size="20"
                readonly
              ></v-rating>
            </v-card-actions>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn text>Summary</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="show = !show">
                <v-icon>{{
                  show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>
                <v-card-text>
                  {{ movie.overview }}
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card></v-hover
        >
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import api from "@/api";

export default {
  data() {
    return {
      movies: [],
      show: false,
      cardColors: { background: "#A5A6AC", border: "3px solid #BC4123" }
    };
  },
  methods: {
    getByPopularity() {
      api
        .get("/api/Movie/GetByPopularity")
        .then(response => {
          this.movies = response.data.value;
        })
        .catch(() => {
          this.$store.dispatch("raiseNotification", {
            show: true,
            color: "error",
            text: "An error occured"
          });
        });
    }
  },
  created() {
    this.getByPopularity();
  }
};
</script>

<style>
.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>
