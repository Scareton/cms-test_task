import Vue from "vue";
import Vuex from "vuex";

import clientsModule from "./clients/index";
import managersModule from "./managers/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      tablePage: 1,
    };
  },
  actions: {
    createToast(args, { text, title }) {
      console.log(text, title);
      this.$app.$root.$bvToast.toast(text, {
        title: title,
        autoHideDelay: 5000,
        toaster: "b-toaster-bottom-right",
      });
    },
  },
  modules: {
    clients: clientsModule,
    managers: managersModule,
  },
});
