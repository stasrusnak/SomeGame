import { keyCodes } from "../../core/utils/key-codes";

const prepareKeys = () => {
  const keys = {};
  Object.keys(keyCodes).forEach(key => {
    keys[key] = false;
  });
  return keys;
};
export const initialState = {
  keys: prepareKeys()
};

export default initialState;
