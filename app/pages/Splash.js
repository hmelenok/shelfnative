import React, {Component} from 'react';
import {getAuthToken} from '../network/helpers';
import { Actions } from 'react-native-router-flux';
import {Dimensions, StyleSheet, Image, View, Text, ToastAndroid} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const {width, height} = Dimensions.get('window');


export default class Splash extends Component {
    componentDidMount() {
        getAuthToken()
            .then((info) => {
                if(info) {
                    Actions.search();
                } else {
                    Actions.login();
                }
            })
    }

    render() {
        return <LinearGradient
            start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
            colors={['#20232A', '#263D61', '#2b5797']}
            style={styles.container}>
            <Image style={styles.logo} source={require('../public/images/logo.png')}/>
        </LinearGradient>
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        height,
        justifyContent: 'center',
        alignItems: 'center',
        width
    },
    logo: {
        width: 224,
        height: 46,
        alignSelf: 'center'
    }
});
