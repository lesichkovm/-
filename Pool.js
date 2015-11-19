function Pool() {

  var pool = {};
  
  this.add = function (objectId, object) {
    return pool[objectId] = object;
  };
  
  this.find = function (objectId) {
    if (typeof pool[objectId] !== "undefined") {
      return pool[objectId];
    }
    return null;
  };
  
  this.remove = function (objectId) {
    delete pool[objectId];
  };
  
}
