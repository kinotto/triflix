;(function(){
  angular.module('triflix')
  .service('GameSettings', GameSettings);

  GameSettings.$inject = ['TEAMS', 'LEVELS', '$rootScope'];
  /*setting panel for the game*/

  function GameSettings(TEAMS, LEVELS, $rootScope){

    var settings = fetchSettings();

    this.setTeam = function(team){
      settings.team = TEAMS[team.toUpperCase()] || TEAMS.X;
      $rootScope.$emit('triflix.game.change.settings');
      persistSettings();
    }
    this.setLevel = function(level){
      settings.level = LEVELS[level.toUpperCase()] || LEVELS.IMPOSSIBLE;
      $rootScope.$emit('triflix.game.change.settings');
      persistSettings();
    }
    this.getSettings = function(){
      return settings;
    }

    function persistSettings(){
      localStorage.setItem('settings', angular.toJson(settings));
    }
    function fetchSettings(){
      var fetchedSettings = localStorage.getItem('settings');
      if(fetchedSettings){
        return angular.fromJson(fetchedSettings);
      } else{
        return {
          team: TEAMS.X,
          level: LEVELS.IMPOSSIBLE,
          sound: 'off'
        }
      }
    }

  }
})();
