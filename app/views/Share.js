import React, { Component } from 'react';
import {ScrollView ,StyleSheet,Text,TouchableHighlight,View} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Meteor from "react-native-meteor";
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
        return this.state.shares.map((share, i) => {
            return(
                <View key={i} style={styles.listItem}>
                    <Text style={styles.listItemType}>{share.type}</Text>
                    <Text style={styles.listItemData} numberOfLines={1}>{share.data}</Text>
                    <TouchableHighlight onPress={this.shareItem(share)}>
                        <Text style={styles.logout}>Share</Text>
                    </TouchableHighlight>
                </View>
            );
        });
    }
    render() {
        return (
            <ScrollView  style={styles.container}>
                <TouchableHighlight onPress={this.logout}>
                    <Text style={styles.logout}>Logout</Text>
                </TouchableHighlight>
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
        backgroundColor: '#CCCCCC',
    },
    text: {
        color: 'black',
    },
    logout: {
        color: 'red',
        textAlign: 'right',
        padding: 8
    },
    list: {
        flex: 1,
        flexDirection: 'column'
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    listItemType: {
        padding: 8
    },
    listItemData: {
        padding: 8,
        width: 240,
    }
});
module.exports = Share;