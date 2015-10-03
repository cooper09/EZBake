//  ------- PRIVATE PROPERTIES ------
/**
Private Module Level Properties
- app: module level reference to the BufferServer oject
- buffer: module level ClaimBuffer object
*/
var app;

/**
Configure Routes
dynamically sets up the routing for the app
loads configuration for endpoints from "endpoints.json"
*/
function configureRoutes(endpoints){
  var endpoints = endpoints["endpoints"];
  for(var i=0; i<endpoints.length; i++){
    var entry = endpoints[i];
    var path = entry["path"];
    var methods = entry["methods"];
    var handler = entry["handler"];
    for (var j=0;j<methods.length; j++) {
      var method = methods[j];
      bindHandler(method, path, handler)
    }

  }
}

/**
Bind Handler
a helper method that binds a handler to a method and path
- method: http method (get, post, put, delete)
- paths: root ur path
- handler: the name of the handler
*/
function bindHandler(method, path, handler){
  if(method === "get") {
    app.get(path, require(process.cwd()+handler));
    console.log("route GET handler\t",path,"=>",handler+"()");
  }else if(method === "post"){
    app.post(path, require(process.cwd()+handler));
    console.log("route POST hander\t",path,"=>",handler+"()");
  }
}

//  ------- PUBLIC MODULE ------- 
module.exports = function(a, endpoints) {
  app = a
  configureRoutes(endpoints);
}