;(function(){
  angular.module('triflix')
  .service('Game', Game);

  Game.$inject = ['$http', 'TABLE_NR', '$timeout', 'ApiPath', '$q', 'SocketService'];

  function Game($http, TABLE_NR, $timeout, ApiPath, $q, SocketService){

    var ticTacToeWrapper = new TicTacToeWrapper(); //wrapper for tictactoeAI.js
    var game = [];
    var TEAMS = {
      X: 'X',
      O: 'O',
      EMPTY: ''
    }
    var ANIMATIONS = {
      X: 'tada',
      O: 'bounceIn'
    }
    function init(){
      for(var i = 0; i < TABLE_NR; i++){
        game[i] = {};
        game[i].team = TEAMS.X; //default team
        game[i].state = ['','','','','','','','',''];
        game[i].winner = {};
      }
    }
    init();

    this.TEAMS = TEAMS;
    this.ANIMATIONS = ANIMATIONS;
    this.lockBoard = true;

    this.getStatus = function(){
      return game;
    }


    var AImove = function(game){
      var deferred = $q.defer();
      $timeout(function(){
        try{
          var result = ticTacToeWrapper.makeMove(game);
          deferred.resolve(result);
        }
        catch(error){
          deferred.reject(error);
        }
      })
      return deferred.promise;
    }

    var multiplayerMove = function(game){
      return SocketService.makeMove(game);
    }
    this.opponentMove = function(game){
      if(SocketService.getOpponent()){
        return multiplayerMove(game);
      } else{
        return AImove(game);
      }

    }

    /*unused*/
    this.aiMoveRemote = function(){
      return $http({
        url: ApiPath.game.remote,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' //request
        },
        data: JSON.stringify(eval(game))
      });
    }
    this.restart = function(){
      game.forEach(function(g){
        g.state = ['','','','','','','','',''];
        g.winner = {};
      })

    }

    this.chooseTeam = function(team){
      game.forEach(function(g){
        g.team = team;
      })
    }

    this.flatCoordinate = function(x, y){
      return x + (y * 3);
    }
  }
})();
