;(function(){
  angular.module('triflix')
  .component('victoryModal', {
    bindings: {
      resolve: '<'
    },
    templateUrl: 'app/components/modals/victory/victory-modal.html',
    controller: VictoryModalCtrl,
    controllerAs: '$ctrl'
  })

  VictoryModalCtrl.$inject = ['Game', '$window'];

  function VictoryModalCtrl(Game, $window){
    var self = this;

    self.game = self.resolve.game;

    /*if(self.game.winner.team === Game.TEAMS.X)
      self.winnerImg = 'assets/images/x.png';
    else
      self.winnerImg = 'assets/images/o.png';
    */
    self.winnerTeam = self.game.winner.team;

    self.$postLink = function(){

    }

  }
})();
