angular.module('criminy.services', [])

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
      'lat': 37.791448,//lat,
      'long': -122.422189//long
    };

    var headersObj = {
      'X-Mashape-Key': 'YtoZWVOpjVmsh40iJ2tKGREGQ2cXp1xyN7Ijsnm1IYPc4YiZMh',
      'Accept': 'application/json'
    };


    console.log('factory making call to API...');
    return $http({method:'GET', url:baseUrl, params:paramsObj, headers:headersObj}).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log('It worked!', data);
        return data;
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('It didnt work! Status: ', status)
        return data;
      });
  };

  var dateFmt = function(dateObj) {
    var dateArray = [];
    dateArray.push(dateObj.getMonth() + 1);
    dateArray.push(dateObj.getDate());
    dateArray.push(dateObj.getFullYear());

    return dateArray.join('/');
  };

  return {
    requestData: requestData,
    dateFmt: dateFmt
  };
});