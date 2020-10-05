<template>
  <v-container class="mb-4">
    <v-text-field
      solo
      label="Search by titles, people..."
      append-icon="mdi-magnify"
      background-color="#A5A6AC"
      @click:append="searchByFilters"
      @keydown.enter="searchByFilters"
      v-model="searchKeyWord"
    ></v-text-field>
    <v-layout row wrap>
      <v-flex xs6 sm4 md3 lg2 v-for="movie in movies" :key="movie.Id">
        <v-hover v-slot:default="{ hover }" open-delay="200">
          <v-card class="ma-3" :elevation="hover ? 16 : 5" :style="cardColors">
            <!-- Poster -->
            <v-responsive>
              <v-img class="poster" :src="movie.posterPath"></v-img>
            </v-responsive>

            <!-- Title -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <div
                  v-bind="attrs"
                  v-on="on"
                  class="black--text text-truncate px-2 title titleStlye"
                >
                  {{ movie.title }}
                </div>
              </template>
              <span>{{ movie.titleFull }}</span>
            </v-tooltip>

            <!-- Year -->
            <div class="font-weight-light ml-2 mb-4">
              <span class="black--text">
                {{ movie.releaseDate }}
              </span>
            </div>

            <!-- Rating -->
            <v-card-actions class="mt-n8">
              <span class="black--text caption mt-2 mr-2">
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

            <v-expand-transition>
              <div v-show="hover">
                <v-divider></v-divider>
                <v-card-actions>
                  <!-- Heart icon to add movie to the favourite list -->
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="favButton"
                        elevation="0"
                        outlined=""
                        fab
                        small
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon v-if="movie.favourite" medium class="favIcon"
                          >mdi-heart</v-icon
                        >
                        <v-icon v-else medium class="favIcon"
                          >mdi-heart-outline</v-icon
                        >
                      </v-btn>
                    </template>
                    <span v-if="movie.favourite">Remove from favourites</span>
                    <span v-else>Add to favourites</span>
                  </v-tooltip>

                  <!-- Already seen button -->
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="favButton"
                        elevation="0"
                        outlined=""
                        fab
                        small
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon v-if="movie.seen" medium
                          >mdi-eye-check-outline</v-icon
                        >
                        <v-icon v-else medium>mdi-eye-off-outline</v-icon>
                      </v-btn>
                    </template>
                    <span v-if="movie.seen">Already seen</span>
                    <span v-else>Mark as seen</span>
                  </v-tooltip>
                  <v-spacer></v-spacer>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        outlined=""
                        fab
                        small
                        @click="movie.summary = !movie.summary"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon>mdi-chevron-down</v-icon>
                      </v-btn>
                    </template>
                    <span>More info</span>
                  </v-tooltip>
                </v-card-actions>
              </div>
            </v-expand-transition>

            <v-expand-transition>
              <div v-if="movie.summary">
                <v-divider></v-divider>
                <v-card-text>
                  {{ movie.overview }}
                </v-card-text>
                <v-btn text>More info</v-btn>
              </div>
            </v-expand-transition>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import api from "@/api";

export default {
  data() {
    return {
      movies: [],
      overlay: false,
      cardColors: {
        background: "#A5A6AC"
        // border: "3px solid #BC4123"
      },
      searchKeyWord: "",
      page: 1,
      lastSearch: ""
    };
  },
  methods: {
    searchByFilters(addToExisting) {
      if (this.lastSearch != this.searchKeyWord) {
        this.page = 1;
        this.movies = [];
        console.log(
          "Reseting page counter cause the search keyword changed:" + this.page
        );
      }

      console.log(
        "Searching by keyword:" + this.searchKeyWord + ", and page:" + this.page
      );

      api
        .post("/api/Movie/GetByKeyWords", {
          SearchKeyWord: this.searchKeyWord,
          Page: this.page
        })
        .then(response => {
          if (addToExisting == true) {
            response.data.value.forEach(movie => {
              this.movies.push(movie);
            });
          } else {
            this.movies = response.data.value;
          }
          this.overlay = false;
        })
        .catch(error => {
          console.log(error);
          this.overlay = false;
          this.$store.dispatch("raiseNotification", {
            show: true,
            color: "error",
            text: "An error occured"
          });
        });
      this.lastSearch = this.searchKeyWord;
    },
    scroll(person) {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          if (this.overlay == true) {
            return;
          }
          this.overlay = true;
          this.page = this.page + 1;
          this.searchByFilters(true);
        }
      };
    }
  },
  created() {
    this.searchByFilters(false);
  },
  mounted() {
    this.scroll(this.person);
  }
};
</script>

<style scoped>
.favButton .favIcon {
  color: red;
}

.poster {
  min-height: 250px;
}

.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}
.titleStlye {
  font-size: 17px !important;
}

.line-clamp {
  height: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

::v-deep .v-input__slot {
  border: solid !important;
  border-color: #bc4121 !important;
}
</style>
