/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from "react";
import {AppRegistry, StyleSheet, Text, View} from "react-native";
import {Router, Scene} from "react-native-router-flux";
import Auth from "./app/Auth";
import Share from "./app/Share";

class shelfnative extends Component {
    render() {
        return (
            <Router>
                <Scene key="root" style={styles.container}>
                    <Scene key="auth" style={styles.child} component={Auth} title="Auth" initial={true}/>
                    <Scene key="share" style={styles.child} component={Share} title="Share" />
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