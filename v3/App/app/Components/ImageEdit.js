import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  ToastAndroid,
  TouchableOpacity,
  Image,
  Modal,
  Slider,
} from 'react-native';
import {
  Tab,
  Tabs,
  TabHeading,
  Icon,
} from 'native-base';
import { captureRef } from "react-native-view-shot";
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-picker';
import FooterElement from './Footer';
import Draggable from './Draggable';

const { config, fs } = RNFetchBlob;
const dirs = RNFetchBlob.fs.dirs;

export default class ImageEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layerFontSize: 20,
      layerFontOpacity: 1,
      layerFontColor: '#ffffff',
      isModalVisible: false,
      imageFormate: 'png'
    };
  }


  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
      }}>
        <View style={{
          backgroundColor: 'blue',
          flex: 0.1
        }}>
          <TouchableOpacity onPress={() => this.selectImage()}>
            <Text>selectImage</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.checkForFolder("body")}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          backgroundColor: 'red',
          flex: 0.7,
          justifyContent: 'center',
          alignItems: 'center'
        }} onLayout={(event)=>{
          console.log(event.nativeEvent.layout);
          this.setState({ImageWrapperWidth: event.nativeEvent.layout.width});
          this.setState({ImageWrapperHeight: event.nativeEvent.layout.height});
          this.setState({dropZoneValues : event.nativeEvent.layout});
        }}>
          {/* {this.state.imageInfo ? */}
            <View ref="body" style={{
              backgroundColor: 'green',
              // height: this.state.snapShotImageHeight,
              // width: this.state.snapShotImageWidth,
              height: '100%',
              width: '100%',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.imageInfo.data }}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              /> */}
                <Draggable data={{
                  'ImageWrapperWidth': this.state.ImageWrapperWidth,
                  'ImageWrapperHeight': this.state.ImageWrapperHeight,
                }} />
            </View>
            {/* : null
          } */}
        </View>
        <View style={{
          backgroundColor: 'yellow',
          flex: 0.2
        }}>
        <FooterElement />
        </View>
      </View>
    );
  }

  selectImage = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log(response);
        if(response.width<response.height){
          this.setState({snapShotImageWidth: (response.width*this.state.ImageWrapperHeight)/response.height});
          this.setState({snapShotImageHeight: this.state.ImageWrapperHeight});
        } else if(response.width>response.height){
          this.setState({snapShotImageHeight: (response.height*this.state.ImageWrapperWidth)/response.width});
          this.setState({snapShotImageWidth: this.state.ImageWrapperWidth});
        } else {
          this.setState({snapShotImageHeight: this.state.ImageWrapperHeight});
          this.setState({snapShotImageWidth: this.state.ImageWrapperWidth});
        }
        this.setState({
          imageInfo: response,
        });
      }
    });
  }

  async checkForFolder(flag) {
    let dirs = RNFetchBlob.fs.dirs;
    try {
      PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]
      ).then((result) => {
        // Check for image folder exist
        let tempResult = JSON.stringify(result).replace(/\./g, '_');
        tempResult = JSON.parse(tempResult)
        if (tempResult.android_permission_WRITE_EXTERNAL_STORAGE == 'granted' && tempResult.android_permission_READ_EXTERNAL_STORAGE == 'granted') {
          RNFetchBlob.fs.exists(dirs.SDCardDir + '/Image_editor')
            .then((exist) => {
              if (exist) {
                this.snapshot(flag);
              } else {
                RNFetchBlob.fs.mkdir(dirs.SDCardDir + '/Image_editor')
                  .then(() => {
                    this.snapshot(flag);
                  })
                  .catch((err) => {
                    ToastAndroid.show(err, ToastAndroid.SHORT);
                  })
              }
            })
            .catch((err) => {
              ToastAndroid.show(err, ToastAndroid.SHORT);
            })
        } else if (tempResult.android_permission_WRITE_EXTERNAL_STORAGE == 'never_ask_again' && tempResult.android_permission_READ_EXTERNAL_STORAGE == 'never_ask_again') {
          ToastAndroid.show('Please grant media permission manually', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Media permission needed', ToastAndroid.SHORT);
        }
      })
    } catch (err) {
      ToastAndroid.show(err, ToastAndroid.SHORT);
    }
  }

  snapshot(refname) {
    let value = {
      format: this.state.imageFormate,
      quality: 0.9,
      // width: this.state.imageInfo.width,
      // height: this.state.imageInfo.height,
      result: "base64",
      snapshotContentContainer: false
    }
    captureRef(this.refs[refname], value)
      .then(res => {
        this.setState({
          'imageurl': res
        }, function () {
          // // Check for free space
          RNFetchBlob.fs.df()
            .then((response) => {
              // If free space is more then 100mb
              if (response.internal_free > 100000000) {
                var path = dirs.SDCardDir + "/Image_editor/"+this.state.imageInfo.fileName.split('.')[0]+"."+this.state.imageFormate;
                RNFetchBlob.fs.writeFile(path, this.state.imageurl, 'base64')
                  .then((res) => {
                    ToastAndroid.show('Saved successfully', ToastAndroid.SHORT);
                  });
              } else {
                ToastAndroid.show('Insufficient memory', ToastAndroid.SHORT);
              }
            })
        });
      })
      .catch(
        error => (
          console.warn(error)
        )
      );
  }

}
