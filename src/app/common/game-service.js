;(function(){
  angular.module('triflix')
  .service('Game', Game);

  Game.$inject = ['$http', 'TABLE_NR', '$timeout', 'ApiPath', '$q'];

  function Game($http, TABLE_NR, $timeout, ApiPath, $q){

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
    var tictactoewrapper = new TicTacToeWrapper();

    this.AImove = function(game){
      var deferred = $q.defer();
      $timeout(function(){
        try{
          var result = tictactoewrapper.makeMove(game);
          deferred.resolve(result);
        }
        catch(error){
          deferred.reject(error);
        }
      })
      return deferred.promise;

    }

    this.aiMoveRemote = function(){
      /*return $http({
        url: ApiPath.game.remote,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' //request
        },
        data: JSON.stringify(eval(game))
      });*/
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
