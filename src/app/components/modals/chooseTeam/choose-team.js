;(function(){
  angular.module('triflix')
  .component('chooseTeamModal', {
    bindings: {
      modalInstance: '<',
      resolve: '<'
    },
    templateUrl: 'app/components/modals/chooseTeam/choose-team.html',
    controller: ChooseTeamModalCtrl,
    controllerAs: 'chooseTeam'
  })

  ChooseTeamModalCtrl.$inject = ['Game'];

  function ChooseTeamModalCtrl(Game){
    var self = this;
    self.images = Game.IMAGES;

    self.choose = function(team){
      Game.chooseTeam(team);
      self.modalInstance.close(team);
    }

    self.$postLink = function(){

    }
  }
}())
