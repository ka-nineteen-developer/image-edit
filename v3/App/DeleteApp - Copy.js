/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  ToastAndroid,
  TouchableOpacity,
  Image,
} from 'react-native';
import { captureRef } from "react-native-view-shot";
import RNFetchBlob from 'react-native-fetch-blob';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const { config, fs } = RNFetchBlob;
const dirs = RNFetchBlob.fs.dirs;

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: {
        format: "png",
        quality: 0.9,
        // width: 1560,
        // height: 1560,
        result: "base64",
        snapshotContentContainer: false
      }
    };
  }


  render() {
    return (
      <View ref="body" style={{
        backgroundColor: 'red',
      }}>
        <Text>Welcome to React Native!</Text>
        <Text>To get started, edit App.js</Text>
        <Text>{instructions}</Text>
        <TouchableOpacity onPress={()=>this.checkForFolder("body")}>
          <Text>asdads</Text>
        </TouchableOpacity>
        {this.state.imageurl?
        <Image source={{uri: this.state.imageurl}}
          style={{width: '100%', height: '100%'}}/>
        :null}
      </View>
    );
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
  captureRef(this.refs[refname], this.state.value)
    .then(res => {
      this.setState({
        'imageurl': res
      }, function(){
        // // Check for free space
        RNFetchBlob.fs.df()
          .then((response) => {
            // If free space is more then 100mb
            if (response.internal_free > 100000000) {
                var path = dirs.SDCardDir + "/Image_editor/image.png";
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
