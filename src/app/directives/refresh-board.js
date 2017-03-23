angular.module('triflix')
.directive('refreshBoard', ['$rootScope', function($rootScope){
  var ddo = {
    link: function(scope, elem, attrs){
      $rootScope.$on('triflix.game.start', function(){
        elem.children().removeClass('board__cell--selected board__cell--o board__cell--x');
        angular.forEach(elem.children(), function(child){
          $(child).find('.icon').remove();
        })
      })
    }
  }
  return ddo;
}])
