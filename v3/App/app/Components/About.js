// import React, { Component } from 'react';
// import {
//     Text,
//     View,
//     TouchableOpacity,
//     Image,
//     RefreshControl,
//     Dimensions,
//     ImageBackground,
//     ToastAndroid,
//     ScrollView
// } from 'react-native';
// import {
//     Container,
//     Left,
//     Thumbnail,
//     Header,
//     Button,
//     Title,
//     Body,
//     Icon,
//     Right,
//     List,
// } from 'native-base';
// // import { about } from '../dataService';
// import { baseDetails } from '../baseDetails';
// import InternetCheck from '../InternetCheck';

// const screenWidth = Dimensions.get('window').width;

// // Google analytics
// import {
//   GoogleAnalyticsTracker,
//   GoogleTagManager,
//   GoogleAnalyticsSettings
// } from "react-native-google-analytics-bridge";


// export default class About extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//         }
//     }

//     render() {
//         return (
//                 <View
//                     style={{
//                         flex: 1,
//                     }}>
//                     <InternetCheck />
//                     <Header style={{ backgroundColor: '#24292e00' }}>
//                         <Left>
//                             <Button transparent onPress={() => this.props.navigation.openDrawer()}>
//                                 <Icon name='md-menu' style={{ color: "#ffffff" }} />
//                             </Button>
//                         </Left>
//                         <Body>
//                             <Title style={{
//                                 color: "#ffffff",
//                                 fontFamily: 'LemonJellyPersonalUse',
//                                 fontSize: 35,
//                                 lineHeight: 30
//                             }}>
//                                 About
//                         </Title>
//                         </Body>
//                         <Right />
//                     </Header>
//                 </View>
//         );
//     }

//     componentDidMount() {
//         // this.getAboutus();
//     }

//     onRefresh() {
//         // this.getAboutus();
//     }

//     getAboutus() {
//         this.setState({ pageLoading: true });
//         about()
//             .then(res => {
//                 this.setState({ pageLoading: false });
//                 this.setState({ data: res });
//             })
//     }
// }