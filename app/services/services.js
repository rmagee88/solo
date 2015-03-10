angular.module('criminy.services', [])

.factory('Location', function() {
  // TODO:  converting user's address to location
})

.factory('Crime', function($http, $q) {
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

  // var insertMap = function() {
  //   var map = angular.element(document.createElement('ui-gmap-google-map'));
  //   var markers = angular.element(document.createElement('ui-gmap-markers'));




  // <!-- <ui-gmap-google-map ng-show="crimes" center="map.center" zoom="map.zoom">
  //   <ui-gmap-markers models="crimes" idKey="id" labelContent="description" coords="'self'">    
  //   </ui-gmap-markers>
  // </ui-gmap-google-map> -->


  // };

  var dateFmt = function(dateObj) {
    var dateArray = [];
    dateArray.push(dateObj.getMonth() + 1);
    dateArray.push(dateObj.getDate());
    dateArray.push(dateObj.getFullYear());

    return dateArray.join('/');
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
    dateFmt: dateFmt,
    getLocation: getLocation
  };
});