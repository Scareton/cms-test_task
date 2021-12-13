export default {
  getById: (state) => (id) => {
    return state.list.find((i) => i.id === id);
  },
};
