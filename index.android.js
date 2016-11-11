import React, {Component} from "react";
import {Alert, AppRegistry, BackAndroid, StyleSheet, NativeModules} from "react-native";
import {Scene, Router, Actions} from "react-native-router-flux";
import Meteor, {Accounts} from "react-native-meteor";
import Auth from "./app/views/Auth";
import Share from "./app/views/Share";
import Connecting from "./app/views/Connecting";
import _ from "lodash";
const Shares = require('./app/storage/shares');
const UserStorage = require('./app/storage/user');
const SharesStorage = new Shares();
const User = new UserStorage();

const scenes = Actions.create(
    <Scene key="root">
        <Scene key="connecting" component={Connecting} title="Connecting" initail="true"/>
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

    connect() {
        Meteor.connect('wss://app.shelf.io/websocket');

        Meteor.waitDdpConnected(() => {
            this.setState({connected: true});
            setTimeout(() => {
                this.connected();
            }, 1000);
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
        const goToMain = () => Actions.share();
        const goToAuth = () => Actions.auth();
        // console.log('connected', Meteor.user(), Meteor.userId(), Meteor.loggingIn());
        if (Meteor.user() === null && Meteor.loggingIn() === false) {
            goToAuth();
        } else {
            if (_.isString(Meteor.userId())) {
                goToMain();
            } else {
                User.getUser((user) => goToMain);
            }

        }

        Accounts.onLogin(() => {
            User.setUser(Meteor.user());
            goToMain();
        });
        Accounts.onLoginFailure(()=>{
            goToAuth();
        });
    }

    listenToIntend() {
        NativeModules.EphemeralStorage.readOnceAsync(function(data){
            console.log('listenToIntend', arguments);
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
        return <Router styles={styles.container} scenes={scenes} backAndroidHandler={this.backAction}/>;
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

AppRegistry.registerComponent('shelfnative', () => shelfnative);