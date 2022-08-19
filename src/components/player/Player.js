import Character from '../overworld/Overworld';
require('@/assets/graphics/characters/zelda.png');

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
    await this.loadImage('zelda.png');
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
