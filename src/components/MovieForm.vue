<template>
  <section>
    <div class="card pa-30">
      <form v-on:submit.prevent>
        <div class="layout-column mb-15">
          <label for="name" class="mb-3">Movie Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter Movie Name"
            data-testid="nameInput"
            v-model="movie.name"
            @input="userTyping"
          />
        </div>
        <div class="layout-column mb-15">
          <label for="ratings" class="mb-3">Ratings</label>
          <input
            type="number"
            id="ratings"
            placeholder="Enter Rating on a scale of 1 to 100"
            max="100"
            min="1"
            data-testid="ratingsInput"
            v-model.number="movie.ratings"
            @input="userTyping"
          />
        </div>
        <div class="layout-column mb-30">
          <label for="duration" class="mb-3">Duration</label>
          <input
            type="text"
            id="duration"
            placeholder="Enter duration in hours or minutes"
            data-testid="durationInput"
            v-model="movie.duration"
            @input="userTyping"
          />
        </div>
        <div
          v-show="isDurationValid === false"
          className="alert error mb-30"
          data-testid="alert"
        >
          Please specify time in hours or minutes (e.g. 2.5h or 150m)
        </div>
        <div class="layout-row justify-content-end">
          <button
            type="submit"
            class="mx-0"
            data-testid="addButton"
            @click="submitMovieForm"
          >
            Add Movie
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "MovieForm",
  data() {
    return {
      movie: {
        name: "",
        ratings: null,
        duration: ""
      },
      isDurationValid: null
    };
  },
  methods: {
    userTyping() {
      this.isDurationValid = null;
    },
    submitMovieForm() {
      if (!this.isValid()) {
        return;
      }
      this.$emit("add-movie", this.movie);
    },
    isValid() {
      if (
        !this.movie.duration.includes("h") &&
        !this.movie.duration.includes("m")
      ) {
        this.isDurationValid = false;

        return false;
      } else {
        this.isDurationValid = true;
      }
      if (!this.movie.name || !this.movie.ratings) {
        return false;
      }
      return true;
    }
  }
};
</script>
