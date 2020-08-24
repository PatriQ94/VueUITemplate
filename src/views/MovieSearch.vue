<template>
  <v-container class="mb-4">
    <v-text-field
      solo
      label="Search by titles, people..."
      append-icon="mdi-magnify"
      background-color="#A5A6AC"
      @click:append="searchByFilters"
    ></v-text-field>
    <v-layout row wrap>
      <v-flex xs6 sm4 md3 lg2 v-for="movie in movies" :key="movie.Id">
        <v-hover v-slot:default="{ hover }">
          <v-card class="ma-3" :elevation="hover ? 16 : 5" :style="cardColors">
            <v-responsive>
              <v-img :src="movie.posterPath"></v-img>
            </v-responsive>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <!-- <div
                  v-bind="attrs"
                  v-on="on"
                  class="black--text text-truncate font-weight-black px-2 title"
                >
                  {{ movie.title }}
                </div> -->
                <div class="font-weight-black ma-4 line-clamp">
                  <span v-bind="attrs" v-on="on" class="black--text">{{
                    movie.title
                  }}</span>
                </div>
              </template>
              <span>{{ movie.titleFull }}</span>
            </v-tooltip>

            <v-card-subtitle>
              Release: {{ movie.releaseDate }}
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
              <span style="pl-5">Summary</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="movie.summary = !movie.summary">
                <v-icon>{{
                  movie.summary ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-if="movie.summary">
                <v-divider></v-divider>
                <v-card-text>
                  {{ movie.overview }}
                </v-card-text>
                <v-btn text>Summary</v-btn>
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
    },
    searchByFilters() {
      this.marker = !this.marker;
    }
  },
  created() {
    this.getByPopularity();
  }
};
</script>

<style scoped>
.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}

.line-clamp {
  height: 48px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

>>> .v-input__slot {
  border: solid !important;
  border-color: #bc4121 !important;
}
</style>
