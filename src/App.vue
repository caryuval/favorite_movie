<template>
  <div id="app">
    <h8k-navbar-head />
    <div class="layout-row justify-content-center mt-100">
      <div class="w-30 mr-75">
        <movie-form @add-movie="addMovie" />
      </div>
      <div class="layout-column w-30">
        <search :query="searchQuery" @search="updateSearchQuery" />
        <movie-list v-if="shouldShowMovieList" :movies="moviesToDisplay" />
        <div
          v-if="didStartSearch && !foundMovies.length"
          data-testid="noResult"
        >
          <h3 class="text-center">No Results Found</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import Search from "./components/Search";
import H8kNavbarHead from "./components/h8k/H8kNavbarHead";

export default {
  name: "App",
  components: {
    MovieForm,
    MovieList,
    Search,
    H8kNavbarHead
  },
  data() {
    return {
      movies: [],
      foundMovies: [],
      didStartSearch: false,
      searchQuery: ""
    };
  },
  computed: {
    shouldShowMovieList() {
      return this.didStartSearch
        ? this.foundMovies.length > 0
        : this.movies.length > 0;
    },
    moviesToDisplay() {
      return this.didStartSearch ? this.foundMovies : this.movies;
    }
  },
  methods: {
    addMovie(movie) {
      let duration = movie.duration;
      if (duration.includes("m")) {
        const durationNoCharacter = Number(duration.replace("m", ""));
        duration = (durationNoCharacter / 60).toFixed(1);
      } else {
        duration = duration.replace("h", "");
      }
      const newMovie = {
        ...movie,
        duration,
        id: Date.now()
      };
      this.movies.push(newMovie);
    },
    searchMovies(movieNameQuery) {
      const lowerCaseMovieNameQuery = movieNameQuery.toLowerCase();
      const foundMovies = this.movies.filter(
        movie => movie.name.toLowerCase().indexOf(lowerCaseMovieNameQuery) === 0
      );
      if (foundMovies) {
        this.foundMovies = [...foundMovies];
      }
      this.didStartSearch = true;
    },
    updateSearchQuery(event) {
      this.searchQuery = event.target.value;
      if (this.searchQuery.length > 1) {
        this.searchMovies(this.searchQuery);
      } else if (!this.searchQuery.length) {
        this.didStartSearch = false;
      }
    }
  }
};
</script>

<style>
@import "../node_modules/h8k-design/dist/index.css";
</style>
