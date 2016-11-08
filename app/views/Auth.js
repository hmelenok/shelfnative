import React, {Component} from "react";
import {ToastAndroid, View, Text, StyleSheet, TextInput, TouchableHighlight, Dimensions, Image} from "react-native";
import Meteor from "react-native-meteor";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
    }
    componentDidMount() {
        console.log('Auth');
    }
    focusNextField(nextField) {
        this.refs[nextField].focus();
    }

    submitAction() {
        Meteor.loginWithPassword(this.state.email, this.state.password, (err) => {
            if (err) {
                ToastAndroid.showWithGravity(err, ToastAndroid.SHORT, ToastAndroid.CENTER);
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.field, styles.logoHolder]}>
                    <Image style={styles.logo} source={require('../public/images/logo.png')}/>
                </View>
                <View style={styles.field}>
                    <TextInput
                        ref="emailField"
                        style={styles.textInput}
                        onChangeText={(email) => this.setState({email})}
                        onSubmitEditing={() => this.focusNextField('passwordField')}
                        keyboardType="email-address"
                        value={this.state.email}
                        placeholder="Email"
                    />
                </View>
                <View style={styles.field}>
                    <TextInput
                        ref="passwordField"
                        style={styles.textInput}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        placeholder="Password"
                        secureTextEntry={true}
                        onSubmitEditing={() => this.submitAction()}
                    />
                </View>
                <View style={styles.field}>
                    <TouchableHighlight onPress={() => this.submitAction()} style={styles.buttonWrapper}>
                        <View style={styles.button}>
                            <Text style={styles.buttonLabel}>
                                LOGIN
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    logoHolder: {
        backgroundColor: '#2A303B',
        width,
        height: 80,
        padding: 16
    },
    logo: {
        width: 224,
        height: 46,
        alignSelf: 'center'
    },
    container: {
        backgroundColor: 'white',
        flexDirection: 'column',
        height,
        justifyContent: 'flex-start'
    },
    field: {
        height: 70,
        padding: 8
    },
    textInput: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'white',
    },
    buttonWrapper: {},
    button: {
        backgroundColor: '#FA6B30',
        borderRadius: 3
    },
    buttonLabel: {
        color: 'white',
        padding: 8,
        textAlign: 'center',
        fontFamily: 'notosans'
    }
});
module.exports = Auth;