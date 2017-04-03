;(function(){
  angular.module('triflix')
  .service('UserService', UserService);

  UserService.$inject = ['$http', 'ApiPath'];

  function UserService($http, ApiPath){

    var user;

    this.getUser = function(){
      return user;
    }


    this.user = function(){
      return $http({
        method: 'GET',
        url: ApiPath.getUser.remote,
      }).then(function(resp){
        user = resp.data || {};
        return user;
      });
    };
  }
})();
