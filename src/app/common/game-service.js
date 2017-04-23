;(function(){
  angular.module('triflix')
  .service('Game', Game);

  Game.$inject = ['$http', 'TEAMS', 'LEVELS', 'GameSettings', '$timeout', 'ApiPath', '$q',
   'SocketService', '$rootScope', 'TicTacToeWrapper'];

  function Game($http, TEAMS, LEVELS, GameSettings, $timeout, ApiPath, $q, SocketService,
    $rootScope, TicTacToeWrapper){

    var ticTacToeWrapper, self = this;
    game = {};
    game.team = GameSettings.getSettings().team;
    game.level = GameSettings.getSettings().level;
    game.state = ['','','','','','','','',''];
    game.winner = {};
    this.lockBoard = true;


    var AImove = function(game){
      var deferred = $q.defer();
      $timeout(function(){
        try{
          if(!self.hasEmptySlots(game.state)){
            return deferred.reject(new Error('draw'));
          }
          var result = ticTacToeWrapper.makeMove(game);
          deferred.resolve(result);
        }
        catch(error){
          deferred.reject(error);
        }
      }, 800);
      return deferred.promise;
    }

    var multiplayerMove = function(game, lastMove){
      var hasemptyslots = self.hasEmptySlots(game.state);
      self.winner(game);
      return SocketService.makeMove(game, lastMove, hasemptyslots);
    }
    this.opponentMove = function(game, lastMove){
      if(SocketService.getOpponent()){
        return multiplayerMove(game, lastMove);
      } else{
        return AImove(game);
      }

    }

    this.reset = function(){
      game.state = ['','','','','','','','',''];
      game.winner = {};
      ticTacToeWrapper = new TicTacToeWrapper();
    }

    this.flatCoordinate = function(x, y){
      return x + (y * 3);
    }

    this.getStatus = function(){
      return game;
    }

    this.hasEmptySlots = function(state){
      var foundOne = _.find(state, function(cell){return cell === TEAMS.EMPTY});
      return foundOne !== undefined ? true : false;
    }
    this.winner = function(game){
      game.winner = ticTacToeWrapper.winner(game);
      if(game.winner){
        game.winner.team = game.winner.cell;
        delete game.winner.cell;
      }
      return game.winner;
    }

    /* events */
    $rootScope.$on('triflix.game.change.settings', function(evt, data){
      game.team = GameSettings.getSettings().team;
      game.level = GameSettings.getSettings().level;
    })
  }
})();
