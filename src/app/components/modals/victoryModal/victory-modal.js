;(function(){
  angular.module('triflix')
  .component('victoryModal', {
    bindings: {
      resolve: '<'
    },
    templateUrl: 'app/components/modals/victoryModal/victory-modal.html',
    controller: VictoryModalCtrl,
    controllerAs: 'victory'
  })

  VictoryModalCtrl.$inject = ['Game', '$window'];

  function VictoryModalCtrl(Game, $window){
    var self = this;

    self.game = self.resolve.game;

    if(self.game.winner.team === Game.TEAMS.X)
      self.winnerImg = 'assets/images/x.png';
    else
      self.winnerImg = 'assets/images/o.png';

  
    self.$postLink = function(){

    }

  }
}())
