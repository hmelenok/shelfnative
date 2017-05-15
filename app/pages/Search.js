import React, {Component} from 'react';
// import { Actions } from 'react-native-router-flux';
import {Dimensions, StyleSheet, Text, ToastAndroid, TouchableHighlight, View, Image, ScrollView} from 'react-native';
import {searchGems} from '../network/helpers';

const {width, height} = Dimensions.get('window');


export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {results: []};
    }

    componentDidMount() {
        this.search();
    }

    search() {
        searchGems({})
            .then(response => {
                if(response) {
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

    _renderRow() {
        return (<View>
            <View style={styles.row}>
                {/*<Image style={styles.thumb} source={imgSource} />*/}
                <Text style={styles.text}>
                    1
                </Text>
            </View>
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
                <TouchableHighlight style={styles.buttonHighlight} onPress={() => this.search()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonLabel}>Search</Text>
                    </View>
                </TouchableHighlight>
                <ScrollView>
                    {this.state.results.map(({_id, _source, description}) => (
                        <View style={styles.row} key={_id}>
                            <Image style={styles.thumb} source={{uri: _source.previewSnippetImageURL}} />
                            <View>
                                <Text>{_source.title}</Text>
                                <Text>{description}</Text>
                            </View>
                            <Text>{JSON.stringify(_source)}</Text>
                        </View>))}
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
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',
    },
    thumb: {
        width: 64,
        height: 64,
    },
    text: {
        flex: 1,
    },
});

