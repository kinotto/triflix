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
  , 'SocketService', '$rootScope', 'PanelService'];

  function multiplayerCtrl($scope, ApiPath, UserService, $uibModal, PanelService,
    SocketService, $rootScope, PanelService){

    var user = UserService.getUser();
    if(!user) return $scope.$parent.$close(); //display you have to login to use this feature
    //gestire timeout per connessione assente

    var self = this;
    SocketService.initSocket();

    var openBoard = function(){
      PanelService.open({
        component: 'board',
        scope: $scope
      });
    }

    self.chooseOpponent = function(opponent){
      if(self.users){
        var opponentSocketId = SocketService.getOpponentSocketFromValue(opponent, self.users);
        SocketService.emit('choose opponent', opponentSocketId);
      }
    }

    SocketService.emit('add to room', {
      userId: user.facebook.id,
      name: user.facebook.name
    });


    SocketService.on('add to room', function(data){
      $scope.$apply(function(){
        self.users = data.users;
        self.usersOnline = _.map(data.users, function(value, key){
          return value;
        })
      })
    });

    SocketService.on('challenge request', function(opponent){
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
              SocketService.emit('challenge accepted', {
                accepter: SocketService.getSocketId(),
                challenger: opponent.opponentSocketId
              })
              SocketService.chooseOpponent(opponent);
              $rootScope.$emit('triflix.game.start');
              openBoard();
            }
          }]
        }
      });
    });

    SocketService.on('challenge accepted', function(opponent){
      SocketService.chooseOpponent(opponent);
      $rootScope.$emit('triflix.game.start');
      openBoard();
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
