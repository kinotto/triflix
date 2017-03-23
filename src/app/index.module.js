;(function(){
  'use strict';

  angular.module('triflix', [
    'ui.router',
    'ngScrollReveal',
    'ui.bootstrap'
  ])

  .constant('TABLE_NR', 9)
  .constant('ApiPath', {
    game: {
      local: 'http://127.0.0.1:8080/jerseybackend/rest/game',
      remote: 'https://triflixbackend.herokuapp.com/rest/game'
    }
  });


}())
