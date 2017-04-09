;(function(){
  angular.module('triflix')
    .factory('httpInterceptor', httpInterceptor);

    httpInterceptor.$inject = ['$location'];
    var authHeader = 'x-auth';
    function httpInterceptor($location){
      return {
        request: function(config){
          var auth = window.localStorage.getItem(authHeader);
          if(auth)
            config.headers[authHeader] = auth;
          return config;
        },
        response: function(response){
          var auth = response.headers()[authHeader];
          if(auth)
            window.localStorage.setItem(authHeader, auth);
          return response;
        },
        responseError: function(response){
          return response;
        }
      }
    }

})();
