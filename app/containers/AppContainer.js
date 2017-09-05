import React, {Component} from 'react';
import {Text, View, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions/index';

class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  addRecipe() {
    this.props.addRecipe();
  }
  render() {

    return (<View>
      <Text style={{marginTop: 20}}>
        Hi {this.props.recipeCount}
      </Text>
      <TouchableHighlight onPress={()=> {this.addRecipe()}}>
        <Text>
          Add recipe
        </Text>
      </TouchableHighlight>
    </View>)
  }
}

function mapDispatchTopProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => {
  return {
    recipeCount: state.recipeCount
  }
}, mapDispatchTopProps)(AppContainer);
