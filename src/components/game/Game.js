import Vue from 'vue';

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/core/utils/constants';

import Loader from '@/core/utils/loader';
import { mapGetters } from 'vuex';
import Camera from './camera';

import Player from '@/components/player/Player.vue';

const data = () => ({
  tilemap: null,
  width: SCREEN_WIDTH,
  heigth: SCREEN_HEIGHT,
  previousElapsed: null,
  gameLoop: null,
  camera: null,
  delta: null
});

const components = {
  Player
};

const computed = {
  ...mapGetters('maps', {
    map: 'selectCurrentMap',
    mapEvents: 'selectCurrentMapEvents',
    currentEvents: 'selectCurrentEvents',
    hero: 'selectHero',
    npcs: 'selectCurrentNpcs'
  }),
  ...mapGetters('keyboard', {
    pressedKeys: 'selectPressedKeys',
    isRightDown: 'isRightDown',
    isLeftDown: 'isLeftDown',
    isUpDown: 'isUpDown',
    isDownDown: 'isDownDown'
  }),
  ctx() {
    return this.ref.getContext('2d');
  },
  layers() {
    return this.map.layers;
  },
  ref() {
    return this.$refs['game'];
  },
  gameContainer() {
    return this.$refs['game-container'];
  },
  tilesetPath() {
    return `tilesets/${this.map.tilesetImage}`;
  }
};

const methods = {
  async init() {

    await this.loadTilemap();
    this.camera = new Camera(this.map, SCREEN_WIDTH, SCREEN_HEIGHT);
    this.gameLoop = window.requestAnimationFrame(this.tick);
    this.createPlayer();
    this.createEvents();
  },
  createEvents() {
    /*if (this.mapEvents.length > 0) {
      this.mapEvents.forEach(event => {
        if (event.type === 'npc') {
          this.createNPC(event);
        }
      });
    }*/
  },
  createPlayer() {
    const ComponentClass = Vue.extend(Player);
    const instance = new ComponentClass({
      propsData: {
        type: 'hero'
      }
    });
    instance.$parent = this;
    instance.$store = this.$store;
    instance.$mount(); // pass nothing
    this.gameContainer.appendChild(instance.$el);
    this.$store.dispatch('maps/PUSH_EVENTS', [instance]);
  },
  onKeyUp() {
    this.hero.steps = 0;
  },
  async loadTilemap() {
    this.tilemap = await Loader.loadImage(this.tilesetPath);
  },
  render(delta) {
    const layers = this.layers;
    if (layers.length > 0) {
      layers.forEach((_layer, index) => {
        this.drawLayer(index);
      });
    }
    this.currentEvents.forEach(ev => ev.draw(delta));
    if (this.isDebugMode) {
      this.drawGrid();
    }
    this.hero.draw(delta);
  },
  update(delta) {
    /* const step = clampValue(PLAYER_SPEED * delta, TILE_SIZE); */
    let dirx = 0;
    let diry = 0;
    let direction = null;

    if (this.isUpDown) {
      diry = -1;
      direction = 'up';
      /*  this.hero.move(0, -step, 'up'); */
    } else if (this.isRightDown) {
      dirx = 1;
      direction = 'right';
      /*  this.hero.move(step, 0, 'right'); */
    } else if (this.isDownDown) {
      diry = 1;
      direction = 'down';
      /* this.hero.move(0, +step, 'down'); */
    } else if (this.isLeftDown) {
      dirx = -1;
      direction = 'left';
      /*  this.hero.move(-step, 0, 'left'); */
    }
    this.npcs.forEach(ev => ev.update(delta));
    this.updatePlayer(delta, dirx, diry, direction);
  },
  updatePlayer(delta, dirx, diry, direction) {
    this.hero.dirx = dirx;
    this.hero.diry = diry;
    if (direction) {
      this.hero.direction = direction;
    }
    this.hero.update(delta);
  },
  drawGrid() {
    let x;
    let y;
    const width = this.map.cols * this.map.tsize;
    const height = this.map.rows * this.map.tsize;

    for (let r = 0; r < this.map.rows; r++) {
      x = -this.camera.x;
      y = r * this.map.tsize - this.camera.y;
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(width, y);
      this.ctx.stroke();
    }
    for (let c = 0; c < this.map.cols; c++) {
      x = c * this.map.tsize - this.camera.x;
      y = -this.camera.y;
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x, height);
      this.ctx.stroke();
    }
  },
  drawLayer(layer) {
    const { tsize } = this.map;
    const { x, y, width, height } = this.camera;
    const startCol = this.map.getCol(x);
    const endCol = startCol + this.map.getCol(startCol + width);
    const startRow = this.map.getRow(y);
    const endRow = startRow + this.map.getRow(startRow + height);
    const offsetX = -x + this.map.getX(startCol);
    const offsetY = -y + this.map.getY(startRow);
    for (let c = startCol; c <= endCol; c++) {
      for (let r = startRow; r <= endRow; r++) {
        const tile = this.map.getTile(layer, c, r);
        const tilePassage = this.map.getPassage(layer, c, r);
        const tx = (c - startCol) * tsize + offsetX;
        const ty = (r - startRow) * tsize + offsetY;
        if (tile !== 0) {
          // 0 => empty tile
          this.ctx.drawImage(
            this.tilemap, // image
            (Math.ceil(tile % 8) - 1) * tsize, // source x
            (Math.ceil(tile / 8) - 1) * tsize, // source y
            tsize, // source width
            tsize, // source height
            Math.round(tx), // target x
            Math.round(ty), // target y
            tsize, // target width
            tsize // target height
          );
          if (this.isDebugMode) {
            this.ctx.fillText(`${c} - ${r}`, tx, ty + 10);
            this.ctx.fillText(tilePassage, tx, ty + 30);
          }
        }
      }
    }
  },
  tick(elapsed) {
    try {
      this.gameLoop = window.requestAnimationFrame(this.tick);

      // clear previous frame
      this.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

      // compute delta time in seconds -- also cap it
      let delta = (elapsed - this.previousElapsed) / 1000.0;
      delta = Math.min(delta, 0.25); // maximum delta of 250 ms
      this.delta = delta;
      this.previousElapsed = elapsed;

      this.update(delta);
      this.render(delta);
    } catch (error) {
      console.error(error);
      window.cancelAnimationFrame(this.gameLoop);
    }
  }
};

const watch = {
  map(value) {
    window.cancelAnimationFrame(this.gameLoop);

    if (value) {
      this.init();
    }
  }
};

const Game = {
  name: 'game',
  data,
  computed,
  methods,
  watch,
  components,
  async mounted() {

    this.$nextTick(async () => {
      if (this.map) {
        await this.init();
      }
    });
  }
};

export default Game;
