/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/**
 * Lib part
 */
import React, {Component} from "react";
import {Alert, AppRegistry, BackAndroid, StyleSheet, Text, View, Switch} from "react-native";
import {Scene, Router, Actions} from "react-native-router-flux";
import Meteor, {Accounts} from "react-native-meteor";
import Auth from "./app/views/Auth";
import Share from "./app/views/Share";
import Connecting from "./app/views/Connecting";

const scenes = Actions.create(
    <Scene key="root">
        <Scene key="connecting" component={Connecting} title="Connecting" initail="true"/>
        <Scene key="auth" component={Auth} title="Login" hideNavBar="true"/>
        <Scene key="share" component={Share} title="Share"/>
    </Scene>
);

// Meteor.connect('wss://app.shelf.io/websocket');

class shelfnative extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: false,
            user: null
        };
    }

    connect() {
        Meteor.connect('wss://app.shelf.io/websocket');
        Meteor.waitDdpConnected(() => {
            this.setState({connected: true});
            console.log(Meteor, Meteor.user());
        });
        setTimeout(() => {
            if(!this.state.connected){
                this.connectionProblems();
            }
        }, 10000)
    }
    connectionProblems(){
        if(!this.state.connected) {
            Alert.alert(
                'Connection problem',
                'Sorry we can\'t connect you to shelf.io right now',
                [
                    {text: 'Quit', onPress: () => BackAndroid.exitApp(), style: 'cancel'},
                    {text: 'Retry', onPress: () => this.connect()},
                ]
            )
        }
    }

    connected() {
        console.log('connected', Meteor, Meteor.user(), Accounts);
        if(Meteor.user() === null){
            Actions.auth({});
        }

        Accounts.onLogin((userId) => {
            console.log('onLogin', userId);
        });
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate', nextState);
        if(nextState.connected && nextState.connected === true){
            this.connected();
        }
    }

    componentWillMount() {
        this.connect();
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