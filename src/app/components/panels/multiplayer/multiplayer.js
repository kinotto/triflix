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
  , 'SocketService', '$rootScope', 'PanelService', 'GameSettings'];

  function multiplayerCtrl($scope, ApiPath, UserService, $uibModal, PanelService,
    SocketService, $rootScope, PanelService, GameSettings){

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

    self.fbFriends = [];
    /*funzione di paging, che scarica man mano tutti gli amici che hanno il
    gioco installato*/
    var getfbFriends  = function(params){
      return UserService.getFBfriendsWithApp(params)
      .then(function(resp){
        [].push.apply(self.fbFriends, resp.data.data);
        if(resp.data.paging && resp.data.paging.next)
          getfbFriends({nextPage: resp.data.paging.next});
      }, function(err){
        console.log(err);
      })
    }


    self.chooseOpponent = function(opponent){
      if(self.users){
        var opponentSocketId = SocketService.getOpponentSocketFromValue(opponent, self.users);
        SocketService.emit('choose opponent', {team: GameSettings.getSettings().team, opponentSocketId: opponentSocketId});
      }
    }

    getfbFriends()
    .then(function(){
      SocketService.emit('add to room', {
        userId: user.facebook.id,
        data: user
      });

      SocketService.on('add to room', function(data){
        $scope.$apply(function(){
          self.users = data.users;
          self.usersOnline = _.map(data.users, function(value, key){
            value.online = true;
            return value;
          })
          //mergio gli array e sovrascrivo eventuali proprietà online = false
          self.usersOnline = mergeByProperty(self.fbFriends, self.usersOnline, 'id');
          //self.usersOnline = [self.usersOnline[0], self.usersOnline[0], self.usersOnline[0], self.usersOnline[0]];
        })
      });
    })


    SocketService.on('challenge request', function(data){
      var text = 'Challenge request from '+ data.opponent.data.facebook.name;
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
                challenger: data.opponentSocketId
              })
              SocketService.chooseOpponent(data);
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

    this.inviteFriend = function(friend){
      UserService.invite({
        inviteFrom: self.user.facebook.id,
        inviteTo: friend.data.facebook.id
      })
    }

    function mergeByProperty(arr1, arr2, prop){
      _.each(arr2, function(arr2Obj){
        var found = _.find(arr1, function(arr1Obj){
          if(arr1Obj.data.facebook[prop] === arr2Obj.data.facebook[prop])
            return arr1Obj;
        });
        found ? _.extend(found, arr2Obj) : arr1.push(arr2Obj);
      })
      return arr1;
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
