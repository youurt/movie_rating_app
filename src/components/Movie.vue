<template>
  <v-layout row wrap>
    <v-flex xs4>
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{ movie.name }}</div>
            <span class="grey--text"
              >{{ movie.release_year }} ‧ {{ movie.genre }}</span
            >
          </div>
        </v-card-title>
        <h6 class="card-title" @click="rate">Rate this movie</h6>
        <v-card-text>
          {{ movie.description }}
        </v-card-text>
        <h6 class="card-title" @click="delete_movie">Delete this movie</h6>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import StarRating from "vue-star-rating";

const wrapper = document.createElement("div");
// shared state
const state = {
  note: 0
};
// crate component to content
const RatingComponent = Vue.extend({
  data() {
    return { rating: 0 };
  },
  watch: {
    rating(newVal) {
      state.note = newVal;
    }
  },
  template: `
    <div class="rating">
      How was your experience getting help with this issues?
      <star-rating v-model="rating" :show-rating="false"></star-rating>
    </div>`,
  components: { "star-rating": StarRating }
});

const component = new RatingComponent().$mount(wrapper);

export default {
  name: "Movie",
  data() {
    return {
      movie: []
    };
  },
  mounted() {
    this.fetchMovie();
  },
  methods: {
    async rate() {
      this.$swal({
        content: component.$el,
        buttons: {
          confirm: {
            value: 0
          }
        }
      }).then(() => {
        const movieId = this.$route.params.id;
        return axios({
          method: "post",
          data: {
            rate: state.note
          },
          url: `http://localhost:8081/movies/rate/${movieId}`,
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(() => {
            this.$swal(`Thank you for rating! ${state.note}`, "success");
          })
          .catch(error => {
            const message = error.response.data.message;
            this.$swal("Oh oo!", `${message}`, "error");
          });
      });
    },
    async fetchMovie() {
      return axios({
        method: "get",
        url: `http://localhost:8081/api/movies/${this.$route.params.id}`
      })
        .then(response => {
          this.movie = response.data;
        })
        .catch(() => {});
    },

    async delete_movie() {
      return axios({
        method: "delete",
        data: {
          name: this.name,
          description: this.description,
          release_year: this.release_year,
          genre: this.genre
        },
        url: `http://localhost:8081/api/movies/${this.$route.params.id}`,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(() => {
          this.$swal(
            "Great!",
            "Movie deleted successfully!",
            "success"
          );
          this.$router.push({ name: "Home" });
        })
        .catch(() => {
          this.$swal("Oh oo!", "Could not add the movie!", "error");
        });
    }
  }
};
</script>
