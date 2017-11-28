import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Spinner from 'react-native-spinkit'
import { Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'

import NavBar from './subComponents/navBar'
import colors from '../style/colors'

export default class LoadingScreen extends Component {
  constructor() {
    super()
    this.state = {
      index: 1,
      types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
      size: 100,
      color: "#FFFFFF",
      isVisible: true
    }
  }

  render() {
    let {index, types, size, isVisible, color} = this.state
    let type = types[index % types.length]

    return (
      <View style={styles.container}>
        <View style={styles.spinnerContainer}>
          <Spinner type={type} size={size} isVisible={true} color={colors.base1} style={styles.spinner}/>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.base2
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50
  },
  spinner:{
    margin: 25
  },
  loadingText: {
    color: colors.base1,
    fontSize: 20
  },
})