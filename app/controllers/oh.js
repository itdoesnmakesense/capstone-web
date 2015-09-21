app.controller("ohCtrl", 
  ["$scope",
  function($scope) {

  $scope.numLimit = 10;
  $scope.predicate = 'rating';
  $scope.reverse = true;
  $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
      };


 $scope.local = function(){
    
      if("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var location = [position.coords.latitude, position.coords.longitude];
          //console.log(location);
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          
          //Creating a new object for using latitude and longitude values with Google map.
          var latLng = new google.maps.LatLng(latitude, longitude);

          $scope.showMap(latLng);
          $scope.createMarker(latLng);
          $scope.addNearByPlaces(latLng);
          });
        }
      };

$scope.showMap = function(latLng) {
            //Setting up the map options like zoom level, map type.
            var mapOptions = {
              center: latLng,
              zoom: 18,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            //Creating the Map instance and assigning the HTML div element to render it in.
            $scope.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
            //console.log("show");
          };
          
$scope.addNearByPlaces = function(latLng) {
          $scope.nearByService = new google.maps.places.PlacesService($scope.map);

          var request = {
            location: latLng,
            radius: 1000,
            types: ['food', 'bakery', 'cafe', 'meal_delivery','restaurant', 'meal_takeaway']
          };

          $scope.nearByService.nearbySearch(request, $scope.handleNearBySearchResults);
        };

$scope.handleNearBySearchResults = function(results, status) {
      //console.log(results[0]);
          if (status == google.maps.places.PlacesServiceStatus.OK) {
              var places = results;
               $scope.places = places;
           console.log("place",$scope.places);

             for (var result in results) {
              //console.log('var result', results[result].geometry.location);
              $scope.createMarker(results[result].geometry.location, places);
            }
          }
        };


$scope.createMarker = function(latLng) {
            //Setting up the marker object to mark the location on the map canvas.
            var markerOptions = {
                                  position: latLng,
                                  map: $scope.map,
                                  animation: google.maps.Animation.DROP,
                                  clickable: true
                                };

            var marker = new google.maps.Marker(markerOptions);

            var content = "You are here: " +latLng.lat() + ", " + latLng.lng();
            $scope.addInfoWindow(marker, latLng, content);
        //console.log("create");
          };

$scope.addInfoWindow = function(marker, latLng, content) {
            var infoWindowOptions = {
              content: content,
              position: latLng
            };

            var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

            google.maps.event.addListener(marker, "click", function() {
              infoWindow.open($scope.map);
            });
          };
 
  } ]);