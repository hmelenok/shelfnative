import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";
class Connecting extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Please wait, connection in progress</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        flex: 1,
        color: 'black',
        textAlign: 'center'
    }
});
module.exports = Connecting;