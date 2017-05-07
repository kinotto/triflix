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
  '$rootScope', '$uibModal', 'TEAMS', 'SocketService', 'ScoreService'];

  function triflixBoardCtrl($element, $compile, $scope, Game, $rootScope, $uibModal,
    TEAMS, SocketService, ScoreService){
    var game, self = this;

    this.$onInit = function(){
      self.userMove = true;

      Game.lockBoard = true;
      Game.reset();
      game = Game.getStatus();
      this.game = game;
      if(SocketService.getOpponent()){
        //se c'è il campo opponentTeam significa che l'avversario ha scelto la squadra
        if(SocketService.getOpponent().opponentTeam)
          this.game.team = SocketService.getOpponent().opponentTeam === TEAMS.X ? TEAMS.O : TEAMS.X;

        self.opponentName = SocketService.getOpponent().opponent.data.facebook.name.split(" ")[0];
        Game.lockBoard = false;
        SocketService.on('make move', function(opponentMove){
          $scope.$apply(function(){
            game.state[opponentMove] = game.team === TEAMS.X ? TEAMS.O : TEAMS.X;
            self.userMove = true;
            if(Game.winner(game)){
              SocketService.emit('winner or draw', {
                description: "test",
                player1: user.facebook.id,
                player2: SocketService.getOpponent().opponent.data.facebook.id,
                teamPlayer1: game.team,
                teamPlayer2: SocketService.getOpponent().opponentTeam,
                winner: game.winner.team === game.team ? user.facebook.id : SocketService.getOpponent().opponent.data.facebook.id,
                state: game.state
              })
              openModal('victoryModal', function(dismissed){
                Game.reset();
                $rootScope.$emit('triflix.game.start');
              });
            }
          })
        });
        SocketService.on('game aborted', function(){
          $scope.$parent.$parent.$close();
        })
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
          if(!SocketService.getOpponent()){
            self.userMove = true;
          }

          if(game.winner && game.winner.team){
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

    /*var hasEmptySlots = function(state){
      var foundOne = _.find(state, function(cell){return cell === TEAMS.EMPTY});
      return foundOne !== undefined ? true : false;
    }*/
  }
})();
