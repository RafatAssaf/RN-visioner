import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Icon } from 'native-base'
import colors from '../../style/colors'

export default class NavBar extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.backBtn}>
          <TouchableWithoutFeedback style={styles.touchable} onPress={this.props.backFunc}>
            <Icon name='md-arrow-back' style={styles.icon}/>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 55,
    backgroundColor: colors.base2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 3
  },
  icon: {
    color: 'white'
  },
  backBtn: {
    marginLeft: '6%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  }
})