import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const searchedGems = createReducer({}, {
  [types.SET_SEARCHED_GEMS](state, action) {
    let newState = {};
    action.gems.forEach((gem) => {
      newState[gem._id] = gem;
    });
    return newState;
  }
});

export const gemCount = createReducer(0, {
  [types.SET_SEARCHED_GEMS](state, action) {
    return action.gems.length;
  },
  [types.ADD_GEM](state, action) {
    return state + 1;
  }
});
