import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, BackHandler, Alert, ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'
import ColorPalette from './colorPalette'
import {
  Button,
  Container,
  Icon
} from 'native-base'
import { captureRef } from 'react-native-view-shot'
import RNFS from 'react-native-fs'
import RNFetchBlob from 'react-native-fetch-blob'

import NavBar from './subComponents/navBar'
import colors from '../style/colors'

export default class DominantColorsScreen extends Component {

  constructor() {
    super()
    this.state = {
      showScore: false
    }
    BackHandler.addEventListener('hardwareBackPress', () => {})
  }

  switchToScoreView = () => {
    this.setState({showScore: !this.state.showScore})
    //console.log(this.state.showScore)
  }

  popToPreview() {
    Actions.pop()
    Actions.pop()
  }

  componentWillMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.back)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.back)
  }

  back() {
    console.log('colors x2')
    Actions.popTo('previewScreen') // go back
    // Actions.pop() // go back again
    return true // needed so that Backhandler knows that I'm overriding the default action and that it should not close the app
  }

  capturePalette() {
    ToastAndroid.show('Downloading...', ToastAndroid.SHORT)

    captureRef(this.refs.palette, {
      format: 'jpg',
      quality: 0.9,
      result: 'base64'
    })
    .then(base64 => {
      let filePath =  `${RNFS.PicturesDirectoryPath}/Palettes`
      RNFS.mkdir(filePath)
      .then(() => {
        console.log('directory made..')
        let date = new Date()        
        let imgPath = `${RNFS.PicturesDirectoryPath}/Palettes/visionerPalette${date.getMilliseconds()}${date.getMinutes()}${date.getHours()}${date.getDay()}${date.getMonth()}${date.getFullYear()}.jpg`        
        RNFS.writeFile(imgPath, base64, 'base64')
        .then(success => {
          RNFetchBlob.fs.scanFile([
            {
              path: imgPath
            }
          ])
          .then(() => ToastAndroid.show('Done!', ToastAndroid.SHORT))
          .catch(e => {console.log('error', e)})
        })
        .catch(e => console.log('Error: ' + e))
      })
    })
    .catch(err => {Alert('Error:' + err)})
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar backFunc={this.back}/>
        <ColorPalette colors={this.props.colors} showScore={this.state.showScore} ref='palette'/>
        <Button rounded onPress={this.switchToScoreView} style={styles.switchBtn}>
          <View><Text style={styles.btnText}>%</Text></View>
        </Button>
        <Button rounded onPress={this.capturePalette.bind(this)} style={[styles.switchBtn, {right: '25%'}]}>
          <View><Icon name='download'/></View>
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.base1
  },
  viewshot: {
    flex: 1, 
    width: '100%',
    backgroundColor: 'green'
  },
  switchBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60, 
    height: 60,
    position: 'absolute',
    top: 30,
    right: '7%',
    elevation: 5,
    backgroundColor: colors.accent1
  },
  btnText: {
    color: 'white',
    fontSize: 25
  },
  backBtn: {
    width: '100%',
    margin: 5,
    marginLeft: 30,
    padding: 10,
    justifyContent: 'flex-start'
  },
  backIcon: {
    color: 'white'
  }
})