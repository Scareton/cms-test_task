export default {
  getById: (state) => (id) => {
    return Object.assign([], state.list.find((i) => i.id === id));
  },
};
