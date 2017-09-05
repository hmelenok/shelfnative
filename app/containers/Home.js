import React, {Component} from 'react';
import {ScrollView, View,TextInput, Image, Text, TouchableHighlight, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
class Home extends Component {
  searchPressed() {
    this.props.fetchRecipes('bacon,cucmber,banana');
  }
  render() {
    return <View style={{marginTop:20}}>
      <View>
        <TouchableHighlight onPress={() => { this.searchPressed(); }}>
          <Text>
            Fetch
          </Text>
        </TouchableHighlight>
      </View>
      <ScrollView>

      </ScrollView>
    </View>
  }
}

function mapStateToProps(state) {
  return {
    searchedRecipes: state.searchedRecipes
  }
}

export default connect(mapStateToProps)(Home);
