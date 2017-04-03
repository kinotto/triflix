;(function(){
  angular.module('triflix')
  .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];
  function config($stateProvider, $urlRouterProvider, $httpProvider){
    $httpProvider.defaults.withCredentials = true;
    //$httpProvider.defaults.headers.get.Cookies = $cookies;
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/home/home.html',
        controller: 'HomeController as homeCtrl'
      });

    $urlRouterProvider.otherwise('/');
  }
})();
