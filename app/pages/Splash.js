import React, {Component} from 'react';
// import { Actions } from 'react-native-router-flux';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

const {width, height} = Dimensions.get('window');


export default class Splash extends Component {
    render() {
        return <View style={styles.container}>
            <Text>shelf.io</Text>
        </View>
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'column',
        height,
        justifyContent: 'flex-start'
    },
});
