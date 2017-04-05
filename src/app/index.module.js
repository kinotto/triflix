;(function(){
  'use strict';

  angular.module('triflix', [
    'ui.router',
    'ui.bootstrap'
  ])

  .constant('TABLE_NR', 2)
  .constant('ApiPath', {
    game: {
      local: 'http://127.0.0.1:8080/jerseybackend/rest/game',
      remote: 'https://triflixbackend.herokuapp.com/rest/game'
    },
    login: {
      local: 'http://127.0.0.1:3002/auth/f',
      remote: 'https://triflixbe.herokuapp.com/auth/facebook'
    },
    getUser: {
      local: 'http://127.0.0.1:3002/user',
      remote: 'https://triflixbe.herokuapp.com/user'
    },
    multiplayer: {
      local: 'http://localhost:3002/',
      remote: 'https://triflixbe.herokuapp.com'
    }
  });


})();
