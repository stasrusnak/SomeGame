import axios from 'axios';

import { mutationsTypes } from './maps.mutations';

const passageLayer = (layers, tiles) =>
  layers.map(layer => layer.map(item => tiles[item - 1].properties[0].value));

const formatMap = (map, data) => {
  const { height, width, tileheight, layers, tileset, events } = data;
  const reducedLayers = layers.map(layer => layer.data);
    const passage = passageLayer(reducedLayers, tileset.tiles);
  return {
    name: map,
    rows: height,
    cols: width,
    tsize: tileheight,
    layers: reducedLayers,
    tilesetImage: tileset.image,
    passage,
    events,
    getTile: function (layer, col, row) {
      return this.layers[layer][row * this.cols + col];
    },
    getPassage: function (layer, col, row) {
      return this.passage[layer][row * this.cols + col];
    },
    getCol: function (x) {
      return Math.floor(x / this.tsize);
    },
    getRow: function (y) {
      return Math.floor(y / this.tsize);
    },
    getX: function (col) {
      return col * this.tsize;
    },
    getY: function (row) {
      return row * this.tsize;
    },
    getPassageByXY: function (x, y) {
      const col = this.getCol(x);
      const row = this.getRow(y);
      const passage = this.getPassage(0, col, row);
      /* console.log({ x, y, col, row, passage }); */
      return passage;
    },
    collideAtXY(x, y) {
      const passage = this.getPassageByXY(x, y);
      if (passage === 0 || passage === undefined) {
        return false;
      } else {
        return true;
      }
    },
  };
};

const fetchTileSet = async ({ source }) => {
  const set = source.split('/');
  const tileSet = set[set.length - 1];
  try {
    const { data } = await axios.get(`/tilesets/${tileSet}`);
    return data;
  } catch (error) {
    return [];
  }
};

const fetchMapEvents = async map => {
  const { data } = await axios.get(`/maps/${map}/events.json`);
  return data;
};

const fetchMap = async map => {
  try {
    const { data } = await axios.get(`/maps/${map}/${map}.json`);
    const tileset = await fetchTileSet(data.tilesets[0]);
    const events = await fetchMapEvents(map);

    console.log(tileset)
    return formatMap(map, { ...data, tileset, events });
  } catch (error) {
    return [];
  }
};

const fetchMaps = async () => {
  try {
    const mapList = await axios.get('/maps.json');
    const { maps } = mapList.data;
    return await Promise.all(maps.map(map => fetchMap(map)));
  } catch (error) {
    return [];
  }
};

const actionTypes = {
  MAPS_REQUEST: 'MAPS_REQUEST',
  PUSH_EVENTS: 'PUSH_EVENTS',
};

const actions = {
  [actionTypes.MAPS_REQUEST]: async ({ commit }) => {
    commit(mutationsTypes.MAPS_REQUEST);
    try {
      const maps = await fetchMaps();
      commit(mutationsTypes.MAPS_SUCCESS, maps);
    } catch (error) {
      commit(mutationsTypes.MAPS_FAILED);
    }
  },
  [actionTypes.PUSH_EVENTS]: async ({ commit }, payload) => {
    commit(mutationsTypes.PUSH_EVENTS, payload);
  },
};
export default actions;
