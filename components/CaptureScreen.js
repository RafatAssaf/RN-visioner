import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native'
import Camera from 'react-native-camera'
import {
  Button,
  Container,
  Icon
} from 'native-base'

import ImagePicker from 'react-native-image-picker'
import { Actions } from 'react-native-router-flux'

import { annotate } from '../api/vision'

export default class CaptureScreen extends Component {

  constructor() {
    super()
    this.state = {
      spinnerVisibility: false
    }
  }
  
  takePicture = () => {
    console.log("Shoot!")
    const options = {};
    this.camera.capture({metadata: options})
      .then((data) => {
        console.log('pic took', data)
        const uri = data.mediaUri
        Image.getSize(uri, (width, height) => {
          Actions.previewScreen({
            uri: data.mediaUri,
            width: width,
            height: height,
            external: false
          })
        })
      })
      .catch(err => console.error(err));
  }

  openImageLibrary() {
    
    let options = {
      title: 'Pick an image',
    }
    ImagePicker.launchImageLibrary(options, (res) => {
        console.log('Response = ', res);
        if (res.didCancel) {
          alert('User cancelled image picker');
        }
        else if (res.error) {
          alert('ImagePicker Error: '+ res.error);
        }
        else {
          Image.getSize(res.uri, (width, height) => {
            Actions.previewScreen({
              width: width,
              height: height,
              uri: res.uri,
              external: false
            })
          })
        }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.camContainer}>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={styles.preview}
            aspect={Camera.constants.Aspect.stretch}
            captureQuality={Camera.constants.CaptureQuality.high}>
              <View style={styles.btnGroup}>
                <Button rounded onPress={this.openImageLibrary} style={styles.copyBtn}>
                  <View><Icon name='photos'/></View>
                </Button>
                <View style={styles.separator}/>
                <Button rounded onPress={this.takePicture} style={styles.copyBtn}>
                  <View><Icon name='camera'/></View>
                </Button>
              </View>
          </Camera>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  camContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  btnBox: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end'
  },
  copyBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60, 
    height: 60,
    margin: 3,
  },
  btnGroup: {
    backgroundColor: 'skyblue',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius: 200,
    marginBottom: 30
  },
  separator: {
    width: 15
  }
});
