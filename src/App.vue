<template>
  <div id="app">
    <h8k-navbar-head />
    <div class="layout-row justify-content-center mt-100">
      <div class="w-30 mr-75">
        <movie-form />
      </div>
      <div class="layout-column w-30">
        <search />
        <movie-list v-show="foundMovies.length > 0" />
        <div
          v-show="didStartSearch && !foundMovies.length"
          data-testid="noResult"
        >
          <h3 class="text-center">No Results Found</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
  computed: {
    ...mapGetters(["foundMovies", "didStartSearch"])
  }
};
</script>

<style>
@import "../node_modules/h8k-design/dist/index.css";
</style>
