;(function(){
  angular.module('triflix')
  .component('board', {
    bindings: {
    },
    templateUrl: 'app/components/panels/board/board.html',
    controller: boardCtrl,
    controllerAs: 'board'
  });

  boardCtrl.$inject = ['PanelService', '$scope', '$timeout', 'UserService', '$rootScope'];

  function boardCtrl(PanelService, $scope, $timeout, UserService, $rootScope){

    var user = UserService.getUser();
    var open = function(){
      PanelService.open({
        component: 'multiplayer',
        scope: $scope
      });

    }
    var close = function(){
      //ripristino le impostaizoni utente che potrebbero essere cambiate se si sta giocando
      //una partita in multiplayer, la team viene comandata da chi invia la richiesta di sfida
      //bisogna ripristinarla al default
      $rootScope.$emit('triflix.game.change.settings');
      $scope.$parent.$close();
    }

    this.params = {
      back: {
        text: 'Back',
        cb: close
      },
      avatar: {
        url: user ?  (user.facebook.img || '') : ''
      }
    }
  }
})();
