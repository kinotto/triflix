;(function(){
  angular.module('triflix')
  .component('multiplayer', {
    bindings: {
    },
    templateUrl: 'app/components/panels/multiplayer/multiplayer.html',
    controller: multiplayerCtrl,
    controllerAs: 'multiplayer'
  });

  multiplayerCtrl.$inject = ['$scope', 'ApiPath', 'UserService', '$uibModal', 'PanelService'
  , 'SocketService', '$rootScope'];

  function multiplayerCtrl($scope, ApiPath, UserService, $uibModal, PanelService, SocketService, $rootScope){

    var user = UserService.getUser();
    if(!user) return; //display you have to login to use this feature
    //gestire timeout per connessione assente

    var self = this;
    var socket = SocketService.initSocket();


    self.chooseOpponent = function(opponent){
      if(self.users){
        var opponentSocketId = SocketService.getOpponentSocketFromValue(opponent, self.users);
        socket.emit('choose opponent', opponentSocketId);
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

    socket.on('challenge request', function(opponent){
      var text = 'Challenge request from '+ opponent.opponent.name;
      $uibModal.open({
        animation: true,
        component: 'confirm',
        backdrop: 'static',
        resolve: {
          text: [function(){
            return text;
          }],
          okCb: [function(){
            return function(){
              socket.emit('challenge accepted', {
                accepter: socket.id,
                challenger: opponent.opponentSocketId
              })
              SocketService.chooseOpponent(opponent);
              $rootScope.$emit('triflix.game.start');
              $scope.$parent.$close();
            }
          }]
        }
      });
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
