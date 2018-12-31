/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
// import {AppDrawerNavigator} from './app/router';
import {baseDetails} from './app/baseDetails';
import ImageEdit from './app/Components/ImageEdit';
// import OneSignal from 'react-native-onesignal';
import {
  BackHandler,
  Alert,
  Linking,
  // View,
  // Text
} from 'react-native';

console.disableYellowBox = true;

export default class App extends Component {
  render() {
    return (
      <ImageEdit/>
    );
  }

// componentWillMount() {
//   console.disableYellowBox = true;

//   // OneSignal
//   // OneSignal.init("f4cdf907-c762-41bf-bdfb-032fd9181b03");
//   // OneSignal.inFocusDisplaying(2);

//   BackHandler.addEventListener('hardwareBackPress', this.handleBackPress.bind(this));
// }

// componentWillUnmount() {
//   BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress.bind(this));
// }

// handleBackPress() {
//   Alert.alert(
//       'Quotes',
//       'Are you sure you want to exit?',
//       [
//           { text: 'Exit', onPress: () => { BackHandler.exitApp() } },
//           {
//               text: 'Rate us', onPress: () => {
//                 try{  
//                 Linking.canOpenURL(baseDetails.appUrl).then(supproted => {
//                       if (supproted) {
//                           return Linking.openURL(baseDetails.appUrl);
//                       } else {
//                           ToastAndroid.show('Something went wrong...', ToastAndroid.SHORT);
//                       }
//                     })
//                     } catch(err){
//                       console.log(err);
//                     }
//               }
//           },
//       ],
//       { cancelable: true }
//   )
//   return true;
// }
}
