import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class ColorPalette extends Component {

  renderColors() {
    return this.props.colors.map((colorObj, i) => {
      let color = colorObj.color
      return (
        <View
          style={{
            backgroundColor: `rgb(${color.red || 0},${color.green || 0},${color.blue || 0})`,
            flex: this.props.showScore? colorObj.score*10 : 1, 
            width: "100%",
          }}
          key={"color" + i}
        >
          <Text style={[styles.colorCode, {color: `rgb(${255-color.red},${255-color.green},${255-color.blue})`}]}>
            {'#'+color.red.toString(16)+color.green.toString(16)+color.blue.toString(16)}
          </Text>
        </View>
      )
    })
  }
  render() {
    return (
      <View style={styles.palette}>
        {this.renderColors()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  palette: {
    height: "70%",
    width: "90%",
    overflow: 'hidden',
    borderRadius: 25,
    marginTop: 25,
    elevation: 5
  },
  colorCode: {
    marginLeft: 20,
    color: 'white'
  }
})