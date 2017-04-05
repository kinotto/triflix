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
    self.usersOnline = [];
    var socket = io.connect(ApiPath.multiplayer.local);


    var scopeApply = function(clb){
      $scope.$apply(function(){
        clb && clb();
      })
    }

    socket.emit('add to room', {userId: user.facebook.id});



    socket.on('add to room', function(data){
      scopeApply(function(){
        self.usersOnline = _.values(data.users);
      })
    });


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
