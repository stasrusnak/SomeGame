import { mapsAdapter, eventsAdapter } from './maps.state';



const getters = {
  status: state => state.status,
  selectCurrentMap: state => state.currentMap,
  selectCurrentMapEvents: state => state.currentMap.events,
  selectMaps: state => mapsAdapter.selectAll(state.maps),
  selectCurrentEvents: state => eventsAdapter.selectAll(state.currentEvents),
  selectHero: state => eventsAdapter.selectById('hero', state.currentEvents),
  selectCurrentNpcs: state =>
    eventsAdapter
      .selectAll(state.currentEvents)
      .filter(ev => ev.$props.type === 'npc'),
  selectNearEvents: state => id =>
    eventsAdapter
      .selectAll(state.currentEvents)
      .filter(event => event.id !== id),
};

export default getters;
