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
        marginTop: 50,
        height: 150,
        backgroundColor: '#CCCCCC',
    },
    text: {
        color: 'black',
        textAlign: 'center'
    }
});
module.exports = Connecting;