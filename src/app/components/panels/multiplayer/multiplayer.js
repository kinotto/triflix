;(function(){
  angular.module('triflix')
  .component('multiplayer', {
    bindings: {
    },
    templateUrl: 'app/components/panels/multiplayer/multiplayer.html',
    controller: multiplayerCtrl,
    controllerAs: 'multiplayer'
  });

  multiplayerCtrl.$inject = ['$scope', 'ApiPath', 'UserService'];

  function multiplayerCtrl($scope, ApiPath, UserService){
    if(!window.io ) return console.log('no support');
    var user = UserService.getUser();
    if(!user) return; //display you have to login to use this feature
    //gestire timeout per connessione assente

    var self = this;
    var socket = io.connect(ApiPath.multiplayer.local);


    self.chooseOpponent = function(opponent){
      if(self.users){
        socket.emit('choose opponent', {
          userIdFrom: user.facebook.id,
          userIdTo: opponent.userId
        })
      }
    }

    socket.emit('add to room', {
      userId: user.facebook.id,
      name: user.facebook.name
    });



    socket.on('add to room', function(data){
      $scope.$apply(function(){
        self.users = data.users;
        self.usersOnline = _.map(data.users, function(value, key){
          return value;
        })
      })
    });

    socket.on('choose opponent', function(data){
      alert('Richiesta sfida, vuoi giocare con '+data.userIdFrom);
    })

    this.params = {
      back: {
        text: 'Back',
        cb: function(){
          $scope.$parent.$close();
        }
      }
    };


  }
})();
