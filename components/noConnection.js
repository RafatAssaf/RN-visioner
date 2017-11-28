import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class NoConnection extends Component {
  render() {
    return (
      <View style={styles.container} elevation={5}>
        <Text>Could Not Connect :(</Text>
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
})