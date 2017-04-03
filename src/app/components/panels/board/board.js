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
        component: 'board',
        scope: $scope
      });

    }
    var close = function(){
      $scope.$parent.$close();
    }
    //this.params = {};
    this.params = {
      back: {
        text: 'indietro',
        cb: close
      },
      avatar: {
        url: user.facebook.img || ''
      },
      forward: {
        text: 'avanti',
        cb: open
      }
    }
  }
})();
