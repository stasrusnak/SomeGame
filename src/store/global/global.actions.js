import { mutationsTypes } from './global.mutations';

const actionTypes = {
  TOGGLE_DEBUGMODE: 'TOGGLE_DEBUGMODE',
};

const actions = {
  [actionTypes.TOGGLE_DEBUGMODE]: async ({ commit }) => {
    commit(mutationsTypes.TOGGLE_DEBUGMODE);
  },
};
export default actions;
