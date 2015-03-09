angular.module('criminy', [
    'criminy.services',
    'criminy.CrimeController',
    'ngRoute'
]);

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

