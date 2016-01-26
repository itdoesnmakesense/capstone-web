app.controller("ohCtrl", 
  ["$scope",
  "$http",
  "$window",
  function($scope, $rootScope, $http, $window, detailsAPI) {




  $scope.numLimit = 20;
  $scope.predicate = 'rating';
  $scope.reverse = true;
  $scope.allPlaceIds = [];
  $scope.allDetails = [];
  $scope.showDetails= true;
  $scope.mouse = [];
  $scope.allRatings = [];
  var latLng; 
  // var marker = [];
  $scope.markers= [];
  var map;
  var infowindow;
  var marker;
  $scope.placeData= [];


 // Set initial coordinates to the center of the US
    $scope.latitude = 39.500;
    $scope.longitude = -98.350;



  navigator.geolocation.getCurrentPosition(function(position) {
    var location = [position.coords.latitude, position.coords.longitude];
    //console.log(location);
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

  // Display coordinates in location textboxes rounded to three decimal points
  $scope.longitude = parseFloat(long).toFixed(3);
  $scope.latitude = parseFloat(lat).toFixed(3);

          var map = new google.maps.Map(document.getElementById('map-canvas'), {
              center: {lat: parseFloat($scope.latitude), lng: parseFloat($scope.longitude)},
              zoom: 15
          });
   initMap($scope.latitude, $scope.longitude, map);
   initPlacesMap($scope.latitude, $scope.longitude, map);


    }); // end navigator.geolocation()

    var initMap = function(latitude,longitude,map){
      // Uses the selected lat, long as starting point
      var userLatLng = new google.maps.LatLng(latitude, longitude);
          // content in InfoWindow
      var contentString ='<h3> You are here! </h3>';
      //user InfoWindow
      var infowindow = new google.maps.InfoWindow({
          content: contentString
      });
      //set user location marker
      var marker = new google.maps.Marker({
          position: userLatLng,
          animation: google.maps.Animation.DROP,
          map: map,
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      });
        var lastMarker = marker;
        //marker click listener
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
        // Function for moving to a selected location
        map.panTo(new google.maps.LatLng(latitude, longitude));
        // Clicking on the Map moves the bouncing red marker
          google.maps.event.addListener(map, 'click', function(e){
              var marker = new google.maps.Marker({
                  position: e.latLng,
                  animation: google.maps.Animation.Drop,
                  map: map,
                  icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' 
              });
                // When a new spot is selected, delete the old red bouncing marker
                if(lastMarker){
                    lastMarker.setMap(null);
                }
                // Create a new red bouncing marker and move to it
                lastMarker = marker;
                map.panTo(marker.position);

                newMarkerLat = map.center.lat();
                newMarkerLong = map.center.lng();
                console.log("newMarkerLat", newMarkerLat);
                console.log("newMarkerLong", newMarkerLong);
          }); // end map move red marker function
    };

    var initPlacesMap = function(latitude,longitude, map){
        var userLL = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
        // use google places api
        var service = new google.maps.places.PlacesService(map);
        // search for nearby places
            service.nearbySearch({
              location: userLL,
              radius: 1000,
              types: ['food', 'bakery', 'cafe', 'meal_delivery','restaurant', 'meal_takeaway']
              }, callback);

                function callback(results, status) {
                  if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        var placeID = results[i].place_id;
                            
                          //send to functions
                          // createMarker(results[i]);
                          getPlacesDetailInfo(placeID);
                    } //end for(){}
                  } //end if(status) 
                } //end callback

        function getPlacesDetailInfo(placeID, place){
              var service = new google.maps.places.PlacesService(map);
              var request = { placeId: placeID};
              var placeData = {};
              $scope.allDetails = [];
              // console.log("placeID", placeID);
              // console.log("place", place);
                service.getDetails(request, function(details, status) {

                      var formatted = details.formatted_phone_number;
                      var unformatted = formatted.replace(/[- )(]/g,'');

                      var address = details.formatted_address;
                      var formatted_address = address.replace(", United States",'');

                      var lat = details.geometry.location.lat();
                      var lng = details.geometry.location.lng();

                      var parseLat = parseFloat(lat).toFixed(3);
                      var parseLng = parseFloat(lng).toFixed(3);
                      var placeDetailLatLng = new google.maps.LatLng(parseLat, parseLng);

                      createMarker(details,placeDetailLatLng);
                    
                  var placeData = {
                      name: details.name,
                      address: formatted_address,
                      phone_number: formatted,
                      rating: details.rating,
                      location: details.geometry.location,
                      type: details.types[1],
                      review: details.reviews[1].text,
                      website: details.website,
                      open: details.opening_hours.open_now   
                  };

                      $scope.$apply(function(){
                          $scope.allDetails.push(placeData);
                          console.log("placeData:",$scope.allDetails);
                      });         
                }); // end service.getDetails() 
                console.log("allDetails:",$scope.allDetails); 
        } //end getPlacesDetailInfo() 

               function createMarker(details, placeDetailLatLng) {
                  console.log("marker details", details);

                 var marker = new google.maps.Marker({
                        map: map,
                        position: placeDetailLatLng,
                        animation: google.maps.Animation.DROP,
                        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                      });
                      marker.setMap(map);
                      // console.log("marker.setmap",marker.setMap(map));
                      var contentString = 
                         '<div><h5>' + details.name +'</h5></div>'+
                         '<div><h6>' + details.formatted_address +'</h6></div>';
                      //user InfoWindow
                      var infowindow = new google.maps.InfoWindow({
                        content: contentString
                       });
                      google.maps.event.addListener(marker, 'click', 
                        function() {
                              infowindow.open(map, this);
                            });
               } // end createMarker()
    }; // end initPlacesMap()




//   $scope.markerOnMap = function(detail){
//       console.log('click', marker);
//     var index = $scope.allDetails.indexOf(detail);
//      console.log(index);
//     var clickedPlace = $scope.allDetails[index];
//     var clickedName = $scope.allDetails[index].name;
//     var clickedRating = $scope.allDetails[index].rating;
//       console.log(clickedPlace);
//        console.log(clickedName);
//        console.log(Math.round(clickedRating));
//   };

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


//         $scope.showMap = function(latLng) {
//             //Setting up the map options like zoom level, map type.
//             var mapOptions = {
//               center: latLng,
//               zoom: 14,
//               mapTypeId: google.maps.MapTypeId.ROADMAP
//             };

//             //Creating the Map instance and assigning the HTML div element to render it in.
//             $scope.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
//             //console.log("show");
//         };


          
//         $scope.addNearByPlaces = function(latLng) {
//           $scope.nearByService = new google.maps.places.PlacesService($scope.map);

//             var request = {
//               location: latLng,
//               radius: 1000,
//               types: ['food', 'bakery', 'cafe', 'meal_delivery','restaurant', 'meal_takeaway']
//             };
//             $scope.nearByService.nearbySearch(request, $scope.handleNearBySearchResults);
//         };


//         $scope.handleNearBySearchResults = function(results, status) {
//           //console.log(results[0]);
//           if (status == google.maps.places.PlacesServiceStatus.OK) {
//             var places = results;
//             $scope.places = places;
//             //console.log("place",$scope.places);
//             //console.log("place id",$scope.places[0].place_id);

//             for (var result in results) {
//               var placesID = results[result].place_id;
//               var name = results[result].name;
//              //console.log(name);
//               //console.log('var result', results[result].geometry.location);
//               $scope.createMarker(results[result].geometry.location, places,name);
//               $scope.allPlaceIds.push(placesID);
//                $scope.getMoreInfo();
//             }
//               //console.log($scope.allPlaceIds);
//           }
//         };


//           $scope.createMarker = function(latLng,places,name) {
//               //Setting up the marker object to mark the location on the map canvas.
//               var markerOptions = {
//                                     position: latLng,
//                                     map: $scope.map,
//                                     animation: google.maps.Animation.DROP,
//                                     clickable: true,
//                                     // placeID: placesID
//                                   };
//            //console.log(places);

//                marker = new google.maps.Marker(markerOptions);

//               var content = "<div class='infoWindowContent'><h3>"+name+ "</h3></div>";
//               //console.log(marker);
//               $scope.addInfoWindow(marker, latLng, content);
//           };


//           $scope.getMoreInfo = function(){
//            // console.log('clikc');
//             var detailsURL;

//             for (var x = 0; x < $scope.allPlaceIds.length; x++) {
//               detailsURL = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='+$scope.allPlaceIds[x]+'&key=AIzaSyDVQX4JVqkEhaWNbkof9bOAABRYyAJ_8r8';
//             }
//                     //console.log(detailsURL);

//            $http.get(detailsURL)
//               .success(function(data, status, headers, config) {
                
//                   $scope.allDetails.push(data.result);
               

//               }).
//               error(function(data, status, headers, config) {
//                 // log error
//               });
     
//           };


//         $scope.addInfoWindow = function(marker, latLng, content) {
//             var infoWindowOptions = {
//               content: content,
//               position: latLng
              
//             };
    
//             var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

//             google.maps.event.addListener(marker, "click", function() {
//               infoWindow.open($scope.map);
            
        
//             });
//         };



  } ]);