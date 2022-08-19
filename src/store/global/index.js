import state from './global.state';
import actions from './global.actions';
import mutations from './global.mutations';
import getters from './global.getters';

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
