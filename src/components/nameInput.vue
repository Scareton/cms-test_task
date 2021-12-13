<template>
  <b-form-group
    class="flex-fill"
    label="ФИО"
    label-for="name"
    label-align="left"
    :invalid-feedback="invalidFeedback"
  >
    <b-form-input id="name" :state="rules" :value="value" @input="input"></b-form-input>
  </b-form-group>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      invalidFeedback: "ФИО не может быть менее 4 символов",
    };
  },
  computed: {
    rules() {
      return this.value.length > 3;
    },
  },
  methods: {
    input(value) {
      this.$emit("update:value", value);
    },
  },
  watch: {
    rules(value) {
      this.$emit("update:state", value);
    },
  },
};
</script>