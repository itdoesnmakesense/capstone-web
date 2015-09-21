 app.factory("geoLocate", function() {


return {

  // retrieveGeo: function(name,callback){
  //     if("geolocation" in navigator) {
  //       navigator.geolocation.getCurrentPosition(function(position) {
  //         var location = [position.coords.latitude, position.coords.longitude];
  //         console.log(location);
  //         var latitude = position.coords.latitude;
  //         var longitude = position.coords.longitude;
          
  //         //Creating a new object for using latitude and longitude values with Google map.
  //         var latLng = new google.maps.LatLng(latitude, longitude);

  //         showMap(latLng);
  //         createMarker(latLng);


  //         //Setting the latitude and longitude values in the div.
  //         var div = document.getElementById("location");
  //         div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;

  //         function showMap(latLng) {
  //           //Setting up the map options like zoom level, map type.
  //           var mapOptions = {
  //             center: latLng,
  //             zoom: 18,
  //             mapTypeId: google.maps.MapTypeId.ROADMAP
  //           };

  //           //Creating the Map instance and assigning the HTML div element to render it in.
  //           map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  //         }
  //         function createMarker(latLng) {
  //           //Setting up the marker object to mark the location on the map canvas.
  //           var markerOptions = {
  //             position: latLng,
  //             map: map,
  //             animation: google.maps.Animation.DROP,
  //             clickable: true
  //           };
  //           var marker = new google.maps.Marker(markerOptions);

  //           var content = "You are here: " + latLng.lat() + ", " + latLng.lng();
  //           addInfoWindow(marker, latLng, content);

  //         }

  //         function addInfoWindow(marker, latLng, content) {
  //           var infoWindowOptions = {
  //             content: content,
  //             position: latLng
  //           };

  //           var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

  //           google.maps.event.addListener(marker, "click", function() {
  //             infoWindow.open(map);
  //           });
  //         }
         
  //       });
       
  //     } //if geolocation
  //   } // retrieveGeo
 


  }; // return

}); //factory