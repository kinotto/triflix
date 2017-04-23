;(function(){

  angular.module('triflix')
  .factory('TicTacToeWrapper', ['LEVELS', 'TEAMS', function(LEVELS, TEAMS){

    function makeMove(game){
      var tictactoe = new TicTacToe.TicTacToeBoard(game.state);
      var aiPlayer = new TicTacToe.TicTacToeAIPlayer();
      var aiTeam = tictactoe.oppositePlayer(game.team);
      aiPlayer.initialize(aiTeam, tictactoe);
      var winner = tictactoe.winner();
      if(!winner){
        if(!_.isEqual(game.level, LEVELS.IMPOSSIBLE) && this.errors < game.level.errors){
          var randomCell = getRandomCell(game);
          tictactoe.board[randomCell] = aiTeam;
          this.errors++;
        }
        else{
          var move = aiPlayer.makeMove();
          if(move != null){
            tictactoe.makeMove(aiTeam, move);
          } else {
            throw new Error('invalid move');
          }
        }
        winner = tictactoe.winner();
      }
      return {
        data: {
          team: game.team,
          state: tictactoe.board,
          winner: {
            team: winner ? winner.cell : '',
            indexes: winner ? winner.indexes : []
          }
        }
      }
    }

    function getRandomCell(game){
      var found = false,
          cell;
      while(!found){
        cell = _.random(0, 8);
        found = game.state[cell] === TEAMS.EMPTY ? true : false;
      }

      return cell;
    }

    return function(){
      this.errors = 0;
      this.makeMove = makeMove;
      this.winner = function(game){
        var tictactoe = new TicTacToe.TicTacToeBoard(game.state);
        var aiPlayer = new TicTacToe.TicTacToeAIPlayer();
        var aiTeam = tictactoe.oppositePlayer(game.team);
        aiPlayer.initialize(aiTeam, tictactoe);
        return tictactoe.winner();
      }
    }


  }])


})();
