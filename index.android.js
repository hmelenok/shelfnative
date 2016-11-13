import React, {Component} from "react";
import {Alert, AppRegistry, BackAndroid, StyleSheet, NativeModules} from "react-native";
import _ from "lodash";
import {Scene, Router, Actions} from "react-native-router-flux";
import Meteor, {Accounts} from "react-native-meteor";
import Auth from "./app/views/Auth";
import Share from "./app/views/Share";
import Connecting from "./app/views/Connecting";
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';


const Shares = require('./app/storage/shares');
const UserStorage = require('./app/storage/user');
const SharesStorage = new Shares();
const User = new UserStorage();

const scenes = Actions.create(
    <Scene key="root">
        <Scene key="connecting" component={Connecting} hideNavBar="true" title="Connecting" initail="true"/>
        <Scene key="auth" component={Auth} title="Login" hideNavBar="true"/>
        <Scene key="share" component={Share} title="Share" hideNavBar="true"/>
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

    componentWillUnmount() {
        Meteor.disconnect();
        User.setUser(null);
    }

    connect() {
        Meteor.connect('wss://app.shelf.io/websocket', {
            autoReconnect: true,
            reconnectInterval: 1000
        });

        Meteor.waitDdpConnected(() => {
            this.setTimeout(()=>{
                console.log('waitDdpConnected');
                this.setState({connected: true});
                this.connected();
            }, 2000);

        });

        this.setTimeout(() => {
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
        console.log('connected', Meteor.userId(), Meteor.loggingIn(), Actions.get());
        if (Meteor.user() === null && Meteor.loggingIn() === false) {
            Actions.auth();
        } else {
            if (_.isString(Meteor.userId())) {
                console.log('Meteor.userId()', Meteor.userId());
                Actions.share();
            } else {
                User.getUser((user) => {
                    if (user) {
                        console.log('presaved user find', user);
                        Actions.share();
                    }
                });
            }

        }

        Accounts.onLogin(() => {
            User.setUser(Meteor.user());
            console.log('onlogin callback', Meteor.user());
            Actions.share();
        });
        Accounts.onLoginFailure(() => {
            Actions.auth();
        });
    }

    listenToIntend() {
        NativeModules.EphemeralStorage.readOnceAsync(function(data) {
            console.log('listenToIntend',
                arguments);
            if (data) {
                SharesStorage.add({
                    data: data,
                    type: 'Bookmark'
                });
            }
        })
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
        return <Router
            styles={styles.container}
            scenes={scenes}
            backAndroidHandler={this.backAction}
            duration={0}
        />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    child: {
        height: 100
    }
});

reactMixin(shelfnative.prototype, TimerMixin);

AppRegistry.registerComponent('shelfnative', () => shelfnative);