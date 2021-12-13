<template>
  <div class="p-2">
    <b-card no-body class="clients">
      <h2 class="p-2 px-3 mb-0">Список клиентов</h2>

      <div class="px-2">
        <SimpleTableFilter :filter.sync="filter" />
      </div>

      <b-table
        hover
        :items="clientsList"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        :filter="filter"
        class="clients-table"
        id="clients-table"
        show-empty
        @filtered="onFiltered"
        @row-clicked="clickItem"
        responsive
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
    </b-card>
  </div>
</template>

<script>
import SimpleTableFilter from "../../components/simpleTableFilter/index.vue";
export default {
  name: "ClientsList",
  data() {
    return {
      totalRows: 1,
      filter: null,
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
    clickItem(value) {
      this.$router.push(`/${value.id}`);
    },
  },
  created() {
    this.currentPage = this.$route.query.page || this.$store.state.tablePage;
  },
  watch: {
    clientsList: {
      handler(list) {
        this.totalRows = list.length;
      },
      immediate: true,
    },
    currentPage: {
      handler(page) {
        if (this.$route.query.page !== page)
        this.$store.state.tablePage = page;
        this.$router.replace({
          path: this.$route.path,
          query: { page },
        });
      },
    },
  },
  components: {
    SimpleTableFilter,
  },
};
</script>

<style lang="sass">
.clients
  &-table
    & td, & th
      text-align: left
      cursor: pointer
</style>