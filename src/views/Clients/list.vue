<template>
  <div class="clients">
    <b-table  hover :items="clientsList" class="clients-table"></b-table>
  </div>
</template>

<script>
export default {
  name: "ClientsList",
  computed: {
    clientsList() {
      return this.$store.getters['clients/listWithManagers']
    },
  },
};
</script>