app.controller("ohCtrl", 
  ["$scope",
  "$http",
  function($scope, $http) {



  $scope.numLimit = 20;
  $scope.predicate = 'rating';
  $scope.reverse = true;
  $scope.allPlaceIds = [];
  $scope.allDetails = [];
  $scope.showDetails= true;


  $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
      };


$scope.moreInfo = function(){
  var rand = $scope.allDetails[Math.floor(Math.random() * $scope.allDetails.length)];
 console.log("Did this work?", rand);
 console.log("click");
}; // end moreInfo


$scope.remove = function(item){
    var byeGurlBye = $scope.allDetails.splice(-1, 1);
    console.log("remove", byeGurlBye);
    console.log($scope.allDetails);

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
            //console.log("place",$scope.places);
            //console.log("place id",$scope.places[0].place_id);

            for (var result in results) {
              var placesID = results[result].place_id;
              var name = results[result].name;
             //console.log(name);
              //console.log('var result', results[result].geometry.location);
              $scope.createMarker(results[result].geometry.location, places,name);
              $scope.allPlaceIds.push(placesID);
               $scope.getMoreInfo();
            }
              //console.log($scope.allPlaceIds);
          }
        };


          $scope.createMarker = function(latLng,places,name) {
              //Setting up the marker object to mark the location on the map canvas.
              var markerOptions = {
                                    position: latLng,
                                    map: $scope.map,
                                    animation: google.maps.Animation.DROP,
                                    clickable: true,
                                    // placeID: placesID
                                  };
           //console.log(places);
              var marker = new google.maps.Marker(markerOptions);
              var content = name;

              $scope.addInfoWindow(marker, latLng, content);
          };


          $scope.getMoreInfo = function(){
           // console.log('clikc');
            var detailsURL;

            for (var x = 0; x < $scope.allPlaceIds.length; x++) {
              detailsURL = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='+$scope.allPlaceIds[x]+'&key=AIzaSyDVQX4JVqkEhaWNbkof9bOAABRYyAJ_8r8';
            }
                    //console.log(detailsURL);

           $http.get(detailsURL)
              .success(function(data, status, headers, config) {
                
                  $scope.allDetails.push(data.result);
                
                  //console.log($scope.allDetails);

              }).
              error(function(data, status, headers, config) {
                // log error
              });
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