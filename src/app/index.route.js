;(function(){
  angular.module('triflix')
  .config(config);

  function config($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/home/home.html',
        controller: 'HomeController as homeCtrl'
      });

    $urlRouterProvider.otherwise('/');
  }
}())
