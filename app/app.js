angular.module('criminy', [
    'criminy.services',
    'criminy.CrimeController',
    'ngRoute',
    'uiGmapgoogle-maps'
]);
// .config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
//   GoogleMapApi.configure({
// //    key: 'your api key',
//     v: '3.17',
//     libraries: 'weather,geometry,visualization'
//   });
// }]);

// .config(function(uiGmapGoogleMapApiProvider) {
//     uiGmapGoogleMapApiProvider.configure({
//         key: 'AIzaSyCSGkNggzz_E_VxcTWnFjwQNCWUDImls7M',
//         v: '3.17',
//         libraries: 'weather,geometry,visualization'
//     });
// });

// angular.module('shortly', [
//   'shortly.services',
//   'shortly.links',
//   'shortly.shorten',
//   'shortly.auth',
//   'ngRoute'
// ])
// .config(function($routeProvider, $httpProvider) {
//   $routeProvider
//     .when('/', {
//       templateUrl: '../index.html',
//       controller: 'CrimeController'
//     });
//     // .when('/signup', {
//     //   templateUrl: 'app/auth/signup.html',
//     //   controller: 'AuthController'
//     // })
//     // // Your code here

//     // // We add our $httpInterceptor into the array
//     // // of interceptors. Think of it like middleware for your ajax calls
//     // $httpProvider.interceptors.push('AttachTokens');
// });

