import React, {Component} from "react";
// import { Actions } from 'react-native-router-flux';
import {
    AsyncStorage,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableHighlight,
    View,
    ScrollView
} from "react-native";
import {getAuthToken, obtainAuthToken} from "../network/helpers";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
    }

    componentDidMount() {
        AsyncStorage.getItem('loginEmail', (err, email) => {
            if (email) {
                this.setState({email});
            }
        });
    }

    focusNextField(nextField) {
        this.refs[nextField].focus();
    }


    submitAction() {
        AsyncStorage.setItem('loginEmail', this.state.email);
        obtainAuthToken(this.state.email, this.state.password)
            .then((token) => {
                getAuthToken()
                    .then((info) => {
                        if(info) {
                            ToastAndroid.show(
                                'Successfully logged in',
                                ToastAndroid.SHORT
                            );
                        }
                    })
            });

    }

    render() {
        return (
        <ScrollView>

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
        </ScrollView>

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
    bigField: {
        height: 1500,
        flexShrink: 0
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
