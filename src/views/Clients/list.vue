<template>
  <div class="clients">
    <h2 class="p-2 mb-0">Список клиентов</h2>

    <table-filter :filter.sync="filter" />

    <b-table
      hover
      :items="clientsList"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      :filter="filter"
      :filter-function="filterFunction"
      class="clients-table"
      id="clients-table"
      show-empty
      @filtered="onFiltered"
    >
      <template #cell(manager)="data">{{ data.item.manager.name }}</template>

      <template #emptyfiltered="{}">
        <h4>Клиенты не найдены</h4>
      </template>
    </b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      aria-controls="clients-table"
      class="clients-pagination justify-content-center"
    ></b-pagination>
  </div>
</template>

<script>
import TableFilter from "../../components/TableFilter/index.vue";
export default {
  name: "ClientsList",
  data() {
    return {
      totalRows: 1,
      filter: {},
      currentPage: 1,
      perPage: 10,
      fields: [
        { key: "id", label: "#", sortable: true },
        { key: "name", label: "ФИО", sortable: true },
        { key: "manager", label: "Менеджер", sortable: true },
      ],
    };
  },
  computed: {
    clientsList() {
      return this.$store.getters["clients/listWithManagers"];
    },
  },
  methods: {
    filterFunction(row, filter) {
      if (filter.name) if (!row.name.includes(filter.name)) return false;
      if (filter.manager) if (row.manager.id !== filter.manager) return false;
      return true;
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
  watch: {
    clientsList: {
      handler(list) {
        this.totalRows = list.length;
      },
      immediate: true,
    },
  },
  components: {
    TableFilter,
  },
};
</script>

<style lang="sass">
.clients
  &-table
    & td, & th
      text-align: left
</style>