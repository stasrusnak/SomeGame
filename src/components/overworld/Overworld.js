import { mapGetters } from 'vuex';
import Loader from '@/core/utils/loader';

import { clampValue } from '@/core/utils/helpers';

import {
  PLAYER_SIZE,
  PLAYER_DIRECTIONS,
  MOVEMENTS_PER_SECOND,
  CLAMP_VALUE,
  TILE_SIZE
} from '@/core/utils/constants';

const data = () => ({
  ref: null,
  image: null,
  x: 0,
  y: 0,
  height: PLAYER_SIZE,
  width: PLAYER_SIZE,
  direction: 'down',
  steps: 0,
  delta: null,
  dirx: 0,
  diry: 0,
  speed: 1,
  collision: false
});

const props = {
  type: {
    default: null,
    type: String
  }
};

const computed = {
  ...mapGetters('global', {
    isDebugMode: 'isDebugMode'
  }),
  ...mapGetters('maps', {
    map: 'selectCurrentMap'
  }),
  events() {
    return this.$store.getters['maps/selectNearEvents'](this.id);
  },
  getStyles() {
    return {
      left: `${this.x - this.scrollLeft}px`,
      top: `${this.y - this.scrollTop}px`
    };
  },
  isHero() {
    return this.type === 'hero';
  },
  camera() {
    return this.$parent.camera;
  },
  scrollLeft() {
    return this.camera.x;
  },
  scrollTop() {
    return this.camera.y;
  },
  left() {
    return this.x;
  },
  right() {
    return this.x + PLAYER_SIZE - 1;
  },
  top() {
    return this.y;
  },
  bottom() {
    return this.y + PLAYER_SIZE - 1;
  },
  ctx() {
    return this.parentRef.getContext('2d');
  },
  parentRef() {
    return this.$parent.$refs['game'];
  },
  checkCollisionTop() {
    return (
      this.checkPassageCollision(
        this.left,
        this.right,
        true,
        this.top + TILE_SIZE
      ) || this.checkEventsCollision('top')
    );
    /* for (let i = this.left; i <= this.right; i += TILE_SIZE - 1) {
      if (this.map.collideAtXY(i, this.top + TILE_SIZE)) {
        return true;
      }
    }
    return false; */
  },
  checkCollisionRight() {
    return (
      this.checkPassageCollision(
        this.top + TILE_SIZE,
        this.bottom,
        false,
        this.right
      ) || this.checkEventsCollision('right')
    );
  },
  checkCollisionLeft() {
    return (
      this.checkPassageCollision(
        this.top + TILE_SIZE,
        this.bottom,
        false,
        this.left
      ) || this.checkEventsCollision('left')
    );
  },
  checkCollisionBottom() {
    return (
      this.checkPassageCollision(this.left, this.right, true, this.bottom) ||
      this.checkEventsCollision('bottom')
    );
  }
};

const methods = {
  async loadImage(img) {
    try {
      this.image = await Loader.loadImage(
        require('@/assets/graphics/characters/' + img)
      );
    } catch (error) {
      console.error(error);
    }
  },
  setRefs() {
    this.ref = this.$refs.hero;
  },
  update(delta) {
    this.delta = delta;
    this.move(delta, this.dirx, this.diry, this.direction);
  },
  move(delta, dirx, diry, direction) {
    const factor = MOVEMENTS_PER_SECOND * delta;
    let dx = dirx * factor;
    let dy = diry * factor;

    this.x += dx;
    this.y += dy;

    this.checkCollision(dirx, diry);

    this.isHero && !this.collision && this.camera.move(delta, dirx, diry);

    const maxX = this.map.cols * TILE_SIZE;
    const maxY = this.map.rows * TILE_SIZE;

    if (dirx !== 0 || diry !== 0) {
      this.steps = this.steps <= 3 ? this.steps + 12 * delta : 0;
    } else {
      this.steps = 0;
    }
    if (direction) {
      this.direction = direction;
    }

    this.x = clampValue(Math.max(0, Math.min(this.x, maxX)), CLAMP_VALUE, dirx);
    this.y = clampValue(Math.max(0, Math.min(this.y, maxY)), CLAMP_VALUE, diry);
  },
  stop() {
    this.steps = 0;
  },
  checkCollision(dirx, diry) {
    if (diry > 0 && this.checkCollisionBottom) {
      const row = this.map.getRow(this.bottom);
      this.y = -PLAYER_SIZE + this.map.getY(row);
      this.collision = true;
    } else if (diry < 0 && this.checkCollisionTop) {
      const row = this.map.getRow(this.top);
      this.y = 0 + this.map.getY(row + 1);
      this.collision = true;
    } else if (dirx > 0 && this.checkCollisionRight) {
      const col = this.map.getCol(this.right);
      this.x = -PLAYER_SIZE + this.map.getX(col);
      this.collision = true;
    } else if (dirx < 0 && this.checkCollisionLeft) {
      const col = this.map.getCol(this.left);
      this.x = 0 + this.map.getX(col + 1);
      this.collision = true;
    } else {
      this.collision = false;
      return;
    }
  },
  checkPassageCollision(start, end, vertical = false, xy) {
    for (let i = start; i <= end; i += TILE_SIZE - 1) {
      if (vertical) {
        if (this.map.collideAtXY(i, xy)) {
          return true;
        }
      } else {
        if (this.map.collideAtXY(xy, i)) {
          return true;
        }
      }
    }
    return false;
  },
  checkEventsCollision(side) {
    switch (side) {
      case 'top':
        return this.events.find(
          event =>
            this.top <= event.bottom - event.height / 2 &&
            this.top >= event.top &&
            this.left + TILE_SIZE >= event.left &&
            this.left < event.right
        );
      case 'right':
        return this.events.find(
          event =>
            this.right >= event.left &&
            this.right <= event.right &&
            this.top + TILE_SIZE >= event.top &&
            this.top < event.bottom - event.height / 2
        );
      case 'bottom':
        return this.events.find(
          event =>
            this.bottom >= event.top + event.height / 2 &&
            this.bottom <= event.bottom &&
            this.left + TILE_SIZE >= event.left &&
            this.left < event.right
        );
      case 'left':
        return this.events.find(
          event =>
            this.left <= event.right &&
            this.left >= event.left &&
            this.top + TILE_SIZE >= event.top &&
            this.top < event.bottom - event.height / 2
        );
      default:
        return false;
    }
  },
  draw() {
    let tx = this.x;
    let ty = this.y;

    tx = tx - this.scrollLeft;
    ty = ty - this.scrollTop;
    if (this.image) {
      this.ctx.drawImage(
        this.image,
        PLAYER_SIZE * Math.round(this.steps),
        PLAYER_SIZE * PLAYER_DIRECTIONS[this.direction],
        PLAYER_SIZE,
        PLAYER_SIZE,
        tx,
        ty,
        PLAYER_SIZE,
        PLAYER_SIZE
      );
    }
  }
};

const Overworld = {
  name: 'pkmnOverworld',
  data,
  props,
  computed,
  methods,
  async mounted() {
    this.$nextTick(async () => {
      await this.init();
    });
  }
};

export default Overworld;
