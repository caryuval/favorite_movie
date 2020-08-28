<template>
  <section class="layout-row justify-content-center mb-40">
    <input
      type="text"
      placeholder="Search for movie by name"
      class="w-75 py-2"
      data-testid="search"
      :value="query"
      @input="$emit('search', $event)"
    />
  </section>
</template>

<script>
export default {
  name: "Search",
  props: {
    query: { type: String, required: true }
  }
};
</script>
