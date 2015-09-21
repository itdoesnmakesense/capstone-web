app.factory("yelpAPI", function($http) {

     // function randomString(length, chars) {
     //            var result = '';
     //            for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
     //            return result;
     //        }
// googleAPIKey: AIzaSyDVQX4JVqkEhaWNbkof9bOAABRYyAJ_8r8
                
//     return {
//             retrieveYelp: function(name, callback) {
//                 var method = 'GET';
//                 var yelpURL = 'http://api.yelp.com/v2/search/';
             
//                 var params = {
//                         callback: 'angular.callbacks._0',
//                         location: 'Nashville',
//                         oauth_consumer_key: 'J8E4NqNGVQSeCAacUimUsA', //Consumer Key
//                         oauth_token: '0-dmxllAB6tCb9MrJjDrE8Ke6W3uNI2S', //Token
//                         oauth_signature_method: "HMAC-SHA1",
//                         oauth_timestamp: new Date().getTime(),
//                         oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
//                         term: 'food',
//                         limit: 20,
//                         sort: 1
//                     };
//                 var settings = {
//                   url: yelpURL,
//                   data: params,
//                   cache: true,  //        <----  This is crucial to include as well to prevent jQuery from 
//                                               // adding on a cache-buster parameter "_=23489489749837", 
//                                               // invalidating our oauth-signature
//               };
//                 var consumerSecret = 'rG9Km7zgoyTcitw1M-tDn2H7TFo'; //Consumer Secret
//                 var tokenSecret = 'czF9Mr-S2L4X_kxC17rFcd6PxmA'; //Token Secret
//                 var signature = oauthSignature.generate(method, yelpURL, params, consumerSecret, tokenSecret, { encodeSignature: false});
//                 params.oauth_signature = signature;
//                 $http.jsonp(yelpURL, {params: params}).success(callback);
//             }
// };

  


    });