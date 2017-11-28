import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  NetInfo
} from 'react-native'
import { Router, Scene, Actions, Modal } from 'react-native-router-flux'

import CaptureScreen from '../components/CaptureScreen'
import PreviewScreen from '../components/PreviewScreen'
import DominantColorsScreen from '../components/dominantColors' 
import LoadingScreen from '../components/loadingScreen'
import TextContent from '../components/textContent'
import VisuallySimilarImages from '../components/visuallySimilar'
import MainScreen from '../components/mainScreen'
import NoConnection from '../components/noConnection'
import AboutScreen from '../components/about'

export default class AppRouter extends Component {

  constructor() {
    super()
    this.state = {
      isConnected: NetInfo.isConnected.fetch().then(res => res)
    }
  }

  componentDidMount() {
    console.log('showing noConnection page: ' + !this.state.isConnected)
  }

  render() {
    return (
      <Router>
        <Modal>
          <Scene key='root'>
            <Scene component={MainScreen} key='mainScreen' hideNavBar/>
            <Scene component={PreviewScreen} key='previewScreen' title='Here is your image' hideNavBar/>
            <Scene component={NoConnection} key='noConnection' hideNavBar initial={!this.state.isConnected}/>                    
            <Scene component={DominantColorsScreen} key='dominantColorsScreen' title='Dominant Colors' hideNavBar/>
          </Scene>
          <Scene component={LoadingScreen} key='loadingScreen' hideNavBar/>
          <Scene component={AboutScreen} key='aboutScreen' hideNavBar/>
          <Scene component={TextContent} key='textContent' hideNavBar/> 
          <Scene component={VisuallySimilarImages} key='visuallySimilarImages' hideNavBar/>
        </Modal>
      </Router> 
    )
  }
}

const styles = StyleSheet.create({

})

