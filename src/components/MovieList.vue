<template>
  <section>
    <ul class="styled w-100 pl-0" data-testid="moviesList">
      <li
        class="flex slide-up-fade-in justify-content-between"
        style="border-bottom: 2px solid var(--primary-color)"
        data-testid="movieListItem"
        v-for="movie in sortedFoundMovies"
        :key="movie.id"
      >
        <div class="layout-column w-40">
          <!-- use this header for movie name -->
          <h3 class="my-3">{{ movie.name }}</h3>
          <!-- use this paragraph for movie ratings, for example: 'Ratings: 88/100' -->
          <p class="my-0">Ratings: {{ movie.ratings }}/100</p>
        </div>
        <div class="layout-row my-auto mr-20">
          <!-- use this paragraph for movie duration, for example: '2.5 Hrs' -->
          <p class="justify-content-end">
            {{ movie.duration }} {{ movie.duration > 1 ? "Hrs" : "h" }}
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MovieList",
  computed: {
    ...mapGetters(["sortedFoundMovies"])
  }
};
</script>
