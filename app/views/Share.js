import React, { Component } from 'react';
import { View, Text,TouchableHighlight, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Meteor from "react-native-meteor";

class Share extends Component {
    logout(){
        Meteor.logout();
        Actions.auth();
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this.logout}>
                    <Text>Logout</Text>
                </TouchableHighlight>
                <Text style={styles.text} onPress={Actions.auth}>This is Share!</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height: 150,
        backgroundColor: '#CCCCCC',
    },
    text: {
        color: 'black',
        textAlign: 'center'
    }
});
module.exports = Share;