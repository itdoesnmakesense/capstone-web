var app = angular.module("PickApp", ['ngRoute','angular.filter','ui.bootstrap','firebase','ngFitText','ngAnimate']);

// This first part tells the app that auth is required, 
//if the user isn't logged in it redirects to the login page
app.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the login page
    if (error === "AUTH_REQUIRED") {
      $location.path("/login");
    }
  });
}]);




app.config(['$routeProvider',
  function($routeProvider, $hammerDefaultOptsProvider){
    $routeProvider
     .when('/login',{
        templateUrl : "partials/login.html",
        controller : "LoginCtrl"
      })
      .when('/oh',{
        templateUrl : "partials/oh.html",
        controller : "ohCtrl"
      })
       .when('/howBout',{
        templateUrl : "partials/howBout.html",
        controller : "howBoutCtrl"
      })
        .when('/main',{
        templateUrl : "partials/main.html",
        controller : "mainCtrl"
      })
      .otherwise({
        redirectTo: '/login'
      });
    //   $hammerDefaultOptsProvider.set({
    //     recognizers: [[Hammer.Tap, {time: 250}],
    //                   [Hammer.Pan,{enable: true}]]
    // });
  }
  ]);