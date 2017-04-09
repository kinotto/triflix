;(function(){
  angular.module('triflix')
    .factory('httpInterceptor', httpInterceptor);

    httpInterceptor.$inject = ['$location'];

    function httpInterceptor($location){
      return {
        request: function(config){
          config.headers['referer'] = $location.protocol() + '://' + $location.host();
          return config;
        },
        response: function(response){
          return response;
        },
        responseError: function(response){
          return response;
        }
      }
    }

})();
