import * as types from './types';
import Api from '../lib/api';

export function fetchGems(ingridients) {
  return (dispatch, getState) => {
    return Api
      .logIn('', '')//use your credentials
      .then(({token}) => {
        return Api
          .search(token, {query: ingridients})
          .then(gems => {
            dispatch(setSearchedGems({gems}));
          })
          .catch(error => console.warn(error.message || error));
      })
      .catch(error => console.warn(error.message || error));
  }
}

export function setSearchedGems({gems}) {
  return {
    type: types.SET_SEARCHED_GEMS,
    gems: gems.results.hits
  }
}

export function addGem() {
  return {
    type: types.ADD_GEM,
  }
}
