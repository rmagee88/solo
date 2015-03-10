angular.module('criminy.services', [])

.factory('Location', function($http, $q) {
  // TODO:  converting user's address to location
  var resolveAddress = function(addr1, addr2) {
    var baseUrl = 'https://yurisw-address-correction-and-geocoding.p.mashape.com/address';
    var paramsObj = {
      'AddressLine1': addr1,
      'AddressLine2': addr2
    };
    var headersObj = {
      'X-Mashape-Key': 'YtoZWVOpjVmsh40iJ2tKGREGQ2cXp1xyN7Ijsnm1IYPc4YiZMh',
      'Accept': 'application/json'
    };

    return $http({method:'GET', url:baseUrl, params:paramsObj, headers:headersObj}).
      success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log('Address Resolution Worked!', data);
        return data;
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('Address Resolution didnt work! Status: ', status)
        return data;
      });

  };

  return {
    resolveAddress: resolveAddress
  };
})

.factory('Crime', function($http, $q) {
  // getting crime data from https://www.mashape.com/jgentes/crime-data api
  var requestData = function(lat, long, startDate, endDate) {
    var baseUrl = 'https://jgentes-Crime-Data-v1.p.mashape.com/crime';
    var paramsObj = {
      'enddate': endDate.format('MM-DD-YYYY'),
      'startdate': startDate.format('MM-DD-YYYY'),
      'lat': lat,
      'long': long
    };

    var headersObj = {
      'X-Mashape-Key': 'YtoZWVOpjVmsh40iJ2tKGREGQ2cXp1xyN7Ijsnm1IYPc4YiZMh',
      'Accept': 'application/json'
    };


    console.log('factory making call to API...');
    console.log('lat: ', lat);
    console.log('long: ', long);
    console.log('startDate: ', startDate);
    console.log('endDate: ', endDate)
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

  var getLocation = function() {  
      var deferred = $q.defer();
      navigator.geolocation.getCurrentPosition(
          function(position) { console.log('promise returning with data'); deferred.resolve(position.coords); },
          function(error) { deferred.resolve(null); }
      );
      return deferred.promise;
  };


  return {
    requestData: requestData,
    getLocation: getLocation
  };
});