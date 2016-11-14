import React, {Component} from "react";
import {Image, Dimensions,ScrollView, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import Meteor, {Accounts} from "react-native-meteor";
const {height, width} = Dimensions.get('window');
import Icon from "react-native-vector-icons/MaterialIcons";
const UserStorage = require('../storage/user');
const User = new UserStorage();

class SideNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open,
            firstName: Meteor.user().profile.firstName,
            lastName: Meteor.user().profile.lastName,
            mail: Meteor.user().emails[0].address,
        });
    }

    close() {
        this.setState({
            open: false
        });
    }

    logout() {
        User.logout();
    }

    render() {
        if (!this.state.open) {
            return false;
        }
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.blackOverlay} onPress={() => this.close()}>
                    <View></View>
                </TouchableHighlight>
                <ScrollView style={styles.menuWrapper}>
                    <View style={styles.menuWrapperFlex}></View>
                    <View style={styles.logoHolder}>
                        <Image style={styles.logo} source={require('../public/images/logo.png')}/>
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userInfoName}>
                            {this.state.firstName} {this.state.lastName}
                        </Text>
                        <Text style={styles.userInfoMail}>
                            {this.state.mail}
                        </Text>
                    </View>
                    <View style={styles.listItem}>
                        <Icon.Button name="exit-to-app" color="#A2A2A2" style={styles.logoutItemIcon} backgroundColor="transparent" onPress={this.logout}>
                            <Text style={styles.logoutItemText}>Logout</Text>
                        </Icon.Button>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height
    },
    blackOverlay: {
        backgroundColor: 'rgba(0,0,0,0.81)',
        position: 'absolute',
        height,
        top: 0,
        right: 0,
        width: width / 3,
    },
    menuWrapper: {
        position: 'absolute',
        backgroundColor: "white",
        height,
        width: width * 0.7,
        left: 0,
        top: 0,

    },
    menuWrapperFlex: {
        backgroundColor: "red",
        flexDirection: 'column',
        alignItems: 'center'
    },
    logoHolder: {
        backgroundColor: '#2A303B',
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 145,
        height: 30
    },
    userInfo: {
        padding: 8,
        borderTopColor: '#e5e5e5',
        borderTopWidth: 1,
        backgroundColor: '#2A303B',
        borderBottomColor: '#e5e5e5',
        borderBottomWidth: 1,
    },
    userInfoName: {
        marginBottom: 0,
        color: 'white',
        fontWeight: "500"
    },
    userInfoMail: {
        color: 'white'
    },
    listItem: {
        padding: 8,
        flexDirection: 'row'
    },
    logoutItemIcon: {
        flexGrow: 1
    },
    logoutItemText: {
        textAlign: 'right',
        color: 'black',
        marginLeft: 8
    }
});
module.exports = SideNav;