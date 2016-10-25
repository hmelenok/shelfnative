/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/**
 * Lib part
 */
import React, {Component} from "react";
import {AppRegistry, StyleSheet, Text, View, Switch} from "react-native";
import {Scene, Router, Actions} from "react-native-router-flux";
import Meteor, { createContainer } from "react-native-meteor";
import Auth from "./app/views/Auth";
import Share from "./app/views/Share";
import Connecting from "./app/views/Connecting";

import connect from './app/connectivity/connect';
import RouteList from './app/routes/routeList';

@connectMeteor

class shelfnative extends Component {
    componentWillMount() {
        connect();
    }

    render() {
        return (
            <Router getSceneStyle={()=>styles.container}>
                <Scene key="root">
                    <Scene key="routelist" component={RouteList} title="Home"/>

                    <Scene key="getMeteorConnection" component={Connection} title="Meteor Connection"/>
                    <Scene key="getAccounts" component={Accounts} title="Accounts"/>
                    <Scene key="getMeteorListView" component={MeteorListView} title="Meteor List View"/>
                    <Scene key="getMeteorComplexListView" component={MeteorComplexListView} title="Meteor Complex List View"/>
                    <Scene key="getEditItem" component={EditItem} title="Edit Item"/>
                </Scene>
            </Router>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    child: {
        height: 100,
        backgroundColor: '#FFFFFF',
    }
});

AppRegistry.registerComponent('shelfnative', () => shelfnative);