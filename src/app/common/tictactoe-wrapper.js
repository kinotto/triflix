;(function(){

  function TicTacToeWrapper(){}

  TicTacToeWrapper.prototype.makeMove = function(game){
    var tictactoe = new TicTacToe.TicTacToeBoard(game.state);
    var aiPlayer = new TicTacToe.TicTacToeAIPlayer();
    var aiTeam = tictactoe.oppositePlayer(game.team);
    aiPlayer.initialize(aiTeam, tictactoe);
    var move = aiPlayer.makeMove();
    if(move != null){
      tictactoe.makeMove(aiTeam, move);
    } else {
      throw new Error('invalid move');
    }
    var winner = tictactoe.winner();
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

  window.TicTacToeWrapper = TicTacToeWrapper;

})();
