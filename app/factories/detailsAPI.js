app.factory("detailsAPI", function($http,$rootScope) {


// Variables
//---------------------------------

	// Service to return
	var gMapService ={};

	// Array of locations obtained from API calls
	var locations = [];

	// Selected location (initialize to center of USA)
	var selectedLat = 39.50;
	var selectedLong = -98.35;

	// Handling clicks and location selection
	gMapService.clickLat = 0;
	gMapService.cleickLong = 0;

	// google map variables
	var map;
	var infowindow;
	var marker;

	//initFoodMap variables
	var userLatLng;
	var allPlacesID = [];
	var allDetailsList = [];
	var markers = [];

	var placeList = [];

  	// Functions
	// -----------------------------------------------
	// Refresh the Map with new data. Takes three parameters (lat, long, and filtering results)
	detailsAPI = function(latitude, longitude, filteredResults){

        // Clears the holding array of locations
        locations = [];

        // Set the selected lat and long equal to the ones provided on the refresh() call
        selectedLat = parseFloat(latitude);
        selectedLong = parseFloat(longitude);

        // console.log("selectedLat:" , selectedLat);
        // console.log("selectedLong:" , selectedLong);

         initMap(latitude, longitude, false);
         initPlacesMap(latitude, longitude, false);


    }; // end details.refresh()

    var initMap = function(latitude,longitude){
    	 console.log("initMapLat:" , latitude);
         console.log("initiMapLong:" , longitude);
    };

    var initPlacesMap = function(latitude,longitude){
    	console.log("initPlacesMapLat:" , latitude);
         console.log("initiPlacesMapLong:" , longitude);
    };

    });