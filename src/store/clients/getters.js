export default {
  getListByFilters:
    (state) =>
    ({ offset = 0, limit = 0 }) => {
      let list = [...state.list];
      return list.slice(offset, offset + limit);
    },

  listWithManagers:
    (state, getters, rootState, rootGetters) => (offset, limit) => {
      const list = getters.getListByFilters({ offset, limit });
      for (let index = 0; index < list.length; index++) {
        const client = list[index];
        const manager = rootGetters["managers/getById"](client.manager);
        client.manager &&= manager;
      }
      return list;
    },
};
