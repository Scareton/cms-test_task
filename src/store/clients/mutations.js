export default {
  update(state, client) {
    const index = state.list.findIndex((i) => i.id === client.id);
    if (index !== -1) {
      state.list[index] = client;
    } else console.error("Client not found: ", client.id);
  },
};
