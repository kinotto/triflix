;(function(){
  angular.module('triflix')
  .service('SocketService', SocketService);

  SocketService.$inject = ['ApiPath', '$timeout', '$q', 'TEAMS', '$rootScope'];

  function SocketService(ApiPath, $timeout, $q, TEAMS, $rootScope){

    var socket, opponent;
    this.initSocket = function(){
      if(!window.io)
        return console.log('socket.io not loaded');
      if(!socket){
        socket = io.connect(ApiPath.multiplayer.remote);
        this.on('disconnect', function(){
          socket = null;
        })
      }
    }
    this.emit = function(evt, data){
      socket.emit(evt, data);
    }
    this.on = function(evt, clb){
      socket.on(evt, clb);
    }
    this.getSocketId = function(){
        return socket.id;
    }
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
      deferred.resolve({data: game});
      /*socket.on('make move', function(opponentMove){
        $rootScope.$apply(function(){
          game.state[opponentMove] = game.team === TEAMS.X ? TEAMS.O : TEAMS.X;
          deferred.resolve({data: game});
        })
      })*/
      return deferred.promise;
    }


  }
})();
