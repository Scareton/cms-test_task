import _cloneDeep from 'lodash.clonedeep'

export default {
  listWithManagers: (state, getters, rootState, rootGetters) => {
    let list = _cloneDeep(state.list);
    for (let index = 0; index < list.length; index++) {
      const client = list[index];
      const manager = rootGetters["managers/getById"](client.manager);
      client.manager = manager;
    }
    return list;
  },
  getById: (state) => (clientId) => {
    let list = _cloneDeep(state.list);
    const client = { ...list.find((i) => i.id === ~~clientId) };
    if (!client) return undefined;

    return client;
  },
};
