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
            v-model="form.movieName"
            @input="userTyping"
          />
        </div>
        <div class="layout-column mb-15">
          <label for="ratings" class="mb-3">Ratings</label>
          <input
            type="number"
            id="ratings"
            placeholder="Enter Rating on a scale of 1 to 100"
            data-testid="ratingsInput"
            v-model.number="form.ratings"
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
            v-model="form.duration"
            @input="userTyping"
          />
        </div>
        <div
          v-show="showDurationValidationAlert"
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
            @click="addMovie"
          >
            Add Movie
          </button>
        </div>
      </form>

      {{ isUserTyping ? "Typing" : "Not typing" }}
    </div>
  </section>
</template>

<script>
export default {
  name: "MovieForm",
  data() {
    return {
      form: {
        movieName: "",
        ratings: null,
        duration: ""
      },
      isDurationValid: null,
      isUserTyping: false,
      userTypingTimeout: null
    };
  },
  computed: {
    showDurationValidationAlert() {
      return this.isDurationValid === false && this.isUserTyping === false;
    }
  },
  methods: {
    userTyping() {
      this.isUserTyping = true;
      if (this.userTypingTimeout) {
        clearTimeout(this.userTypingTimeout);
      }
      this.userTypingTimeout = setTimeout(() => {
        this.isUserTyping = false;
      }, 1000);
    },
    addMovie() {
      if (!this.isValid()) {
        return;
      }
      const newMovie = { ...this.form };
      // Convert minutes to hours
      if (this.form.duration.includes("m")) {
        newMovie.duration = newMovie.duration / 60;
      }
      window.alert("Submited successfully");
    },
    isValid() {
      if (
        !this.form.duration.includes("h") &&
        !this.form.duration.includes("m")
      ) {
        this.isDurationValid = false;

        return false;
      }
      this.isDurationValid = true;
      return true;
    }
  }
};
</script>
