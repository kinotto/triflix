;(function(){
  angular.module('triflix')
  .service('ScoreService', ScoreService);

  ScoreService.$inject = ['ApiPath', '$http'];

  function ScoreService(ApiPath, $http){
    var api = ApiPath.score.local;
    this.save = function(body){
      return $http({
        url: api,
        method: 'POST',
        data: body
      })
    }

    this.get = function(userId){
      return $http({
        url: api,
        method: 'GET',
        params: {
          id: userId
        }
      })
    }

  }
})();
