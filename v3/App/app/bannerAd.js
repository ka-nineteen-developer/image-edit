// import React, { Component } from 'react';
// import {
//     View,
// } from 'react-native';
// import {
//     AdMobBanner,
//     PublisherBanner
// } from 'react-native-admob';

// export default class Banner extends Component {
//     render() {
//         if (this.props.data.Status == "Success") {
//             if (this.props.data.admob.banner.showAd) {
//                 return (
//                     <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
//                         <AdMobBanner
//                             adSize={this.props.data.admob.banner.adSize}
//                             adUnitID={this.props.data.admob.banner.banner_id}
//                         />
//                     </View>
//                 )
//             } else {
//                 return null;
//             }
//         } else {
//             return null;
//         }
//     }
// }