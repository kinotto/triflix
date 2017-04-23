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
    checkIncognitoMode();
    var isIncognitoMode = false;
    this.teams = TEAMS;
    this.animations = ANIMATIONS;
    var openPanel= function(panel){
      PanelService.open({
        component: panel,
        scope: $scope
      });
    }

    var getUser = function(panel){
      UserService.user()
      .then(function(resp){
        this.user = resp.data;
        if(panel)
          $timeout(function(){
            openPanel(panel);
          }, 100);
      }, function(err){
        console.log(err);
      })
    }
    getUser('');

    this.continueNotLogged = function(){
      openPanel('board');
    }

    this.loginWithFacebook = function(){
      if(window.localStorage.getItem('x-auth'))
        getUser('multiplayer');
      else
        facebookAuth();
    }

    this.openSettings = function(){
      openPanel('settings');
    }

    var facebookAuth = function(){
      goTo(ApiPath.login.remote);
    }

    /*workaround per fare settare al browser l'header referer fondamentale al login
    a node per fare il redirect corretto. con window.location non viene settato l'header referer*/
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
    }

    /*utile perchè in modalità incognito non funziona il localstorage*/
    function checkIncognitoMode(){
      var fs = window.RequestFileSystem || window.webkitRequestFileSystem;
      if (!fs) {
        console.log('check failed');
        isIncognitoMode = false;
      } else{
        fs(window.TEMPORARY,
           100,
           function(){
             isIncognitoMode = false; //not in incognito
           },
           function(){
             isIncognitoMode = true; //incognito mode
             getUser('multiplayer');
           });
      }
    }
  }
})();
