;(function(){
  angular.module('triflix')
  .service('SocketService', SocketService);

  SocketService.$inject = ['ApiPath'];

  function SocketService(ApiPath){

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


  }
})();
