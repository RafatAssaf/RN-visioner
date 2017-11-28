import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import AppRouter from './containers/Router'
import colors from './style/colors'

export default class App extends Component {

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.accent2} />
        <AppRouter />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1
  }
});
