angular.module('criminy.services', []);

.factory('Location', function() {
  // TODO:  converting user's address to location
})

.factory('Crime', function($http) {
  // getting crime data from https://www.mashape.com/jgentes/crime-data api

  var requestData = function(lat, long, startDate, endDate) {
    var baseUrl = 'https://jgentes-Crime-Data-v1.p.mashape.com/crime';
    var paramsObj = {
      'enddate': endDate,
      'startdate': startDate,
      'lat': lat,
      'long': long
    };

    var headersObj = {
      'X-Mashape-Key': 'YtoZWVOpjVmsh40iJ2tKGREGQ2cXp1xyN7Ijsnm1IYPc4YiZMh',
      'Accept': 'application/json'
    };


    $http.get(baseUrl, {params:paramsObj}).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
  };

  return {
    requestData: requestData
  };
});