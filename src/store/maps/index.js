import state from './maps.state';
import actions from './maps.actions';
import mutations from './maps.mutations';
import getters from './maps.getters';

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
