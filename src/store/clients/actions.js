export default {
  update({ commit }, client) {
    if (client.manager?.id) client.manager = client.manager.id;
    commit("update", { ...client });
  },
};
