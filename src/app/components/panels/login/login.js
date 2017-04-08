;(function(){
  angular.module('triflix')
  .component('login', {
    bindings: {
    },
    templateUrl: 'app/components/panels/login/login.html',
    controller: loginCtrl,
    controllerAs: 'login'
  });

  loginCtrl.$inject = ['$scope', 'UserService', '$timeout', 'PanelService', 'TEAMS',
  'ANIMATIONS'];

  function loginCtrl($scope, UserService, $timeout, PanelService, TEAMS, ANIMATIONS){
    this.teams = TEAMS;
    this.animations = ANIMATIONS;
    var openBoard = function(){
      PanelService.open({
        component: 'multiplayer',
        scope: $scope
      });
    }

    this.getUser = function(){
      UserService.user()
      .then(function(user){
        this.user = user;
        $timeout(function(){
          openBoard();
        }, 1000);
      }, function(err){
        console.log(err);
      })
    }(); //immediatly invoked

    this.continueNotLogged = function(){
      openBoard();
    }

    this.loginWithFacebook = function(){
      window.location.href = 'https://triflixbe.herokuapp.com/auth/facebook';
    }

  }
})();
