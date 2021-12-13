<template>
  <div class="p-2">
    <b-card v-if="client" :header="`Клиент #${client.id}`">
      <div class="d-flex flex-sm-row flex-column flex-gap-2">
        <b-form-input v-model="client.name" placeholder="ФИО"></b-form-input>
        <manager-select :selected.sync="client.manager" />
      </div>

      <template #footer>
        <div class="d-flex flex-gap-2 flex-sm-row flex-column">
          <b-button pill variant="outline-secondary" to="/">Вернуться назад</b-button>
          <b-button pill variant="primary" @click="save" :disabled="!formTouched">Сохранить</b-button>
        </div>
      </template>
    </b-card>
  </div>
</template>

<script>
import ManagerSelect from "../../components/managerSelect.vue";

import _isEqual from "lodash.isequal";

export default {
  name: "ClientsForm",
  data() {
    return {
      client: null,
    };
  },
  computed: {
    originalClient() {
      return this.$store.getters["clients/getById"](
        this.$route.params.clientId
      );
    },
    formTouched() {
      return !_isEqual({...this.client}, {...this.originalClient});
    },
  },
  methods: {
    fetchClient() {
      this.client = Object.assign({}, this.originalClient);
      if (!this.client) this.$router.replace("/");
    },
    save() {
      this.$store.dispatch("clients/update", this.client);
      this.$router.push("/");
    },
  },
  watch: {
    originalClient: {
      handler() {
        this.fetchClient();
      },
      immediate: true,
      deep: true,
    },
  },
  components: {
    ManagerSelect,
  },
};
</script>