;(function(){
  angular.module('triflix')
  .directive('lockBoard', ['$uibModal', 'Game', '$rootScope', 'SocketService',
    function($uibModal, Game, $rootScope, SocketService){

    /*Lock the board until you choose a team through the ChooseTeam modal component*/

    var ddo = {
      link: function(scope, elem, attrs){
        if(!SocketService.getOpponent())
          elem.on('click', fn);
          
        function fn(evt){
          /*var modal = $uibModal.open({
            animation: true,
            component: 'chooseTeamModal',
            backdrop: 'static',
            resolve: {}
          });
          modal.result.then(function(res){
            elem.off('click', fn);
            Game.lockBoard = false; //unlock board
            $rootScope.$emit('triflix.game.start');
          })
          .catch(function(res){

          })*/
          elem.off('click', fn);
          Game.lockBoard = false; //unlock board
          $rootScope.$emit('triflix.game.start');
        }

      }


    }
    return ddo;
  }])

})();
