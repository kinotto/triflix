;(function(){
  angular.module('triflix')
  .component('triflixBoard', {
    bindings: {
      index: '@'
    },
    templateUrl: 'app/components/triflix-board/triflix-board.html',
    controller: triflixBoardCtrl,
    controllerAs: 'board'
  });

  triflixBoardCtrl.$inject = ['$element', '$compile', '$scope', 'Game',
  '$rootScope', '$uibModal'];

  function triflixBoardCtrl($element, $compile, $scope, Game, $rootScope, $uibModal){
    var game, previous, self = this;

    this.$onInit = function(){
      game = Game.getStatus()[this.index];
      this.game = game;
      previous = angular.copy(game);
    }
    this.$doCheck = function(){
      if(!_.isEqual(game.state, previous.state)){

      }
    }

    this.makeMove = function(x, y){
      if(Game.lockBoard){
        return;
      }
      if(game.state[x + (y*3)] === Game.TEAMS.EMPTY){
        game.state[x + (y*3)] = game.team;
        Game.AImove(game)
        .then(function(resp){
          _.extend(game, resp.data);
          if(game.winner.team){
            $rootScope.$emit('triflix.game.victory');
            var victoryModal = $uibModal.open({
              animation: true,
              component: 'victoryModal',
              resolve: {
                game: [function(){
                  return self.game;
                }]
              }
            })
            victoryModal.result.catch(function(dismissed){
              Game.restart();
              $rootScope.$emit('triflix.game.start');
            })
          }

        }, function(err){
          console.log(err);
        });
      }
    }


    this.$postLink = function(){}


  }
})();
