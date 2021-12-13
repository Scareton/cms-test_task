<template>
  <div class="client p-2 mt-sm-4 mx-auto">
    <b-card v-if="client" :header="`Клиент #${client.id}`">
      <div class="d-flex flex-sm-row flex-column flex-gap-2">
        <b-form-group class="flex-fill" label="ФИО" label-for="name" label-align="left">
          <b-form-input id="name" v-model="client.name"></b-form-input>
        </b-form-group>
        <b-form-group class="flex-fill" label="Менеджер" label-for="manager" label-align="left">
          <manager-select :selected.sync="client.manager" />
        </b-form-group>
      </div>

      <template #footer>
        <div class="d-flex flex-gap-2 flex-sm-row flex-column justify-content-end">
          <b-button pill variant="outline-secondary" to="/">Отмена</b-button>
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
      return !_isEqual({ ...this.client }, { ...this.originalClient });
    },
  },
  methods: {
    fetchClient() {
      this.client = Object.assign({}, this.originalClient);
      if (!this.client) this.$router.replace("/");
    },
    save() {
      this.$store.dispatch("clients/update", this.client);
      this.$store.dispatch("createToast", {
        title: "Успешно",
        text: `Клиент #${this.client.id} сохранён`,
      });
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

<style lang="sass">
.client
  max-width: 1024px
</style>