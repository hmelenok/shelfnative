/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
// import {Provider} from 'react-redux';
import React, {Component} from 'react';
// import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import createLogger from 'redux-logger';
import Api from './app/lib/api';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';

export default class shelfnative extends Component {
  render() {
    Api
      .logIn()
      .then(({token}) => {

        Api.hatracks(token, {query: '123', hatrack: 'gemType'})
          .then((result) => {
            console.log(result);
          })
          .catch(console.warn);
      });
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('shelfnative', () => shelfnative);
