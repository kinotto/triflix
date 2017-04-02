(function(){
  'use strict';

  angular.module('triflix')
  .controller('HomeController', homeController);

  homeController.$inject = ['$scope', 'PanelService', '$timeout'];

  function homeController($scope, PanelService, $timeout){
    $timeout(function(){
      PanelService.open({
        component: 'board',
        scope: $scope
      });
    })

  }
})();
