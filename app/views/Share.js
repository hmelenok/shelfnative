import React, {Component} from "react";
import {ScrollView, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {Actions} from "react-native-router-flux";
import Meteor from "react-native-meteor";
import _ from "lodash";
const Shares = require('../storage/shares');
const SharesStorage = new Shares();

class Share extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shares: []
        };
    }
    logout(){
        Meteor.logout();
        Actions.auth();
    }
    componentWillMount(){
        console.log('SharesStorage', SharesStorage);
        SharesStorage.getItems((result)=>{
            this.setState({
                shares: result
            });
        });
    }
    shareItem(share){

    }
    shares(){
        if(_.isArray(this.state.shares)){
            return this.state.shares.map((share, i) => {
                return (
                    <View key={i} style={styles.listItem}>
                        <Text style={styles.listItemType}>{share.type}</Text>
                        <Text style={styles.listItemData} numberOfLines={1}>{share.data}</Text>
                        <TouchableHighlight onPress={this.shareItem(share)}>
                            <Text style={styles.logout}>Share</Text>
                        </TouchableHighlight>
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
            <ScrollView  style={styles.container}>
                <View style={styles.topPanel}>
                    <TouchableHighlight style={styles.logoutWrapper} onPress={this.logout}>
                        <Text style={styles.logout}>Logout</Text>
                    </TouchableHighlight>
                </View>

                <View style={styles.list}>
                    {this.shares()}
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        color: 'black',
    },
    topPanel: {
        backgroundColor: '#2A303B'
    },
    logoutWrapper: {
        width: 100,
        margin: 8,
        alignSelf: 'flex-end'
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
        padding: 8
    },
    listItemType: {
        padding: 8
    },
    listItemData: {
        padding: 8,
        flexGrow: 1
    },
    slot: {
        flex: 1,
        textAlign: 'center'
    }
});
module.exports = Share;