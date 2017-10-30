import { ActionConst } from 'react-native-router-flux';
import createReducer from '../lib/createReducer';

export const sceneReducer = createReducer({}, {
  [ActionConst.FOCUS](state, {type, scene}) {
    return { ...state, scene };
  }
});
