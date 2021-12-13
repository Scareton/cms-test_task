import Vue from "vue";
import Vuex from "vuex";

import clientsModule from "./clients/index";
import managersModule from "./managers/index";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    clients: clientsModule,
    managers: managersModule,
  },
});
