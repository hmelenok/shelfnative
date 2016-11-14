import React, {Component} from "react";
import {ScrollView, StyleSheet, Text, TouchableHighlight, ToastAndroid, View, Dimensions} from "react-native";
import _ from "lodash";
import Icon from "react-native-vector-icons/MaterialIcons";
import Swipeout from "react-native-swipeout";
import SideNav from "./SideNav";
const Shares = require('../storage/shares');
const Gem = require('../storage/gem');
const SharesStorage = new Shares();
const {height, width} = Dimensions.get('window');

class Share extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shares: [],
            openNav: false
        };
    }

    buttonRight(share) {
        return [
            {
                component: (<Icon name="delete"
                                  size={25}
                                  color="white"
                                  style={styles.listItemShareIcon}
                                  onPress={() => this.removeShare(share)}/>),
                backgroundColor: '#E53935',
                onPress: () => this.removeShare(share),
                color: 'white',
                type: 'secondary'
            }
        ];
    }

    buttonLeft(share) {
        return [
            {
                component: (<Icon name="share"
                                  size={25}
                                  color="white"
                                  onPress={() => this.shareItem(share)}
                                  style={styles.listItemShareIcon}/>),
                backgroundColor: '#4CAF50',
                onPress: () => this.shareItem(share),
                color: 'white',
                type: 'primary'
            }
        ];
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
        let gem = new Gem();
        console.log(share.data);
        const items = share.data.split('\n').filter(item => {
            return !_.isEmpty(item)
        });
        const link = _.head(items.filter(item => item.indexOf('http') > -1));
        let title = _.head(items.filter(item => item.indexOf('http') === -1));
        // console.log(share.data, 'link', link, 'title', title);
        if (_.isEmpty(title)) {
            title = link;
        }
        gem.title = title;
        gem.type = share.type;
        gem.informationSourceURL = link;

        gem.insert('', (error) => {
            if (error) {
                ToastAndroid.showWithGravity(error.reason, ToastAndroid.SHORT, ToastAndroid.CENTER);
            } else {
                ToastAndroid.showWithGravity(
                    'Gem shared it will appear in your private library',
                    ToastAndroid.SHORT, ToastAndroid.CENTER);
                this.removeShare(share);
            }
        });
    }

    removeShare(share) {
        SharesStorage.removeByData(share, () => {
            this.checkShares();
        });
    }

    shares() {
        if (_.isArray(this.state.shares) && !_.isEmpty(this.state.shares)) {
            return this.state.shares.map((share, i) => {
                return (
                    <View key={i} style={styles.listItem}>
                        <Swipeout right={this.buttonRight(share)}
                                  left={this.buttonLeft(share)}
                                  style={styles.listItemSwipeWrapper}>
                            <Text style={styles.listItemData} numberOfLines={3}>{share.data}</Text>
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
                        <Icon name="menu" style={styles.menu} onPress={() => this.setState({openNav: true})}/>
                    </TouchableHighlight>
                    <View style={styles.separator}>
                    </View>
                </View>
                <ScrollView style={styles.container}>
                    <View style={styles.list}>
                        {this.shares()}
                    </View>
                </ScrollView>
                <SideNav open={this.state.openNav}/>
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
        height: 50,
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
        flexShrink: 0,
        flexGrow: 0,
        padding: 8,
        paddingTop: 10
    },
    menu: {
        color: 'white',
        fontSize: 30
    },
    logout: {
        color: 'white',
        fontSize: 30
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
        padding: 8
    },
    slot: {
        flex: 1,
        textAlign: 'center'
    }
});
module.exports = Share;