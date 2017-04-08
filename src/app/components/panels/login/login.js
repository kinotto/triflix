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
  'ANIMATIONS', 'ApiPath'];

  function loginCtrl($scope, UserService, $timeout, PanelService, TEAMS, ANIMATIONS,
  ApiPath){
    this.teams = TEAMS;
    this.animations = ANIMATIONS;
    var openPanel= function(panel){
      PanelService.open({
        component: panel,
        scope: $scope
      });
    }

    this.getUser = function(){
      UserService.user()
      .then(function(user){
        this.user = user;
        $timeout(function(){
          openPanel('multiplayer');
        }, 1000);
      }, function(err){
        console.log(err);
      })
    }(); //immediatly invoked

    this.continueNotLogged = function(){
      openPanel('board');
    }

    this.loginWithFacebook = function(){
      window.location.href = ApiPath.login.remote;
    }

  }
})();
