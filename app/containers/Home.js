import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableHighlight, View, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {get} from 'lodash';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      ingredientsInput: ''
    }
  }
  searchPressed() {
    this.setState({
      searching: true
    });
    this.props.fetchRecipes(this.state.ingredientsInput)
      .then(() => {
        this.setState({
          searching: false
        });
      });
  }

  recipes() {
    return Object.keys(this.props.searchedRecipes)
      .map(key => this.props.searchedRecipes[key]);
  }

  render() {
    return <View style={styles.scene}>
      <View style={styles.searchSection}>
        <TextInput style={styles.searchInput}
                   returnKeyType="search"
                   placeholder="Search terms"
                   onChangeText={ (ingredientsInput) => this.setState({ingredientsInput})}
                   value={this.state.ingredientsInput}
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
        {!this.state.searching && this.recipes().map((recipe) => {
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
    searchedRecipes: state.searchedRecipes
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
