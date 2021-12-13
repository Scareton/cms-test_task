export default {
  // getListByFilters:
  //   (state) =>
  //   ({ offset = 0, limit = 0 }) => {
  //     let list = [...state.list];
  //     if (!limit && !offset) return list;
  //     return list.slice(offset, offset + limit);
  //   },

  listWithManagers:
    (state, getters, rootState, rootGetters) => {
      const list = [...state.list]
      for (let index = 0; index < list.length; index++) {
        const client = list[index];
        const manager = rootGetters["managers/getById"](client.manager);
        client.manager &&= manager;
      }
      return list;
    },
};
