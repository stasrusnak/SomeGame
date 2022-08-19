import { MOVEMENTS_PER_SECOND } from '@/core/utils/constants.js';

function Camera(map, width, height) {
  this.x = 0;
  this.y = 0;
  this.width = width;
  this.height = height;
  this.maxX = map.cols * map.tsize - width;
  this.maxY = map.rows * map.tsize - height;
}

Camera.prototype.move = function (delta, dirx, diry) {
  // move camera
  this.x += dirx * MOVEMENTS_PER_SECOND * delta;
  this.y += diry * MOVEMENTS_PER_SECOND * delta;
  // clamp values
  this.x = Math.max(0, Math.min(this.x, this.maxX));
  this.y = Math.max(0, Math.min(this.y, this.maxY));
};

export default Camera;
