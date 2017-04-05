;(function(){
  angular.module('triflix')
  .component('board', {
    bindings: {
    },
    templateUrl: 'app/components/panels/board/board.html',
    controller: boardCtrl,
    controllerAs: 'board'
  });

  boardCtrl.$inject = ['PanelService', '$scope', '$timeout', 'UserService'];

  function boardCtrl(PanelService, $scope, $timeout, UserService){

    var user = UserService.getUser();
    var open = function(){
      PanelService.open({
        component: 'multiplayer',
        scope: $scope
      });

    }
    var close = function(){
      $scope.$parent.$close();
    }

    this.params = {
      back: {
        text: 'Back',
        cb: close
      },
      avatar: {
        url: user ?  (user.facebook.img || '') : ''
      },
      forward: {
        text: 'Forward',
        cb: open
      }
    }
  }
})();
