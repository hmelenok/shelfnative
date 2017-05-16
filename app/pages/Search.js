import React, {Component} from 'react';
// import { Actions } from 'react-native-router-flux';
import {Dimensions, Image, ScrollView, StyleSheet, Text, ToastAndroid, TouchableHighlight, View, TextInput} from 'react-native';
import {searchGems} from '../network/helpers';
import {isObject, isString} from 'lodash';
import moment from 'moment';

const {width, height} = Dimensions.get('window');


export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {results: [], searchTerm: ''};
    }

    componentDidMount() {
        this.search();
    }

    search(searchObject = {}) {
        searchGems(searchObject)
            .then(response => {
                if (response) {
                    const {results: {total, hits}} = response;
                    this.setState({results: hits});
                } else {
                    ToastAndroid.show(
                        'No results',
                        ToastAndroid.LONG
                    );
                }

            })
    }

    _renderRow(gem) {
        const {_id, _source: {default_description, _highlight, previewSnippetImageURL, title, ownerUsername, createdAt}} = gem;
        const description = isObject(_highlight) && isString(_highlight.description) ? _highlight.description : default_description || '';
        return (<View>
            <View style={styles.row} key={_id}>
                <View style={styles.thumb}>
                    <Image style={styles.thumbImage} source={{uri: previewSnippetImageURL}}/>
                </View>
                <View style={styles.mainInfo}>
                    <Text style={styles.title} numberOfLines={1}>{title}</Text>
                    <Text style={styles.description} numberOfLines={2}>{description}</Text>
                </View>
                <View style={styles.secondaryInfo}>
                    <Text style={styles.authorName}>{moment(createdAt).fromNow()}</Text>
                    <Text style={styles.authorName}>{ownerUsername}</Text>
                </View>
            </View>
            {/*<Text>{JSON.stringify(gem, null, 4)}</Text>*/}
        </View>)
    }

    _renderSeparator() {
        return (
            <View
                style={{
                    height: 1,
                    backgroundColor: '#3B5998',
                }}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput ref="searchField"
                           style={styles.textInput}
                           onChangeText={(searchTerm) => this.setState({searchTerm})}
                           onSubmitEditing={() => this.search({query: this.state.searchTerm || ''})}
                           value={this.state.searchTerm}
                           />
                {/*<TouchableHighlight style={styles.buttonHighlight} onPress={() => this.search()}>*/}
                    {/*<View style={styles.button}>*/}
                        {/*<Text style={styles.buttonLabel}>Search</Text>*/}
                    {/*</View>*/}
                {/*</TouchableHighlight>*/}
                <ScrollView>
                    {this.state.results.map((gem) => this._renderRow(gem))}
                </ScrollView>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'column',
        height,
        justifyContent: 'flex-start'
    },
    button: {
        padding: 10,
        width,
        backgroundColor: 'orange',
    },
    buttonHighlight: {
        width,
        backgroundColor: 'orange',
    },
    buttonLabel: {
        color: 'white',
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
        maxWidth: width,
        overflow: 'hidden',
        padding: 0
    },
    thumb: {
        width: 64,
        height: 64,
        backgroundColor: 'black'
    },
    thumbImage: {
        width: 64,
        height: 64,
    },
    text: {
        flex: 1,
    },
    mainInfo: {
        flexDirection: 'column',
        paddingLeft: 10,
        maxWidth: width - 144,
        flexGrow: 1
    },
    title: {
        color: '#2a303b',
        fontSize: 14
    },
    description: {
        color: '#818181',
        fontSize: 12
    },
    secondaryInfo: {
        flexGrow: 1,
        flexShrink: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        maxWidth: 80
    },
    authorName: {
        textAlign: 'right',
        fontSize: 10,
        padding: 10,
        color: '#818181'
    }
});

