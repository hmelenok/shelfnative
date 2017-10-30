import { combineReducers } from 'redux';
import * as gemsReducer from './gems';
import * as sceneReducer from './routerScenes';

export default combineReducers(Object.assign(
  gemsReducer,
  sceneReducer
));
