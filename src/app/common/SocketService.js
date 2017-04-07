;(function(){
  angular.module('triflix')
  .service('SocketService', SocketService);

  SocketService.$inject = ['ApiPath', '$timeout', '$q'];

  function SocketService(ApiPath, $timeout, $q){

    var socket, opponent;
    this.initSocket = function(){
      if(!window.io)
        return console.log('socket.io not loaded');
      if(!socket){
        socket = io.connect(ApiPath.multiplayer.local);
      }
      return socket;
    }
    this.chooseOpponent = function(challenger){
      opponent = challenger;
    }

    this.getOpponent = function(){
      return opponent;
    }

    this.makeMove = function(game){
      var deferred = $q.defer();
      socket.emit('make move', game);
      socket.on('make move', function(game){
        deferred.resolve({data: game});
      })
      return deferred.promise;
    }
  }
})();
