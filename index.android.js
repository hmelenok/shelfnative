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
import Meteor from "react-native-meteor";
import Auth from "./app/views/Auth";
import Share from "./app/views/Share";
import Connecting from "./app/views/Connecting";

const scenes = Actions.create(
    <Scene key="root">
        <Scene key="connecting" component={Connecting} title="Connecting" initail="true"/>
        <Scene key="auth" component={Auth} title="Login"/>
        <Scene key="share" component={Share} title="Share"/>
    </Scene>
);

Meteor.connect('wss://app.shelf.io/websocket');

class shelfnative extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: false,
            user: null
        };
        Meteor.onLogin(() => {
            this.setState({user: Meteor.user()});
        });
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate', nextProps, nextState);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate', prevProps, prevState);
    }

    componentWillMount() {
        console.log('componentWillMount');
        const timer = setInterval(() => {
            if (Meteor.status().connected) {
                clearInterval(timer);
                this.setState({connected: Meteor.status().connected});
            }
        }, 250);
    }

    render() {
        return <Router scenes={scenes}/>;
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