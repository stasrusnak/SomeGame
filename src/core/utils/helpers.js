export const nearestMultiple = (value, multiple, floor = false) => {
  return floor
    ? Math.floor(value / multiple) * multiple
    : Math.ceil(value / multiple) * multiple;
};

export const clampValue = (value, multiple, sign) => {
  return nearestMultiple(
    value,
    multiple,
    sign === -1 || Math.sign(value) === -1
  );
};

export default {
  nearestMultiple,
  clampValue
};
