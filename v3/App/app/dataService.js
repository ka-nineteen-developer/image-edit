// import { baseDetails } from './baseDetails';

// const quotesApi = 'https://talaikis.com/api/quotes/';

// export const quotesList = () => {
//     return new Promise((resolve, reject) => {
//         fetch(quotesApi, {})
//         .then((response) => response.json())
//         .then((responseJson) => {
//             if(responseJson !== null){
//                 resolve(responseJson);
//             } else {
//                 data = {
//                     Status: 'Error'
//                 }
//                 resolve(data)
//             }
//         }).catch(err => {
//             data = {
//                 Status: 'Error'
//             }
//             resolve(data);
//         })
//     })
// }

// export const appUpdate = () => {
//     return new Promise((resolve, reject) => {
//         fetch(baseDetails.baseUrl + 'update.json', {})
//         .then((response) => response.json())
//         .then((responseJson) => {
//             if(responseJson !== null){
//                 resolve(responseJson);
//             } else {
//                 data = {
//                     Status: 'Error'
//                 }
//                 resolve(data)
//             }
//         }).catch(err => {
//             data = {
//                 Status: 'Error'
//             }
//             resolve(data);
//         })
//     })
// }

// export const about = () => {
//     return new Promise((resolve, reject) => {
//         fetch(baseDetails.baseUrl + 'about.json', {})
//         .then((response) => response.json())
//         .then((responseJson) => {
//             if(responseJson !== null){
//                 resolve(responseJson);
//             } else {
//                 data = {
//                     Status: 'Error'
//                 }
//                 resolve(data)
//             }
//         }).catch(err => {
//             data = {
//                 Status: 'Error'
//             }
//             resolve(data);
//         })
//     })
// }