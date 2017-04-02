;(function(){
  angular.module('triflix')
  .component('board', {
    bindings: {
    },
    templateUrl: 'app/components/panels/board/board.html',
    controller: boardCtrl,
    controllerAs: 'board'
  });

  boardCtrl.$inject = ['PanelService', '$scope', '$timeout'];

  function boardCtrl(PanelService, $scope, $timeout){

    var open = function(){
      PanelService.open({
        component: 'board',
        scope: $scope
      });

    }
    var close = function(){
      $scope.$parent.$close();
    }

    this.params = {
      back: {
        text: 'indietro',
        cb: close
      },
      avatar: {
        url: 'assets/images/fb-profile.gif'
      },
      forward: {
        text: 'avanti',
        cb: open
      }
    }
  }
})();
