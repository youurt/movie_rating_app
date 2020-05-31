<template>
  <v-layout row wrap>
    <v-flex xs4 v-for="movie in movies" :key="movie._id">
      <v-card class="card">
        <v-card-title primary-title class="card__title--primary">
          <div>
            <div class="headline">
             {{ movie.name }}
            </div>
            <span class="grey--text"
              >{{ movie.release_year }} | {{ movie.genre }}
            </span>
          </div>
        </v-card-title>
        <v-card-text class="card__text">
          {{ movie.description }}
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";

export default {
  name: "Movies",
  data() {
    return {
      movies: []
    };
  },
  mounted() {
    this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      return axios({
        method: "get",
        url: "http://localhost:8081/movies"
      })
        .then(response => {
          this.movies = response.data.movies;
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
.card__title--primary,
.card__text {
  text-align: left;
}

.card {
  height: 100% !important;
}
</style>
