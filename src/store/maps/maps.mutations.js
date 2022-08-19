import status from '../status.constants';
import { handleMutationError } from '../error.handler';
import { mapsAdapter, eventsAdapter } from './maps.state';

export const mutationsTypes = {
  MAPS_REQUEST: 'MAPS_REQUEST',
  MAPS_SUCCESS: 'MAPS_SUCCESS',
  MAPS_FAILED: 'MAPS_FAILED',
  PUSH_EVENTS: 'PUSH_EVENTS',
};

const mutations = {
  [mutationsTypes.MAPS_REQUEST]: state => {
    const mutState = state;
    mutState.status = { ...mutState.status, ...status.LOADING };
  },
  [mutationsTypes.MAPS_SUCCESS]: (state, payload) => {
    const mutState = state;
    mutState.maps = mapsAdapter.addMany(payload);
    mutState.currentMap = payload[0]; // TODO: Remove provisional current Map Selection
    mutState.status = { ...mutState.status, ...status.LOADING_SUCCESS };
  },
  [mutationsTypes.MAPS_FAILED]: (state, error) => {
    handleMutationError(
      state,
      status.LOADING_FAILED,
      error,
      'Ups there was an error fetching project from GRAPHQL',
    );
  },
  [mutationsTypes.PUSH_EVENTS]: (state, payload) => {
    const mutState = state;
    mutState.currentEvents = eventsAdapter.addMany(payload);
  },
};
export default mutations;
