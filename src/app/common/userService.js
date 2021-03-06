;(function(){
  angular.module('triflix')
  .service('UserService', UserService);

  UserService.$inject = ['$http', 'ApiPath'];

  function UserService($http, ApiPath){

    var user;

    this.getUser = function(){
      return user;
    }

    this.extUser = function(id){
      return $http({
        method: 'GET',
        url: ApiPath.getUser.remote,
        params: id
      })
    }

    this.getFBfriendsWithApp = function(params){
      return $http({
        method: 'GET',
        url: ApiPath.getFBfriendsWithApp.remote,
        params: params
      })
    }
    this.invite = function(params){
      return $http({
        method: 'GET',
        url: ApiPath.inviteFriends.remote,
        params: params
      })
    }
    this.user = function(id){
      return $http({
        method: 'GET',
        url: ApiPath.getUser.remote
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
