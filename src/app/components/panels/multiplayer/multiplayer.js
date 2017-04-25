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

    var self = this;
    self.user = UserService.getUser();
    var user = self.user;
    if(!user) return $scope.$parent.$close(); //display you have to login to use this feature
    if(!user.facebook) return $scope.$parent.$close();
    //gestire timeout per connessione assente

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
      data: user
    });


    SocketService.on('add to room', function(data){
      $scope.$apply(function(){
        self.users = data.users;
        self.usersOnline = _.map(data.users, function(value, key){
          return value;
        })
        //self.usersOnline = [self.usersOnline[0], self.usersOnline[0], self.usersOnline[0], self.usersOnline[0]];
      })
    });

    SocketService.on('challenge request', function(opponent){
      var text = 'Challenge request from '+ opponent.opponent.data.facebook.name;
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

    this.openProfile = function(userSelected){
      PanelService.open({
        component: 'profile',
        scope: $scope,
        resolve: {
          user: function(){
            return userSelected;
          }
        }
      });
    }
    this.params = {
      back: {
        text: 'Back',
        cb: function(){
          SocketService.removeOpponent();
          $scope.$parent.$close();
        }
      }
    };


  }
})();
