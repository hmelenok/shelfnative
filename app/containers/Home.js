import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableHighlight, View, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {get} from 'lodash';
import { Actions } from 'react-native-router-flux';



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      searchInput: ''
    };
    console.log(props);
  }
  searchPressed() {
    this.setState({
      searching: true
    });
    this.props.fetchGems(this.state.searchInput)
      .then(() => {
        this.setState({
          searching: false
        });
        Actions.everything();
      });
  }

  gems() {
    return Object.keys(this.props.searchedGems)
      .map(key => this.props.searchedGems[key]);
  }

  render() {
    return <View style={styles.scene}>
      <View style={styles.searchSection}>
        <TextInput style={styles.searchInput}
                   returnKeyType="search"
                   placeholder="Search terms"
                   onChangeText={ (searchInput) => this.setState({searchInput})}
                   value={this.state.searchInput}
        />
        <TouchableHighlight onPress={() => {
          this.searchPressed();
        }} style={styles.searchButton}>
          <Text>
            Fetch
          </Text>
        </TouchableHighlight>
      </View>
      <ScrollView style={styles.scrollSection}>
        {!this.state.searching && this.gems().map((recipe) => {
          return <View key={recipe._id}>
            <Image source={{uri: get(recipe, '_source.previewSnippetImageURL', 'https://static.shelf.io/images/backgrounds/card-background.png')}} style={styles.resultImage}/>
            <Text style={styles.resultText}>
              {get(recipe, '_source.title', '')}
            </Text>
          </View>
        })}
        {this.state.searching ? <Text>Searching...</Text> : null }
          </ScrollView>
    </View>
  }
}

function mapStateToProps(state) {
  return {
    searchedGems: state.searchedGems
  }
}


const styles = StyleSheet.create({
  scene: {
    flex: 1,
    marginTop: 20
  },
  searchSection: {
    height: 30,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    padding: 5,
    flexDirection: 'row'
  },
  scrollSection: {
    flex: 0.8
  },
  resultImage: {
    height: 150
  },
  resultText: {
    backgroundColor: '#000',
    color: '#FFF',
    height: 20
  },
  searchInput: {
    flexGrow: 1,
  },
  searchButton: {
    flexShrink: 0
  },
});

export default connect(mapStateToProps)(Home);
