import Vue from 'vue';
import Vuex from 'vuex';

import maps from './maps';
import keyboard from './keyboard';
import global from './global';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    maps,
    keyboard
  }
});
