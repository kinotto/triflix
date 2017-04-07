;(function(){
  angular.module('triflix')
  .component('chooseTeamModal', {
    bindings: {
      modalInstance: '<',
      resolve: '<'
    },
    templateUrl: 'app/components/panels/choose-team/choose-team.html',
    controller: ChooseTeamModalCtrl,
    controllerAs: 'chooseTeam'
  })

  ChooseTeamModalCtrl.$inject = ['Game', 'TEAMS'];

  function ChooseTeamModalCtrl(Game, TEAMS){
    var self = this;
    //self.images = Game.IMAGES;

    self.teams = TEAMS;
    self.choose = function(team){
      Game.chooseTeam(team);
      self.modalInstance.close(team);
    }

    self.$postLink = function(){

    }
  }
})();
