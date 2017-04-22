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
  '$rootScope', '$uibModal', 'TEAMS', 'SocketService'];

  function triflixBoardCtrl($element, $compile, $scope, Game, $rootScope, $uibModal,
    TEAMS, SocketService){
    var game, self = this;

    this.$onInit = function(){
      self.userMove = true;
      Game.lockBoard = true;
      Game.reset();
      game = Game.getStatus();
      this.game = game;
      if(SocketService.getOpponent()){
        SocketService.on('make move', function(opponentMove){
          $scope.$apply(function(){
            game.state[opponentMove] = game.team === TEAMS.X ? TEAMS.O : TEAMS.X;
          })
        });
      }
    }

    this.makeMove = function(x, y){
      var flatCoordinate = Game.flatCoordinate(x, y);
      if(Game.lockBoard){
        return;
      }
      if(game.state[flatCoordinate] === TEAMS.EMPTY && self.userMove){
        self.userMove = false;
        game.state[flatCoordinate] = game.team;
        Game.opponentMove(game, flatCoordinate)
        .then(function(resp){
          _.extend(game, resp.data);
          self.userMove = true;
          if(game.winner.team){
            $rootScope.$emit('triflix.game.victory');
            openModal('victoryModal', function(dismissed){
              Game.reset();
              $rootScope.$emit('triflix.game.start');
            });
          }

        })
        .catch(function(error){
          if(error.message === 'draw'){
            openModal('victoryModal', function(dismissed){
              Game.reset();
              $rootScope.$emit('triflix.game.start');
              self.userMove = true;
            });
          } else{
            console.log(error);
          }
        })
      }
    }


    this.$postLink = function(){}

    var openModal = function(component, callback){
      var modal = $uibModal.open({
        animation: true,
        component: component,
        resolve: {
          game: [function(){
            return self.game;
          }]
        }
      })
      modal.result.catch(callback)
    }
  }
})();
