 app.controller("LoginCtrl", 
  ["$scope",
  "uidHandler",
  "$location",
  function($scope, uidHandler, $location) {

  // Open the login modal
  // $scope.login = function() {
  //   $scope.modal.show();
  // };



  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {

    var ref = new Firebase("https://capstone88.firebaseio.com");

    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        console.log("uid", authData.uid);
        uidHandler.setUid(authData.uid);
        window.location.href="#/main";

        }
    });
  };






  } ]);


