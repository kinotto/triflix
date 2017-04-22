;(function(){
  angular.module('triflix')
  .service('GameSettings', GameSettings);

  GameSettings.$inject = ['TEAMS', 'LEVELS', '$rootScope'];
  /*setting panel for the game*/

  function GameSettings(TEAMS, LEVELS, $rootScope){

    //default settings
    var settings = {
      team: TEAMS.X,
      level: LEVELS.IMPOSSIBLE
    }

    this.setTeam = function(team){
      settings.team = TEAMS[team.toUpperCase()] || TEAMS.X;
      $rootScope.$emit('triflix.game.change.team');
    }
    this.setLevel = function(level){
      settings.level = LEVELS[level.toUpperCase()] || LEVELS.IMPOSSIBLE;
    }
    this.getSettings = function(){
      return settings;
    }
  }
})();
