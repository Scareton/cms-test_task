<template>
  <b-form-select
    v-model="value"
    :options="managers"
    value-field="id"
    text-field="name"
    @input="input"
    label="Менеджер"
  ></b-form-select>
</template>

<script>
export default {
  name: "ManagerSelect",
  props: ["selected"],
  data() {
    return {
      value: null,
    };
  },
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