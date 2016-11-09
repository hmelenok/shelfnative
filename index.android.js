import React, {Component} from "react";
import _ from "lodash";
import {Alert, AppRegistry, BackAndroid, StyleSheet, NativeModules} from "react-native";
import {Scene, Router, Actions} from "react-native-router-flux";
import Meteor, {Accounts} from "react-native-meteor";
import Auth from "./app/views/Auth";
import Share from "./app/views/Share";
import Connecting from "./app/views/Connecting";
const Shares = require('./app/storage/shares');
const SharesStorage = new Shares();

const scenes = Actions.create(
    <Scene key="root">
        <Scene key="connecting" component={Connecting} title="Connecting" initail="true"/>
        <Scene key="auth" component={Auth} title="Login" hideNavBar="true"/>
        <Scene key="share" component={Share} title="Share"/>
    </Scene>
);

class shelfnative extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: false,
            user: null
        };
    }

    connect() {
        console.log('start ddp connection');
        Meteor.connect('wss://app.shelf.io/websocket');
        Meteor.waitDdpConnected(() => {
            this.setState({connected: true});
        });
        setTimeout(() => {
            if (!this.state.connected) {
                this.connectionProblems();
            }
        }, 10000)
    }

    connectionProblems() {
        if (!this.state.connected) {
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
        console.log('connected'/*, Meteor, Meteor.user(), Accounts*/);
        if (Meteor.user() === null) {
            Actions.auth({});
        }

        Accounts.onLogin((userId) => {
            console.log('onLogin', userId);
            Actions.share({});
        });
    }

    listenToIntend() {

        NativeModules.EphemeralStorage.readOnceAsync((data) => {
            console.log('listenToIntend', data);
            if (data) {
                SharesStorage.add({
                    data: data,
                    type: 'Bookmark'
                });
            }

        })
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate', nextState);
        if (nextState.connected && nextState.connected === true) {
            this.connected();
        }
    }

    componentWillMount() {
        this.connect();
        this.listenToIntend();
    }

    componentDidMount() {
        console.log('Router');
    }

    backAction() {

    }

    render() {
        return <Router scenes={scenes} backAndroidHandler={this.backAction}/>;
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