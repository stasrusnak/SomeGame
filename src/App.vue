<template>
  <div id="app" class="app">

    <div class="tv">

      <div class="app__screen" ref="game-screen">
        <Game class="app__game"/>
      </div>
      <div class="app__debug">
        <span class="app__fps badge-pill badge-dark">fps: {{ fps }}</span>
<!--        <span-->
<!--                class="app__keys badge-pill badge-secondary"-->
<!--                v-for="key in pressedKeys"-->
<!--                :key="key"-->
<!--        >{{ key }}-->

<!--            {{pressedKeys}}-->


<!--        </span>-->


          <div class="arrow-key-container">
              <div class="arrow-key up" :class="this.press===38 ? 'press' : '' " ></div><br>
              <div class="arrow-key left" :class="this.press===37 ? 'press' : '' "></div>
              <div class="arrow-key down" :class="this.press===40 ? 'press' : '' " ></div>
              <div class="arrow-key right" :class="this.press===39 ? 'press' : '' " ></div>
          </div>


      </div>
    </div>


  </div>
</template>
<script>
import { mapGetters } from 'vuex';

import Game from './components/game/Game.vue';

const data = () => ({
  times: [],
  fps: 0,
  isDev: false,
  press: ''
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
    this.press = e.keyCode
  },
  onKeyUp(e) {
    e.preventDefault();
    this.$store.dispatch('keyboard/KEY_UP', e.keyCode);
    this.press = ''
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
  },

};


</script>
<style lang="scss">
@import './styles/shared.scss';

.tv{
  width: 900px;
  height: 900px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("./assets/img/tv_old.png") ;
  background-position: center center;
  background-size: cover;
}

body{
  background-image: url("./assets/img/bg.jpg") ;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}


.app {
  display: flex;
  justify-content: center;
  align-items: center;
  &__screen {
    /*position: relative;
    width: $screen-width;
    height: $screen-height;
    background-color: gray;
    overflow: hidden;*/



      position: relative;
      width: 590px;
      height: 420px;
      background-color: gray;
      overflow: hidden;
      top: 50px;
      left: 130px;
      z-index: -1;
  }

  &__debug {
    bottom: 0.5rem;
    left: 0.5rem;
    display: flex;
    justify-content: space-between;
     width: 30%;
    height: 50px;
    align-items: center;
    flex-direction: column;
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


.arrow-key-container {
  display: inline-block;
  text-align: center;
  transform: translate3d(0,0,0);
}
.arrow-key {
  align-items: center;
  background: #ccc;
  border-radius: 6px;
  box-shadow: -1px 1px 0 #999, -2px 2px 0 #999, -3px 3px 0 #999, -4px 4px 0 #999;
  color: #fff;
  display: inline-flex;
  font-size: 30px;
  font-weight: bold;
  height: 35px;
  justify-content: center;
  margin: 5px;
  transform: translate3d(0, 0, 0);
  transition: box-shadow .1s linear, transform .1s linear;
  width: 35px;
  &:active,&.press {
    box-shadow: 0px 0px 0 rgba(255, 99, 71, 0.97), 0px 0px 0 rgba(255, 99, 71, 0.97), 0px 0px 0 rgba(255, 99, 71, 0.97), -1px 1px 0 rgba(255, 99, 71, 0.97);
    transform: translate3d(-3px, 3px, 0);
    background: rgba(255, 99, 71, 0.97);
  }
  &.left:before {
    content: "\2190";
  }
  &.up:before {
    content: "\2191";
  }
  &.down:before {
    content: "\2193";
  }
  &.right:before {
    content: "\2192";
  }
}


@media screen and (max-width: 1300px)  {

}

</style>
