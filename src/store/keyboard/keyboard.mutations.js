import status from '../status.constants';

export const mutationsTypes = {
  KEY_DOWN: 'KEY_DOWN',
  KEY_UP: 'KEY_UP',
};

const mutations = {
  [mutationsTypes.KEY_DOWN]: (state, key) => {
    const mutState = state;
    mutState.keys[key] = true;
  },
  [mutationsTypes.KEY_UP]: (state, key) => {
    const mutState = state;
    mutState.keys[key] = false;
  },
};
export default mutations;
