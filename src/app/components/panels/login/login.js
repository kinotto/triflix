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
        }, 500);
      }, function(err){
        console.log(err);
      })
    }(); //immediatly invoked

    this.continueNotLogged = function(){
      openPanel('board');
    }

    this.loginWithFacebook = function(){
      goTo(ApiPath.login.remote);
    }


    /*workaround per fare settare al browser l'header referer fondamentale al login
    a node per fare il redirect corretto. con window.location non viene settato l'header*/
    function goTo(url){
      var a = document.createElement("a");
      if(!a.click) //for IE
      {
           window.location = url;
           return;
      }
      a.setAttribute("href", url);
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      console.log('click created');
    }
  }
})();
