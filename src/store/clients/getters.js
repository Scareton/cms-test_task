export default {
  listWithManagers: (state, getters, rootState, rootGetters) => {
    const list = [...state.list];
    for (let index = 0; index < list.length; index++) {
      const client = { ...list[index] };
      const manager = rootGetters["managers/getById"](client.manager);
      client.manager &&= manager;
    }
    return list;
  },

  getById: (state) => (clientId) => {
    const list = [...state.list];
    const client = { ...list.find((i) => i.id === ~~clientId) };
    if (!client) return undefined;

    return client;
  },
};
