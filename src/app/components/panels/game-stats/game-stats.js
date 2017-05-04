;(function(){
  angular.module('triflix')
  .component('gameStats', {
    bindings: {
      score: '<'
    },
    templateUrl: 'app/components/panels/game-stats/game-stats.html',
    controller: gameStatsCtrl
  });

  gameStatsCtrl.$inject = ['$scope'];


  function gameStatsCtrl($scope){
    var self = this;

    this.params = {
      back: {
        text: 'Back',
        cb: function(){
          $scope.$parent.$close();
        }
      }
    };

  }

})();
