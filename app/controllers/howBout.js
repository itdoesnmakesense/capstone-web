app.controller("howBoutCtrl", 
  ["$scope",
  "$window",
  function($scope, $window) {

    

    // // Bias the autocomplete object to the user's geographical location,
    // // as supplied by the browser's 'navigator.geolocation' object.
    // function geolocate() {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //       var geolocation = {
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude
    //       };
    //       var circle = new google.maps.Circle({
    //         center: geolocation,
    //         radius: position.coords.accuracy
    //       });
    //       autocomplete.setBounds(circle.getBounds());
    //     });
    //   }
    // }


    // var defaultBounds = new google.maps.LatLngBounds(
    //       new google.maps.LatLng(-33.8902, 151.1759),
    //       new google.maps.LatLng(-33.8474, 151.2631));

    // var input = document.getElementById('searchTextField');
    // var options = {
    //               bounds: defaultBounds,
    //               types: ['establishment', 'restuarants']
    //               };

    // autocomplete = new google.maps.places.Autocomplete(input, options);


$scope.initAutocomplete = function() {

  $scope.map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 36.182455, lng: -86.73563000000001},
    zoom: 13,
    //mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  // Create the search box and link it to the UI element.
  $scope.input = document.getElementById('pac-input');
  $scope.searchBox = new google.maps.places.SearchBox($scope.input);
  $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push($scope.input);

  // Bias the SearchBox results towards current map's viewport.
  $scope.map.addListener('bounds_changed', function() {
    $scope.searchBox.setBounds($scope.map.getBounds());
  });

  $scope.markers = [];
  // [START region_getplaces]
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  $scope.searchBox.addListener('places_changed', function() {
    $scope.places = $scope.searchBox.getPlaces();

    if ($scope.places.length === 0) {
      return;
    }

    // Clear out the old markers.
    $scope.markers.forEach(function(marker) {
      marker.setMap(null);
    });
    $scope.markers = [];

    // For each place, get the icon, name and location.
    $scope.bounds = new google.maps.LatLngBounds();
    $scope.places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      $scope.markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));
      //console.log($scope.markers);
      console.log($scope.places[0].name);
      //console.log($scope.bounds);

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        $scope.bounds.union(place.geometry.viewport);
      } else {
        $scope.bounds.extend(place.geometry.location);
      }
    });
    $scope.map.fitBounds($scope.bounds);
  });
  // [END region_getplaces]
};



  } ]);