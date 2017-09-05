/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {Provider} from 'react-redux';
import React, {Component} from 'react';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {AppRegistry} from 'react-native';
import reducer from './app/reducers';
import AppContainer from './app/containers/AppContainer.js'


const loggerMiddleware = createLogger({predicate: (getState, action) => __DEV__});

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    )
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

AppRegistry.registerComponent('shelfnative', () => App);
