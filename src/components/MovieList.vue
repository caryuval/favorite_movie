<template>
  <section>
    <ul class="styled w-100 pl-0" data-testid="moviesList">
      <li
        class="flex slide-up-fade-in justify-content-between"
        style="border-bottom: 2px solid var(--primary-color)"
        data-testid="movieListItem"
      >
        <div class="layout-column w-40">
          <!-- use this header for movie name -->
          <h3 class="my-3"></h3>
          <!-- use this paragraph for movie ratings, for example: 'Ratings: 88/100' -->
          <p class="my-0"></p>
        </div>
        <div class="layout-row my-auto mr-20">
          <!-- use this paragraph for movie duration, for example: '2.5 Hrs' -->
          <p class="justify-content-end"></p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "MovieList"
};
</script>
