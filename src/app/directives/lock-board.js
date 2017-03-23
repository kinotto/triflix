;(function(){
  angular.module('triflix')
  .directive('lockBoard', ['$uibModal', 'Game', '$rootScope', function($uibModal, Game, $rootScope){
    var ddo = {

      link: function(scope, elem, attrs){
        elem.on('click', fn);
        function fn(evt){
          var modal = $uibModal.open({
            animation: true,
            component: 'chooseTeamModal',
            backdrop: 'static',
            resolve: {

            }
          });
          modal.result.then(function(res){
            elem.off('click', fn);
            Game.lockBoard = false; //unlock board
            $rootScope.$emit('triflix.game.start');
          })
          .catch(function(res){

          })
        }

      }


    }
    return ddo;
  }])

}())
