import * as types from './types';
import Api from '../lib/api';

export function fetchRecipes(ingridients) {
  return (dispatch, getState) => {
    console.log(getState());
    return Api
      .logIn()
      .then(({token}) => {
        return Api
          .search(token, {query: ingridients})
          .then(resp => {
            dispatch(setSearchedRecipes({recipes: resp}));
          })
          .catch(console.warn);
      })
      .catch(console.warn);
  }
}

export function setSearchedRecipes({recipes}) {
  return {
    type: types.SET_SEARCHED_RECIPES,
    recipes: recipes.results.hits
  }
}

export function addRecipe() {
  return {
    type: types.ADD_RECIPE,
  }
}
