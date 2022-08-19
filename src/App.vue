<template>
  <div id="app" class="app">
    <div class="app__screen" ref="game-screen">
      <div class="app__debug">
        <span
          class="app__keys badge-pill badge-secondary"
          v-for="key in pressedKeys"
          :key="key"
        >{{ key }}</span>
        <span class="app__fps badge-pill badge-dark">fps: {{ fps }}</span>
      </div>
      <Game class="app__game"/>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

import Game from './components/game/Game.vue';

const data = () => ({
  times: [],
  fps: 0,
  isDev: false
});

const components = {
  Game
};




const props = {};

const computed = {
  ...mapGetters('keyboard', {
    keys: 'selectKeys',
    pressedKeys: 'selectPressedKeys'
  })
};


const methods = {
  init() {

    this.addEvents();
    this.$store.dispatch('maps/MAPS_REQUEST');
  },
  getFps() {
    window.requestAnimationFrame(() => {
      const now = performance.now();
      while (this.times.length > 0 && this.times[0] <= now - 1000) {
        this.times.shift();
      }
      this.times.push(now);
      this.fps = this.times.length;
      this.getFps();
    });
  },
  addEvents() {
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
  },
  onKeyDown(e) {
    e.preventDefault();
    this.$store.dispatch('keyboard/KEY_DOWN', e.keyCode);
  },
  onKeyUp(e) {
    e.preventDefault();
    this.$store.dispatch('keyboard/KEY_UP', e.keyCode);
  }
};

export default {
  name: 'app',
  components,
  data,
  props,
  methods,
  computed,
  mounted() {
    this.getFps();
    this.$nextTick(this.init);
  }
};


</script>
<style lang="scss">
@import './styles/shared.scss';

.app {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &__screen {
    position: relative;
    width: $screen-width;
    height: $screen-height;
    background-color: gray;
    overflow: scroll;
  }

  &__debug {
    position: fixed;
    bottom: 0.5rem;
    left: 0.5rem;
    display: flex;
    justify-content: space-between;
    width: 90%;
    padding: 0;
    height: 50px;
    align-items: center;
  }

  &__fps,
  &__keys {
    background: #2b3846;
    color: white;
    border-radius: 5px;
    font-size: 10px;
    min-width: 50px;
    padding: 0.25rem 0.5rem;
    text-align: center;
    text-transform: lowercase;
  }

  &__map {
    width: 1920px;
    height: 1600px;
  }
}
</style>
