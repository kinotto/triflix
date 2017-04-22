;(function(){
  angular.module('triflix')
  .component('settings', {
    bindings: {
    },
    templateUrl: 'app/components/panels/settings/settings.html',
    controller: settingsCtrl,
    controllerAs: 'settings'
  });

  settingsCtrl.$inject = ['$scope', 'TEAMS', 'LEVELS', 'GameSettings'];

  function settingsCtrl($scope, TEAMS, LEVELS, GameSettings){
    var self = this;
    self.teams = TEAMS;
    self.levels = LEVELS;

    self.applySetting= function(key, value){
      if(key === 'team')
        GameSettings.setTeam(value);
      if(key === 'level')
        GameSettings.setLevel(value);
    }

    self.params = {
      back: {
        text: 'Back',
        cb: function(){
          $scope.$parent.$close();
        }
      }
    };


  }
})();
