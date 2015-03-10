angular.module('criminy.CrimeController', [])


.controller('CrimeController', function($scope, Crime) {
  $scope.lat;
  $scope.long;
  $scope.startDate;
  $scope.endDate;
  $scope.showAddr = false;

  $scope.map = { 
    center: { 
      latitude: $scope.lat, 
      longitude: $scope.long 
    }, 
    zoom: 14,
    refresh: false 
  };


  // users input for address
  $scope.address;

  // returned data from call to API (list of objects)
  $scope.crimes = [];

  // called in the controller to get location of user
  $scope.useLocation = function() {
    $scope.showAddr = false;
  };

  $scope.useAddress = function() {
    $scope.showAddr = true;
  };

  //function to call requestData
  $scope.getCrimeData = function() {
    var startDateStr = Crime.dateFmt($scope.startDate);
    var endDateStr = Crime.dateFmt($scope.endDate);
    $scope.map.center.latitude = $scope.lat;
    $scope.map.center.longitude = $scope.long;

    Crime.requestData($scope.lat, $scope.long, startDateStr, endDateStr)
      .then(function(res) {
        // loop through objects and change lat & long to latitude & longitude
        if (res.data.length) {
          res.data.forEach(function(incident) {
            incident.latitude = incident.lat;
            incident.longitude = incident.long;
          });
          console.log($scope.map);
          $scope.crimes = res.data;
          
        } else {
          window.alert('No results for those dates...');
          // do something if there aren't any results...
        }
      });
  };

  // getting location as soon as people show up
  Crime.getLocation().then(function(location) {
      console.log('assigning coordinates to vars');
      $scope.lat = location.latitude;
      $scope.long = location.longitude;
    });

});