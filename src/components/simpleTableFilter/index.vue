<template>
  <div class="p-2">
    <div class="d-flex table-filter__wrapper">
      <b-form-input v-model="value" @input="updateFilter" placeholder="Поиск..."></b-form-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "SimpleTableFilter",
  props: ["filter"],
  data() {
    return {
      value: null,
    };
  },
  methods: {
    updateFilter() {
      this.$emit("update:filter", this.value);
    },
  },
  mounted() {
    this.value = this.filter;
  },
};
</script>

<style lang="sass">
.table-filter
  &__wrapper
    column-gap: 6px
    row-gap: 6px
    @media (max-width: 767.98px)
      flex-direction: column
    & > *
      max-width: 320px
      @media (max-width: 767.98px)
        max-width: unset
</style>