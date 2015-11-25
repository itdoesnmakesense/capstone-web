  app.factory("uidHandler", function() {
// This facory is used to set and store the user id so that it can be easily
  // accessed when saving and retreiving data
    
    var uid = null;
    return {
      getUid: function() {
        return uid;
      },
      setUid: function(sentID) {
        uid = sentID;
        console.log("factory uid", uid);
      }
    };
  });