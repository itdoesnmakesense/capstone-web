app.controller("ohCtrl", 
  ["$scope",
  "$http",
  "$window",
  function($scope, $http, $window) {



console.log( "App Loaded!", $scope );
  $scope.numLimit = 20;
  $scope.predicate = 'rating';
  $scope.reverse = true;
  $scope.allPlaceIds = [];
  $scope.allDetails = [];
  $scope.showDetails= true;
  $scope.mouse = [];
  $scope.allRatings = [];
  var latLng; 
  var marker = [];
  $scope.markers= [];



  $scope.markerOnMap = function(detail){
      console.log('click', marker);
    var index = $scope.allDetails.indexOf(detail);
     console.log(index);
    var clickedPlace = $scope.allDetails[index];
    var clickedName = $scope.allDetails[index].name;
    var clickedRating = $scope.allDetails[index].rating;
      console.log(clickedPlace);
       console.log(clickedName);
       console.log(Math.round(clickedRating));
  };

  $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
      };



$scope.shuffle = function(){
  var details = $scope.allDetails;
  var rand = details[Math.floor(Math.random() * details.length)];
 //console.log("winner", rand);
for (var i = 0; i < details.length; i++) {
    if (details[i] != rand) {
     var bye = details.splice(i--, 1);
     console.log("not equal", bye);
    } else {
      console.log("equal",details[i]);
    }
      var myEl = angular.element( document.querySelector( '#repeat' ) );
        myEl.removeClass("col-lg-4 col-md-4 col-sm-4");
        myEl.addClass("flip-in bubble col-lg-12 col-md-12 col-sm-12"); 
}

}; // end moreInfo


$scope.remove = function(detail){
  //console.log(detail);
  var index = $scope.allDetails.indexOf(detail);
    var byeGurlBye = $scope.allDetails.splice(index, 1);
    //console.log("remove", byeGurlBye);
   //console.log(index);

};

 //$scope.local = function(){
   
      if("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var location = [position.coords.latitude, position.coords.longitude];
          //console.log(location);
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          
          //Creating a new object for using latitude and longitude values with Google map.
          latLng = new google.maps.LatLng(latitude, longitude);

            $scope.showMap(latLng);
            $scope.createMarker(latLng);
            $scope.addNearByPlaces(latLng);


          });
        }
     // };

        $scope.showMap = function(latLng) {
            //Setting up the map options like zoom level, map type.
            var mapOptions = {
              center: latLng,
              zoom: 14,
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

               marker = new google.maps.Marker(markerOptions);

              var content = "<div class='infoWindowContent'><h3>"+name+ "</h3></div>";
              //console.log(marker);
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