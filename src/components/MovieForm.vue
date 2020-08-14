<template>
  <section>
    <div class="card pa-30">
      <form v-on:submit.prevent>
        <div class="layout-column mb-15">
          <label for="name" class="mb-3">Movie Name</label>
          <input type="text" id="name" placeholder="Enter Movie Name" data-testid="nameInput" />
        </div>
        <div class="layout-column mb-15">
          <label for="ratings" class="mb-3">Ratings</label>
          <input
            type="number"
            id="ratings"
            placeholder="Enter Rating on a scale of 1 to 100"
            data-testid="ratingsInput"
          />
        </div>
        <div class="layout-column mb-30">
          <label for="duration" class="mb-3">Duration</label>
          <input
            type="text"
            id="duration"
            placeholder="Enter duration in hours or minutes"
            data-testid="durationInput"
          />
        </div>
        <!-- Use this div when time format is invalid -->
        <!-- <div 
            className='alert error mb-30'
            data-testid='alert'
          >
            Please specify time in hours or minutes (e.g. 2.5h or 150m)
        </div>-->
        <div class="layout-row justify-content-end">
          <button type="submit" class="mx-0" data-testid="addButton">Add Movie</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "MovieForm"
};
</script>
