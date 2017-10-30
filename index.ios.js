import {Provider, connect} from 'react-redux';
import React, {Component} from 'react';
import {createStore, applyMiddleware, compose, bindActionCreators} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {persistStore, autoRehydrate} from 'redux-persist'
import {AppRegistry, AsyncStorage, Text} from 'react-native';
import { Actions, ActionConst, Router, Scene } from 'react-native-router-flux';
import reducer from './app/reducers';
import {ActionCreators} from './app/actions/index';

import Home from './app/containers/Home';


function mapDispatchTopProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

const loggerMiddleware = createLogger({predicate: (getState, action) => __DEV__});

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    ),
    autoRehydrate()
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});
// begin periodically persisting the store
persistStore(store, {storage: AsyncStorage});

const ConnectedRouter =  connect((state) => { return {}}, mapDispatchTopProps)(Router);


class TabIcon extends Component {
  render(){
    return (
      <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
    );
  }
}

const Scenes = Actions.create(
  <Scene key='root'>
    <Scene key='everything' component={Home} {...this.props} hideNavBar type={ActionConst.REPLACE} />
  </Scene>
);

const App = () => (
  <Provider store={store}>
    <ConnectedRouter scenes={Scenes} />
  </Provider>
);

AppRegistry.registerComponent('shelfnative', () => App);
