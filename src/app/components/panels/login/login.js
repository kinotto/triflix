;(function(){
  angular.module('triflix')
  .component('login', {
    bindings: {
    },
    templateUrl: 'app/components/panels/login/login.html',
    controller: loginCtrl,
    controllerAs: 'login'
  });

  loginCtrl.$inject = ['UserService', '$timeout'];

  function loginCtrl(UserService, $timeout){
    /*PanelService.open({
      component: 'login',
      scope: $scope
    });*/

    this.login = function(){
      /*Login.login()
      .then(function(resp){
        var p = resp;
      }, function(err){
        console.log(err);
      })*/

    }

    this.getUser = function(){
      UserService.getUser()
      .then(function(resp){
        var p = resp;
      }, function(err){
        console.log(err);
      })
    }


  }
})();
