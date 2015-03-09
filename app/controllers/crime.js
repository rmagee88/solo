angular.module('criminy.CrimeController', [])


.controller('CrimeController', function($scope, Crime) {
  $scope.lat;
  $scope.long;
  $scope.startDate;
  $scope.endDate;


  // users input for address
  $scope.address;

  // returned data from call to API
  $scope.crimes;

  //function to call requestData
  $scope.getCrimeData = function() {
    var startDateStr = Crime.dateFmt($scope.startDate);
    var endDateStr = Crime.dateFmt($scope.endDate);

    // console.log('controller making call to factory function...');
    // console.log('startDate: ', startDateStr);
    // console.log('endDate: ', endDateStr);
    Crime.requestData($scope.lat, $scope.long, startDateStr, endDateStr)
      .then(function(res) {
        $scope.crimes = res.data;
      });
    // console.log('crimes var: ', $scope.crimes);
    // do something to the view...
  }

});