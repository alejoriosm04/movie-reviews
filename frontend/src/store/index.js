import { createStore } from 'vuex';

export default createStore ({
  state: {
    user: {
      id: '',
      name: '',
    },
  },
  mutations: {
    connect(state, data) {
      // here you make an API call to authenticate the user
      state.user.id = data.id;
      state.user.name = data.name;
    },
    disconnect(state) {
      state.user.id = '';
      state.user.name = '';
    },
  },
  actions: {
  },
  modules: {
  },
});
