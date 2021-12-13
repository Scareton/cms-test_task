<template>
  <div class="p-2">
    <div class="d-flex table-filter__wrapper">
      <b-form-input v-model="filterName" @input="updateFilter" placeholder="ФИО"></b-form-input>
      <manager-select :selected.sync="filterManager" @input="updateFilter" />
    </div>
  </div>
</template>

<script>
import ManagerSelect from "./managerSelect.vue";

export default {
  name: "TableFilter",
  props: {
    filter: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      filterName: null,
      filterManager: null,
    };
  },
  computed: {},
  methods: {
    updateFilter() {
      this.$emit("update:filter", {
        name: this.filterName,
        manager: this.filterManager,
      });
    },
  },
  components: {
    ManagerSelect,
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