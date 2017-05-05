;(function(){
  'use strict';

  angular.module('triflix', [
    'ui.router',
    'ui.bootstrap'
  ])
  .constant('TEAMS',{
    X: 'X',
    O: 'O',
    EMPTY: ''
  })
  .constant('ANIMATIONS', {
    X: 'tada',
    O: 'bounceIn'
  })
  .constant('LEVELS', {
    IMPOSSIBLE: {
      label: 'Hard',
      errors: 0
    },
    MEDIUM: {
      label: 'Medium',
      errors: 1
    },
    EASY: {
      label: 'Easy',
      errors: 2
    }
  })
  .constant('ApiPath', {
    game: {
      local: 'http://127.0.0.1:8080/jerseybackend/rest/game',
      remote: 'https://triflixbackend.herokuapp.com/rest/game'
    },
    login: {
      local: 'http://localhost:3007/auth/facebook',
      remote: 'https://triflixbe.herokuapp.com/auth/facebook'
    },
    getUser: {
      local: 'http://127.0.0.1:3007/user',
      remote: 'https://triflixbe.herokuapp.com/user'
    },
    multiplayer: {
      local: 'http://localhost:3007',
      remote: 'https://triflixbe.herokuapp.com'
    },
    score: {
      local: 'http://localhost:3007/score',
      remote: 'https://triflixbe.herokuapp.com/score'
    },
    getFBfriendsWithApp: {
      local: 'http://localhost:3007/user/me/friends',
      remote: 'https://triflixbe.herokuapp.com/user/me/friends'
    },
    inviteFriends: {
      local: 'http://localhost:3007/user/invite-friend',
      remote: 'https://triflixbe.herokuapp.com/user/invite-friend'
    }
  })


})();
