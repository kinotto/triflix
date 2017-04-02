;(function(){
  angular.module('triflix')
  .service('UserService', UserService);

  UserService.$inject = ['$http', 'ApiPath'];

  function UserService($http, ApiPath){
    this.login = function(){
      return $http({
        method: 'GET',
        url: ApiPath.login.local
      });
    }

    this.getUser = function(){
      return $http({
        method: 'GET',
        url: ApiPath.getUser.local,
      });
    }
  }
})();
