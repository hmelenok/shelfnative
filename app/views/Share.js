import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Share extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text} onPress={Actions.auth}>This is Share!</Text>
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
module.exports = Share;