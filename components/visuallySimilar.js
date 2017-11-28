import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, BackHandler } from 'react-native'
import { Actions } from 'react-native-router-flux'
import {Icon} from 'native-base'

import colors from '../style/colors'
import NavBar from './subComponents/navBar'

export default class VisuallySimilarImages extends Component {
  
  constructor() {
    super()
  }

  popToPreview(){
    Actions.pop()
    Actions.pop()
  }

  previewResult(url) {
    Image.getSize(url, (width, height) => {
      Actions.previewScreen({
        width: width,
        height: height,
        uri: url,
        external: true
      })
    })
  }

  renderTags() {
    return this.props.entities.slice(0, 7).map((tagObj, i) => {
      let {description} = tagObj;
      if(description){
        return (
          <View style={styles.tag} key={'tag#' + i}>
            <Text style={styles.tagText}>{description}</Text>
          </View>
        )
      }
    })
  }

  renderImages() {
    function arrayOfThrees(images) {
      if(images.length <= 3) {return [images]}
      return [images.slice(0, 3)].concat(arrayOfThrees(images.slice(3)))
    }
    let rows = arrayOfThrees(this.props.images)
    return rows.map((row, i) => {
      return (
        <View style={styles.row} key={'row#' + i}>
          {row.map((img, j) => {
            if((/\.\w{3}$/).test(img.url)){
              return ( 
                <TouchableOpacity onPress={() => {this.previewResult(img.url)}} style={styles.imgTouchable} key={'img'+j+i}>
                  <Image source={{uri: img.url}} style={styles.img}/> 
                </TouchableOpacity>
              )
            }
          })}
        </View>
      )
    })
  }

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.back)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.back)
  }

  back() {
    console.log('similar x1')    
    Actions.popTo('previewScreen') // go back
    // Actions.pop() // go back again
    return true // needed so that Backhandler knows that I'm overriding the default action and that it should not close the app
  }
  
  render() {
    if(this.props.images.length > 0) {
      return (
        <View style={styles.container}>
          <NavBar backFunc={this.back}/>
          <ScrollView style={styles.scrollView}>
            <ScrollView style={styles.tagsContainer} horizontal showsHorizontalScrollIndicator={false}>
              {this.renderTags()}
            </ScrollView>
            <ScrollView style={styles.imagesContainer}>
              {this.renderImages()}
            </ScrollView>
          </ScrollView>
        </View> 
      )
    } else {
      <Text>No Similar Images Found</Text>
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    width: '100%',
    height: 300
  },
  tagsContainer: {
    padding: 5,
    flexDirection: 'row',
    paddingRight: 10
  },
  tag: {
    padding: 5,
    borderRadius: 7,
    backgroundColor: colors.accent1,
    marginLeft: 5,
  },
  tagText: {
    color: colors.base1,
    fontSize: 15
  },
  img: {
    marginRight: 5,
    flex: 1,
    height: 200
  },
  imgContainer: {
    width: 100,
    height: 100,
    marginLeft: 5,
    marginTop: 5,
    backgroundColor: 'skyblue'
  },
  imgTouchable: {
    flex: 1
  },
  imagesContainer: {
    flex: 1, 
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 5,
  }
})