import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {Actions} from 'react-native-router-flux'

import NavBar from './subComponents/navBar'

export default class AboutScreen extends Component {
  
  back() {
    Actions.popTo('mainScreen')
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <NavBar backFunc={this.back}/>
        <View style={styles.container}>
          <Text style={styles.text}>blah blah blah</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {

  }
})