import { keyCodes } from '@/core/utils/key-codes';
import { mutationsTypes } from './keyboard.mutations';

const getKeyByValue = (obj, value) =>
  Object.keys(obj).find(key => obj[key] === value);

const actionTypes = {
  KEY_DOWN: 'KEY_DOWN',
  KEY_UP: 'KEY_UP',
};

const actions = {
  [actionTypes.KEY_DOWN]: async ({ commit }, code) => {
    const key = getKeyByValue(keyCodes, code);
    commit(mutationsTypes.KEY_DOWN, key);
  },
  [actionTypes.KEY_UP]: async ({ commit }, code) => {
    const key = getKeyByValue(keyCodes, code);
    commit(mutationsTypes.KEY_UP, key);
  },
};
export default actions;
