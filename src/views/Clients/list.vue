<template>
  <div class="clients">
    <b-table hover :items="clientsList" :fields="fields" class="clients-table">
      <template #cell(manager)="data">{{ data.item.manager.name }}</template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "ClientsList",
  data() {
    return {
      offset: 0,
      limit: 10,
      fields: [
        { key: "id", label: "#" },
        { key: "name", label: "ФИО" },
        { key: "manager", label: "Менеджер" },
      ],
    };
  },
  computed: {
    clientsList() {
      return this.$store.getters["clients/listWithManagers"](
        this.offset,
        this.limit
      );
    },
  },
};
</script>