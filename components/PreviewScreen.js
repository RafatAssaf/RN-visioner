import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  ToastAndroid
} from 'react-native'
import { Button, Icon } from 'native-base'
import { Actions, Stack } from 'react-native-router-flux'
import RNFS from 'react-native-fs'
import RNFetchBlob from 'react-native-fetch-blob'
import ImagePicker from 'react-native-image-crop-picker'

import NavBar from './subComponents/navBar'
import { Vision } from '../api/vision'
import colors from '../style/colors'

const features = {
  WEB_DETECTION: "WEB_DETECTION",
  IMAGE_PROPERTIES: "IMAGE_PROPERTIES",
  TEXT_DETECTION: "TEXT_DETECTION",
  FACE_DETECTION: "FACE_DETECTION"
}

export default class PreviewScreen extends Component {

  constructor() {
    super();
    this.state = { 
      width: 0,
      height: 0
    }
  }

  _onLayout(event) {
    const containerWidth = event.nativeEvent.layout.width;
    const {width, height} = this.props
    this.setState({
      width: containerWidth,
      height: containerWidth * height / width
    });
  }
  
  extractColors = () => {
    Vision(this.props.uri, features.IMAGE_PROPERTIES, this.props.external)
    Actions.loadingScreen()
  }

  extractText = () => {
    Vision(this.props.uri, features.TEXT_DETECTION, this.props.external)
    Actions.loadingScreen()
  } 

  getVisuallySimilarImages = () => {
    Vision(this.props.uri, features.WEB_DETECTION, this.props.external)
    Actions.loadingScreen()
  }
  
  downloadImage() {
    ToastAndroid.show('Downloading...', ToastAndroid.SHORT)
    if(this.props.external){
      console.log('yes, it is an external image')
      let date = new Date()
      let imgPath = `${RNFS.PicturesDirectoryPath}/Visioner/visionerPic${date.getMilliseconds()}${date.getMinutes()}${date.getHours()}${date.getDay()}${date.getMonth()}${date.getFullYear()}.jpg`
      RNFS.mkdir(`${RNFS.PicturesDirectoryPath}/Visioner`)
      .then(() => {
        console.log('downloading now..')
        RNFS.downloadFile({
          toFile: imgPath,
          fromUrl: this.props.uri
        }).promise
        .then(() => {
          console.log('pic downloaded')
          RNFetchBlob.fs.scanFile([
            {
              path: imgPath
            }
          ])
          .then(() => {console.log('file scanned')})
          .catch(e => {console.log('error', e)})
        })
      })
    }
  }
  
  cropImage() {
    ImagePicker.openCropper({
      path: this.props.uri,
      height: 300, 
      width: 300
    }).then(img => {
      Actions.refresh({
        ...this.props,
        uri: img.path,
        height: img.height,
        width: img.width,
        base64: img.data
      })
    })
    .catch(err => {console.log(err)})
  }

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.back)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.back)
  }

  back() {
    Actions.popTo('mainScreen') 
    return true 
  }

  renderDownloadBtn = () => {
    if(this.props.external){
      return (
        <View style={styles.downloadBtnBox}>
          <Button rounded onPress={this.downloadImage.bind(this)} style={[styles.downloadBtn]}>
            <View><Icon name='download'/></View>
          </Button>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <NavBar backFunc={this.back}/>
          <View style={styles.container}>
            <View onLayout={this._onLayout.bind(this)} style={styles.img}>
              <Image source={{uri: this.props.uri}} style={{width: this.state.width, height: this.state.height}}/>
            </View>
          </View>
          {this.renderDownloadBtn()}
          <View style={styles.cropBtn}>
            <Button rounded style={styles.downloadBtn} onPress={this.cropImage.bind(this)}>
              <View><Icon name='crop'/></View>
            </Button>
          </View>
          <View style={styles.container}>
            <View style={styles.promptQuestionContainer}>
              <Text style={styles.promptQuestion}>What are you looking for ?</Text>
            </View>
            <TouchableOpacity style={styles.option} onPress={this.extractText}>
              <Text style={styles.optionTitle}>Text Content</Text>
              <Text style={styles.optionDesc}>Get the text from an image.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={this.extractColors}>
              <Text style={styles.optionTitle}>Dominant Colors</Text>
              <Text style={styles.optionDesc}>Extract the main colors of the image and their contributions.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={this.getVisuallySimilarImages}>
              <Text style={styles.optionTitle}>Visually Similar Images</Text>
              <Text style={styles.optionDesc}>Search the web for similar images.</Text>
            </TouchableOpacity>
            <View style={styles.bottom}/>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.base1
  },
  scrollView: {
    width: '100%',
    height: 300
  },
  img: {
    width: '90%',
    overflow: 'hidden',
    borderRadius: 25,
    marginTop: 25, 
    marginBottom: 15, 
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 8
  },
  option: {
    width: '90%',
    height: 70,
    justifyContent: 'center',
    backgroundColor:  colors.accent2,
    margin: 3,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 3 
  },
  promptQuestion: {
    color: '#727272', 
    fontSize: 18
  },
  promptQuestionContainer: {
    width: '90%',
    padding: 10,
    alignItems: 'flex-start',
  },
  optionTitle: {
    fontSize: 20,
    color: 'white'
  },
  optionDesc: {
    fontSize: 12,
    color: colors.base1
  },
  downloadBtnBox: {
    flex: 1,
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 30,
    right: '26%',
    shadowColor: '#000000',
    elevation: 3
  },
  cropBtn: {
    flex: 1,
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 30,
    right: '7%',
    elevation: 4
  },
  downloadBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent1,
    width: 60, 
    height: 60,
    marginLeft: 30,
    elevation: 4
  },
  bottom: {
    padding: 10
  }
})