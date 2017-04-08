;(function(){
  angular.module('triflix')
  .service('SocketService', SocketService);

  SocketService.$inject = ['ApiPath', '$timeout', '$q', 'TEAMS', '$rootScope'];

  function SocketService(ApiPath, $timeout, $q, TEAMS, $rootScope){

    var socket, opponent;
    var initSocket = function(){
      if(!window.io)
        return console.log('socket.io not loaded');
      if(!socket){
        socket = io.connect(ApiPath.multiplayer.local);
      }
      return socket;
    }
    initSocket();

    this.emit = function(evt, data){
      socket.emit(evt, data);
    }
    this.on = function(evt, clb){
      socket.on(evt, clb);
    }
    this.socketId = socket.id;
    this.chooseOpponent = function(challenger){
      opponent = challenger;
    }

    this.getOpponentSocketFromValue = function(opponent, users){
      var opponentSocketId = -1;
      _.mapObject(users, function(user, socketId){
        if(user.userId === opponent.userId)
          opponentSocketId = socketId;
      });
      return opponentSocketId;
    }

    this.getOpponent = function(){
      return opponent;
    }

    this.makeMove = function(game, myLastMove){
      var deferred = $q.defer();
      socket.emit('make move', {move: myLastMove, opponent: opponent});
      socket.on('make move', function(opponentMove){
        $rootScope.$apply(function(){
          game.state[opponentMove] = game.team === TEAMS.X ? TEAMS.O : TEAMS.X;
          deferred.resolve({data: game});
        })
      })
      return deferred.promise;
    }


  }
})();
