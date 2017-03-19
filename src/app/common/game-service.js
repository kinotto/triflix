;(function(){
  angular.module('triflix')
  .service('Game', Game);

  Game.$inject = ['$http', 'TABLE_NR', '$timeout'];

  function Game($http, TABLE_NR, $timeout){

    var game = [];
    var TEAMS = {
      X: 'X',
      O: 'O',
      EMPTY: ''
    }

    for(var i = 0; i < TABLE_NR; i++){
      game[i] = {};
      game[i].team = TEAMS.X;
      game[i].state = ['','','','','','','','',''];
      game[i].winner = {};
    }

    (function(game){ //init

    }(game))

    this.TEAMS = TEAMS;

    this.getStatus = function(){
      return game;
    }
    this.AImove = function(game){

      return $http({
        //url: 'http://127.0.0.1:8080/jerseybackend/rest/hellocors',
        url: 'https://triflixbackend.herokuapp.com/rest/hellocors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' //request
        },
        data: JSON.stringify(eval(game))
        //dataType: 'json', //response
        //contentType: 'application/json' //request
      });


    }

  }
}())
