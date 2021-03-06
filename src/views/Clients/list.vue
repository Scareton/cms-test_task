<template>
  <div class="p-2">
    <b-card no-body class="clients">
      <b-card-header
        class="d-flex justify-content-between align-items-sm-center flex-sm-row flex-column flex-gap-2"
      >
        Список клиентов
        <SimpleTableFilter :filter.sync="filter" />
      </b-card-header>

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
        :filter-ignored-fields="searchIgnoredFields"
      >
        <template #cell(photo)="data">
          <b-avatar :src="data.item.photo"></b-avatar>
        </template>

        <template #cell(manager)="data">{{ data.item.manager.name }}</template>

        <template #emptyfiltered="{}">
          <h4>Клиенты не найдены</h4>
        </template>
      </b-table>

      <b-card-footer>
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          aria-controls="clients-table"
          class="clients-pagination justify-content-center mb-0"
        ></b-pagination>
      </b-card-footer>
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
        { key: "photo", label: "Фото", sortable: false, width: "45px" },
        { key: "name", label: "ФИО", sortable: true },
        { key: "manager", label: "Менеджер", sortable: true },
      ],
      searchIgnoredFields: ["photo"],
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
        if (this.$route.query.page !== page) {
          this.$store.state.tablePage = page;
          this.$router.replace({
            path: this.$route.path,
            query: { page },
          });
        }
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