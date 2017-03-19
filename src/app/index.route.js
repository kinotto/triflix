;(function(){
  angular.module('triflix')
  .config(config)
  .constant('TABLE_NR', 9)


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
