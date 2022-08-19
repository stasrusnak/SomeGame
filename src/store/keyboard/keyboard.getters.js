const getters = {
  status: state => state.status,
  selectKeys: state => state.keys,
  selectPressedKeys: state =>
    Object.entries(state.keys)
      .filter(([_key, value]) => value)
      .map(item => item[0]),
  isRightDown: state => state.keys['RIGHT_ARROW'],
  isLeftDown: state => state.keys['LEFT_ARROW'],
  isUpDown: state => state.keys['UP_ARROW'],
  isDownDown: state => state.keys['DOWN_ARROW'],
};

export default getters;
