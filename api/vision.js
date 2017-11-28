
import { Image } from 'react-native'
import { NativeModules } from 'react-native'
import ImageResizer from 'react-native-image-resizer'
import { Actions } from 'react-native-router-flux'

const apiKey = "AIzaSyCW-DsQYJL4RR8wGtGYrlnVGiHfA2HVVhw";

function fetchApi(base64, feature, uri) {
  let imageObj = uri? {"source": {"imageUri": uri}} : { "content": base64 };

  fetch(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, {
    method: 'POST',
    body: JSON.stringify({
      "requests": [
        {
          "features": [
            { 
              "type": feature,
              "maxResults": 30
            },
          ],
          "image": imageObj
        }
      ]
    })
  })
    .then(res => {
      console.log('got response from api')
      return res.json()
      .then(response => {
        //do something with results
        console.log(response)
        switch(feature) {
          case "IMAGE_PROPERTIES": 
            Actions.replace('dominantColorsScreen', {
              colors: response.responses["0"].imagePropertiesAnnotation.dominantColors.colors
            })
            break;
          case "TEXT_DETECTION":
            if(Object.keys(response.responses["0"]).length) {
              Actions.replace('textContent', {text: response.responses["0"].fullTextAnnotation.text})
            } else {
              Actions.replace('textContent', {text: ''})
            }
            break;
          case "WEB_DETECTION":
            Actions.replace('visuallySimilarImages', {
              images: response.responses["0"].webDetection.visuallySimilarImages,
              entities: response.responses["0"].webDetection.webEntities
            })
            break
        }
      })
    })
    .catch(err => {
      //error handling
      console.log('Error: ' + err)
    })
}

function getBase64(path, callback) {
  NativeModules.RNImageToBase64.getBase64String(path, (err, base64) => {
    if(err) {
      console.log("Error: " + err)
    } else {
      console.log("image converted to base64")
      callback(base64)
    }
  })
}

function resizeImage(path, callback, width=640, height=720) {
  ImageResizer.createResizedImage(path, 
    width > 640? 640: width, 
    (height/width) * (width > 640? 640: width),
    'JPEG', 80)
    .then(resizedImageUri => {
      console.log("image resized: ", resizedImageUri)
      callback(resizedImageUri.uri)
    })
    .catch(e => console.log(e))
}

export async function Vision(path, feature, external = false) {
  console.log('image path to annotate', path)
  return external ?
    fetchApi(null, feature, path):
    resizeImage(path, (resizedImgUri) => {
      getBase64(resizedImgUri, (base64) => {
        fetchApi(base64, feature)
      })
    })
}

//Step by step
/*
  Get image uri
  resize it
  get base64 string
  fetch api with base64
  do something with result
*/