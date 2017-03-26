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
    this.AImove = function(game){
      var deferred = $q.defer();
      $timeout(function(){
        var tictactoe = new TicTacToe.TicTacToeBoard(game.state);
        var aiPlayer = new TicTacToe.TicTacToeAIPlayer();
        var aiTeam = tictactoe.oppositePlayer(game.team);
        aiPlayer.initialize(aiTeam, tictactoe);
        var move = aiPlayer.makeMove();
        if(move != null){
          tictactoe.makeMove(aiTeam, move);
        } else  {
          deferred.reject('invalid move');
        }
        deferred.resolve({data: tictactoe.board});
      })
      return deferred.promise;
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

  }
})();
