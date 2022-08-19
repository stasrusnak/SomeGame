import Character from '../overworld/Overworld';
require('@/assets/graphics/characters/trchar.png');

const props = {
  id: {
    default: 'hero',
    type: String
  }
};

const computed = {};

const methods = {
  async init() {
    this.setRefs();
    await this.loadImage('trchar.png');
  }
};

const Player = {
  name: 'pkmnPlayer',
  extends: Character,
  computed,
  props,
  methods
};

export default Player;
