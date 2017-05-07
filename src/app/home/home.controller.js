(function(){
  'use strict';

  angular.module('triflix')
  .controller('HomeController', homeController);

  homeController.$inject = ['$scope', 'PanelService', '$timeout', 'SocketService'];

  function homeController($scope, PanelService, $timeout, SocketService){
    var self = this;

    $timeout(function(){
      PanelService.open({
        component: 'login',
        scope: $scope
      });
    })

    $scope.$watch(function(){
      return SocketService.getOpponent()
    }, function(newVal, oldVal){
      if(newVal)
        self.showChat = true;
      else
        self.showChat = false;
    })
  }
})();
