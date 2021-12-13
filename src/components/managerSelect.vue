<template>
  <b-form-select
    :value="selected"
    :options="managers"
    value-field="id"
    text-field="name"
    @input="input"
    id="manager"
  ></b-form-select>
</template>

<script>
export default {
  name: "ManagerSelect",
  props: ["selected"],
  computed: {
    managers() {
      return [
        { id: null, name: "Менеджер" },
        ...this.$store.state.managers.list,
      ];
    },
  },
  methods: {
    input(value) {
      this.$emit("update:selected", value);
      this.$emit("input", value);
    },
  },
};
</script>