import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Clipboard, Keyboard, BackHandler, ToastAndroid } from 'react-native'
import { Container, Item, Textarea, Icon, Button } from 'native-base'
import { Actions } from 'react-native-router-flux'

import NavBar from './subComponents/navBar'
import colors from '../style/colors'

export default class TextContent extends Component {
  
  constructor() {
    super()
    this.state = {
      text: 'BUILD SUCCESSFUL'
    }
  }

  popToPreview() {
    Actions.pop()
    Actions.pop()
  }

  copyTextContent = () => {
    let newText = this.state.text
    Clipboard.setString(newText)
    ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT)
  }

  componentWillMount = () => {
    this.setState({text: this.props.text})
  }

  onTextEdit(text) {
    this.setState({text: text})
  }

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.back)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.back)
  }

  back() {
    console.log('text x2')
    Actions.popTo('previewScreen') // go back
    // Actions.pop() // go back again
    return true // needed so that Backhandler knows that I'm overriding the default action and that it should not close the app
  }

  render() {
    const {text} = this.state
    return (
      <View style={styles.container}>
        <NavBar backFunc={this.back}/>
        <Textarea style={styles.content} value={text} onChangeText={this.onTextEdit.bind(this)} placeholder="No text found in the image"/> 
        <Button rounded onPress={this.copyTextContent} style={styles.copyBtn}>
          <View><Text style={styles.btnText}>Copy</Text></View>
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  backBtn: {
    width: '100%',
    margin: 5,
    marginLeft: 30,
    padding: 10,
    justifyContent: 'flex-start'
  },
  copyBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60, 
    height: 60,
    backgroundColor: colors.accent1,
    position: 'absolute',
    top: 30,
    right: '7%',
    elevation: 4
  },
  btnText: {
    color: 'white'
  },
  backIcon: {
    color: 'white'
  },
  content: {
    width: "90%",
    height: "70%",
    backgroundColor: 'white',
    padding: 25,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 25,
    marginTop: 25,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 5
  }
})