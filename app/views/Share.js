import React, {Component} from "react";
import {ScrollView, StyleSheet, Text, TouchableHighlight, View, Dimensions} from "react-native";
import _ from "lodash";
import Icon from "react-native-vector-icons/MaterialIcons";
import Swipeout from "react-native-swipeout";
const Shares = require('../storage/shares');
const SharesStorage = new Shares();
const UserStorage = require('../storage/user');
const User = new UserStorage();
const {height, width} = Dimensions.get('window');

class Share extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shares: []
        };
    }

    buttonRight(share) {
        return [
            {
                component: (<Icon name="delete"
                                  size={30}
                                  color="white"
                                  style={styles.listItemShareIcon}
                                  onPress={() => this.removeShare(share)}/>),
                backgroundColor: '#E53935',
                onPress: ()=> this.removeShare(share),
                color: 'white',
                type: 'secondary'
            }
        ];
    }

    buttonLeft(share) {
        return [
            {
                component: (<Icon name="share"
                                  size={30}
                                  color="white"
                                  onPress={() => this.shareItem(share)}
                                  style={styles.listItemShareIcon}/>),
                backgroundColor: '#76FF03',
                onPress: () => this.shareItem(share),
                color: 'white',
                type: 'primary'
            }
        ];
    }

    logout() {
        User.logout();
    }

    componentWillMount() {
        this.checkShares();
    }

    checkShares() {
        SharesStorage.getItems((result) => {
            this.setState({
                shares: result
            });
        });
    }

    shareItem(share) {

    }

    removeShare(share) {
        SharesStorage.removeByData(share, ()=>{
            this.checkShares();
        });
    }

    shares() {
        if (_.isArray(this.state.shares)) {
            return this.state.shares.map((share, i) => {
                return (
                    <View key={i} style={styles.listItem}>
                        <Swipeout right={this.buttonRight(share)}
                                  left={this.buttonLeft(share)}
                                  style={styles.listItemSwipeWrapper}>
                            <Text style={styles.listItemData} numberOfLines={1}>{share.data}</Text>
                        </Swipeout>
                    </View>

                );
            });
        } else {
            return (
                <View style={styles.listItem}>
                    <Text style={styles.slot}>There nothing to share yet</Text>
                </View>
            );
        }

    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.topPanel}>
                    <TouchableHighlight style={styles.menuWrapper}>
                        <Icon name="menu" style={styles.menu}/>
                    </TouchableHighlight>
                    <View style={styles.separator}></View>
                    <TouchableHighlight style={styles.logoutWrapper} onPress={this.logout}>
                        <Icon name="exit-to-app" style={styles.logout}/>
                    </TouchableHighlight>
                </View>
                <ScrollView style={styles.container}>
                    <View style={styles.list}>
                        {this.shares()}
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        height: height
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        color: 'black',
    },
    separator: {
        flexGrow: 1
    },
    topPanel: {
        backgroundColor: '#2A303B',
        flexDirection: 'row',
        alignItems: 'flex-start',
        height: 60,
        width: width,
        justifyContent: 'center'
    },
    logoutWrapper: {
        padding: 8,
        alignSelf: 'flex-end',
        flexShrink: 0,
        flexGrow: 0
    },
    menuWrapper: {
        alignSelf: 'flex-start',
        width: 40,
        flexShrink: 0,
        flexGrow: 0
    },
    menu: {
        color: 'white',
        fontSize: 20
    },
    logout: {
        color: 'red',
        textAlign: 'center',
        padding: 8,
        borderWidth: 1,
        borderColor: 'red',
        borderStyle: 'solid',
        borderRadius: 4,
        backgroundColor: 'white',
        fontSize: 20
    },
    list: {
        flex: 1,
        flexDirection: 'column'
    },
    listItem: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomColor: '#e0e0e0',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        width: width
    },
    listItemSwipeWrapper: {
        flexDirection: 'row',
        width: width,
        flex: 1,
        backgroundColor: 'white'
    },
    listItemData: {
        flexGrow: 1,
        fontSize: 18,
        color: 'black',
        padding: 8,
        maxWidth: width
    },
    listItemShare: {},
    listItemShareIcon: {
        textAlign: 'center',
        padding: 8,
        fontSize: 20
    },
    slot: {
        flex: 1,
        textAlign: 'center'
    }
});
module.exports = Share;