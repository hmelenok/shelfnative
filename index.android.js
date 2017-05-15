if(typeof global.self === "undefined"){
    global.self = global;
}

import React, {Component} from "react";
import {AppRegistry, StyleSheet} from "react-native";
import {Router, Scene} from "react-native-router-flux";


import Login from "./app/pages/Login";
import Splash from "./app/pages/Splash";

export default class shelfnative extends Component {
    render() {
        return (
            <Router hideNavBar={true}>
                <Scene key="root">
                    <Scene key="splash" component={Splash} title="Splash" initial={true}/>

                    <Scene key="login" component={Login} title="Login"/>
                </Scene>
            </Router>
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
