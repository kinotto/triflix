;(function(){
  angular.module('triflix')
  .component('login', {
    bindings: {
    },
    templateUrl: 'app/components/panels/login/login.html',
    controller: loginCtrl,
    controllerAs: 'login'
  });

  loginCtrl.$inject = ['$scope', 'UserService', '$timeout', 'PanelService'];

  function loginCtrl($scope, UserService, $timeout, PanelService){


    this.getUser = function(){
      UserService.user()
      .then(function(resp){
        $timeout(function(){
          PanelService.open({
            component: 'board',
            scope: $scope
          });
        }, 1000);
      }, function(err){
        console.log(err);
      })
    }(); //immediatly invoked


  }
})();
