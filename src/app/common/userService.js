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
        if(!resp.data.error)
          user = resp.data;
        return resp;
      }, function(err){
        return err;
      });
    };
  }
})();
