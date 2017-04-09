;(function(){
  angular.module('triflix')
    .factory('httpInterceptor', httpInterceptor);

    httpInterceptor.$inject = ['$location'];

    function httpInterceptor($location){
      return {
        request: function(config){
          var auth = window.localStorage.getItem('x-auth');
          if(auth)
            config.headers['x-auth'] = auth;
          return config;
        },
        response: function(response){
          var auth = response.headers('x-auth');
          if(auth)
            window.localStorage.setItem('x-auth', auth);
          return response;
        },
        responseError: function(response){
          return response;
        }
      }
    }

})();
