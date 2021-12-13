<template>
  <div class="flex-sm-row flex-column">
    <b-form-input v-model="value" @input="updateFilter" placeholder="Поиск..."></b-form-input>
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