<template>
  <section class="layout-row justify-content-center mb-40">
    <input
      type="text"
      placeholder="Search for movie by name"
      class="w-75 py-2"
      data-testid="search"
      v-model="query"
      @input="onSearchChange"
    />
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Search",
  data() {
    return {
      query: ""
    };
  },
  methods: {
    ...mapActions(["searchMovies"]),
    onSearchChange() {
      if (this.query.length > 1) {
        this.searchMovies(this.query);
      }
    }
  }
};
</script>
