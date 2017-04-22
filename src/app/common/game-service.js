;(function(){
  angular.module('triflix')
  .service('Game', Game);

  Game.$inject = ['$http', 'TEAMS', 'LEVELS', 'GameSettings', '$timeout', 'ApiPath', '$q',
   'SocketService', '$rootScope'];

  function Game($http, TEAMS, LEVELS, GameSettings, $timeout, ApiPath, $q, SocketService,
    $rootScope){

    var ticTacToeWrapper = new TicTacToeWrapper(); //wrapper for tictactoeAI.js

    game = {};
    game.team = GameSettings.getSettings().team;
    game.state = ['','','','','','','','',''];
    game.winner = {};
    this.lockBoard = true;


    var AImove = function(game){
      var deferred = $q.defer();
      $timeout(function(){
        try{
          if(!hasEmptySlots(game.state)){
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
      return SocketService.makeMove(game, lastMove);
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
    }

    this.flatCoordinate = function(x, y){
      return x + (y * 3);
    }

    this.getStatus = function(){
      return game;
    }

    var hasEmptySlots = function(state){
      var foundOne = _.find(state, function(cell){return cell === TEAMS.EMPTY});
      return foundOne !== undefined ? true : false;
    }


    /* events */
    $rootScope.$on('triflix.game.change.team', function(evt, data){
      game.team = GameSettings.getSettings().team;
    })
  }
})();
