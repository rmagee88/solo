angular.module('criminy.CrimeController', [])


.controller('CrimeController', function($scope, Crime, Location) {
  // geo location data
  $scope.lat;
  $scope.long;
  // address fields
  $scope.addr1;
  $scope.addr2;
  $scope.showAddr = false; // variable indicating if we shoudl show the address inputs
  $scope.locationPolling = false; // variable indicating if we're grabbing your location
  $scope.mapRefresh = false; // force google map to refresh
  $scope.showSpinner = false; // show spinner while requesting crime data

  // generic map settings
  $scope.map = { 
    center: { 
      latitude: $scope.lat, 
      longitude: $scope.long 
    }, 
    zoom: 14,
  };

  // // generic marker settings
  // $scope.marker = {
  //   options: {
  //     labelContent: ' ',
  //     labelAnchor: "22 0",
  //     labelClass: "marker-labels"
  //   }
  // };

  // images (your location & loading spinner)
  $scope.spinner = 'http://www.dhp11.com/foswiki/pub/Internal/2012-06-12/spinner.gif';
  $scope.mainMarkerImage = 'http://www.adiumxtras.com/images/thumbs/stickman_dock_icons_3215_thumb.png';

  // using moment to get date values (halloween as default)
  var today = moment('2014-11-01');
  var sixMonthsAgo = moment(today).subtract(1, 'days');
  $scope.startDate = sixMonthsAgo.toDate();//sixMonthsAgo.format('MM-DD-YYYY');
  $scope.endDate = today.toDate();//today.format('MM-DD-YYYY');

  // returned data from call to API (list of objects)
  $scope.crimes = [];

  // events for the markers (to show their info on mouseover)
  $scope.map.markersEvents = {
      mouseover: function (marker, eventName, model, args) {
        model.options.labelContent = "Description: " + model.description + "Time of Incident: " + model.datetime;
        model.showWindow = true;
        // alert(model.options.labelContent);  
        $scope.$apply();
      },
      mouseout: function (marker, eventName, model, args) {
         model.options.labelContent = " ";
         model.showWindow = false;
         $scope.$apply();
      }
  };

  // called in the controller to get location of user
  $scope.useLocation = function() {
    $scope.showAddr = false;
  };

  $scope.useAddress = function() {
    $scope.showAddr = true;
  };

  //function to call requestData
  $scope.getCrimeData = function() {
    $scope.mapRefresh = false;
    $scope.showSpinner = true;
    if ($scope.showAddr) {
      // take address params and figure out lat/long
      console.log('addr1: ', $scope.addr1);
      console.log('addr2: ', $scope.addr2);
      Location.resolveAddress($scope.addr1, $scope.addr2).then(function(res) {
        // set the appropriate attributes based on the response.
        $scope.lat = res.data.Latitude;
        $scope.long = res.data.Longitude;
        $scope.map.center.latitude = $scope.lat;
        $scope.map.center.longitude = $scope.long;
        
        console.log('address lat: ', $scope.lat);
        console.log('address long: ', $scope.long);
        Crime.requestData($scope.lat, $scope.long, moment($scope.startDate), moment($scope.endDate))
          .then(function(res) {
            // loop through objects and change lat & long to latitude & longitude
            if (res.data.length) {
              res.data.forEach(function(incident) {
                incident.latitude = incident.lat;
                incident.longitude = incident.long;
                incident.options = {
                  labelContent: ' ',
                  labelAnchor: "22 0",
                  labelClass: "marker-labels"
                };
              });
              console.log($scope.map);
              $scope.showSpinner = false;
              $scope.crimes = res.data;
              $scope.mapRefresh = true;
              
            } else {
              $scope.showSpinner = false;
              window.alert('No results for those dates...');
              // do something if there aren't any results...
            }

          });
      });
    } else {
      // use lat & long vals
      $scope.map.center.latitude = $scope.lat;
      $scope.map.center.longitude = $scope.long;
      Crime.requestData($scope.lat, $scope.long, moment($scope.startDate), moment($scope.endDate))
      .then(function(res) {
        // loop through objects and change lat & long to latitude & longitude
        if (res.data.length) {
          res.data.forEach(function(incident) {
            incident.latitude = incident.lat;
            incident.longitude = incident.long;
            incident.options = incident.options = {
              labelContent: ' ',
              labelAnchor: "22 0",
              labelClass: "marker-labels"
            };
          });
          console.log($scope.map);
          $scope.showSpinner = false;
          $scope.crimes = res.data;
          $scope.mapRefresh = true;

          
        } else {
          $scope.showSpinner = false;
          window.alert('No results for those dates...');
          // do something if there aren't any results...
        }

      });
    }
    
  };

  $scope.locationPolling = true; // indicating we're grabbing the location from browser
  // getting location as soon as people show up
  Crime.getLocation().then(function(location) {
      console.log('assigning coordinates to vars');
      $scope.lat = location.latitude;
      $scope.long = location.longitude;
      $scope.locationPolling = false;
    });

});