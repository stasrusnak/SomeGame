export const TILE_SIZE = 32;
export const PLAYER_SIZE = TILE_SIZE * 2;
export const MOVEMENTS_PER_SECOND = 80;
export const SCREEN_PADDING = 32 * 6;
export const SCREEN_WIDTH = 640;
export const SCREEN_HEIGHT = 480;
export const CAMERA_SPEED = 80;
export const CLAMP_VALUE = 2;

export const PLAYER_DIRECTIONS = {
  up: 3,
  right: 2,
  down: 0,
  left: 1
};

export default {
  PLAYER_SIZE,
  PLAYER_DIRECTIONS,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  CAMERA_SPEED
};
