// import React, {Component} from 'react';
// import {
//     StyleSheet,
//     Dimensions,
//     Text,
//     NetInfo,
//     Image,
//     View,
// } from 'react-native';
// import { resolve, reject } from 'rsvp';
// const { width } = Dimensions.get('window');

// export default class InternetCheck extends Component {
    
//     constructor(props){
//         super(props);
//         this.state = {
//             isConnected: true
//         }
//     }
    
//     componentWillMount() {
//         NetInfo.addEventListener('connectionChange', this.handleConnectionChange);
//     }
    
//     componentWillUnmount() {
//         NetInfo.removeEventListener('connectionChange', this.handleConnectionChange);
//     }
    
//     handleConnectionChange = (connectionChanges) => {
//             if(connectionChanges.type == 'none'){
//                 this.setState({isConnected: false})
//             } else {
//                 this.setState({isConnected: true})
//             }
//     }

//     render(){
//         if (!this.state.isConnected) {
//             return(
//                 <View style={styles.offlineContainer}>
//                     <Text style={styles.offlineText}>No Internet Connection</Text>
//                 </View>
//             )
//         }
//         return null;
//     }
// }

// const styles = StyleSheet.create({
//     offlineContainer: {
//       backgroundColor: '#b52424',
//       height: 30,
//       justifyContent: 'center',
//       alignItems: 'center',
//       width,
//     },
//     offlineText: { 
//       color: '#fff'
//     }
//   });