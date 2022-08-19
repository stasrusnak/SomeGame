import status from '../status.constants';

export const mutationsTypes = {
  TOGGLE_DEBUGMODE: 'TOGGLE_DEBUGMODE',
};

const mutations = {
  [mutationsTypes.TOGGLE_DEBUGMODE]: state => {
    const mutState = state;
    mutState.debugMode = !mutState.debugMode;
    mutState.status = { ...mutState.status, ...status.LOADING };
  },
};
export default mutations;
