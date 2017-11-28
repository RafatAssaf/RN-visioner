import React, { Component } from 'react'
import { View, Text, StyleSheet, BackHandler, TouchableWithoutFeedback, Image } from 'react-native'
import { Button, Icon } from 'native-base'
import { Actions, Stack } from 'react-native-router-flux'
import ImagePicker from 'react-native-image-crop-picker'

import { annotate } from '../api/vision'
import colors from '../style/colors'

export default class MainScreen extends Component {


  takePicture() {
    ImagePicker.openCamera({
      includeBase64: true,
    }).then((img) => {
      console.log(img)
      Actions.previewScreen({
        external: false,
        uri: img.path,
        height: img.height,
        width: img.width,
        base64: img.data
      })
    })
    .catch(err => {console.log(err)})
  }

  openImageLibrary() {
    ImagePicker.openPicker({
      multiple: false,
      includeBase64: true,
      mediaType: 'photo'
    }).then((img) => {
      console.log(img)
      Actions.previewScreen({
        external: false,
        uri: img.path,
        height: img.height,
        width: img.width,
        base64: img.data
      })
    })
    .catch(err => {console.log(err)})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.backgroundImg}
            source={{uri: 'https://i.imgur.com/WQFzLIz.jpg'}}
          />
        </View>
        <View style={styles.aboutHeader}>
          <TouchableWithoutFeedback onPress={Actions.aboutScreen}>
            <View><Text style={styles.i}>i</Text></View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.titleBox}>
          <Text style={styles.title}>Visioner</Text>
        </View>
        <View style={styles.btnGroup}>
          <Button rounded onPress={this.openImageLibrary.bind(this)} style={styles.roundBtn}>
            <View><Icon name='photos'/></View>
          </Button>
          <View style={styles.separator}/>
          <Button rounded onPress={this.takePicture.bind(this)} style={styles.roundBtn}>
            <View><Icon name='camera'/></View>
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.base1,
  },
  imgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  backgroundImg: {
    flex: 1,
    opacity: 0.3
  },
  aboutHeader: {
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: '7%',
    paddingTop: '4%',
    position: 'absolute',
    top: 0,
    margin: 0
  },
  i: {
    fontSize: 35,
    padding: 5,
    fontFamily: 'cursive',
    color: colors.accent2
  },
  roundBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60, 
    height: 60,
    margin: 3,
    backgroundColor: colors.accent1,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 4
  },
  btnGroup: {
    backgroundColor: colors.base2,
    flexDirection: 'row',
    borderRadius: 200,
    marginBottom: 50,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 8
  },
  separator: {
    width: 15
  },
  titleBox: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: 100,
    paddingLeft: '11%'
  },
  title: {
    fontSize: 65,
    fontFamily: 'sans-serif-condensed',
    color: colors.accent2,
  }
})