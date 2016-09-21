/**
 * Reducer for clientIsps
 */
import { combineReducers } from 'redux';
import * as Actions from './actions';

const initialState = {
};

export const initialClientIspState = {
  id: null,

  info: {
    isFetching: false,
    isFetched: false,
  },
};

// reducer for client ISP info
function info(state = initialClientIspState.info, action = {}) {
  switch (action.type) {
    case Actions.FETCH_INFO:
      return {
        data: state.data,
        isFetching: true,
        isFetched: false,
      };
    case Actions.SAVE_CLIENT_ISP_INFO:
    case Actions.FETCH_INFO_SUCCESS:
      return {
        // store the meta info directly
        data: action.result.meta,
        isFetching: false,
        isFetched: true,
      };
    case Actions.FETCH_INFO_FAIL:
      return {
        isFetching: false,
        isFetched: false,
        error: action.error,
      };
    default:
      return state;
  }
}


// reducer to get the ID
function id(state = initialClientIspState.id, action = {}) {
  return action.clientIspId || state;
}

const clientIsp = combineReducers({
  id,
  info,
});

// The root reducer
function clientIsps(state = initialState, action = {}) {
  const { clientIspId } = action;
  switch (action.type) {
    case Actions.SAVE_CLIENT_ISP_INFO:
    case Actions.FETCH_INFO:
    case Actions.FETCH_INFO_SUCCESS:
    case Actions.FETCH_INFO_FAIL:
      return {
        ...state,
        [clientIspId]: clientIsp(state[clientIspId], action),
      };
    default:
      return state;
  }
}


// Export the reducer
export default clientIsps;
