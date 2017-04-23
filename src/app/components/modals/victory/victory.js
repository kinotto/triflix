;(function(){
  angular.module('triflix')
  .component('victoryModal', {
    bindings: {
      resolve: '<'
    },
    templateUrl: 'app/components/modals/victory/victory.html',
    controller: VictoryModalCtrl,
    controllerAs: '$ctrl'
  })

  VictoryModalCtrl.$inject = ['Game'];

  function VictoryModalCtrl(Game){
    var self = this;

    self.game = self.resolve.game;

    /*if(self.game.winner.team === Game.TEAMS.X)
      self.winnerImg = 'assets/images/x.png';
    else
      self.winnerImg = 'assets/images/o.png';
    */
    self.winner = self.game.winner;
    self.$postLink = function(){

    }

  }
})();
