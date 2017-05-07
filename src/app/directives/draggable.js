;(function(){
  angular.module('triflix')
  .directive('draggable', ['$rootScope', function($rootScope){
    var ddo = {
      link: function(scope, elem, attrs){
        elem.draggable({
          appendTo: "body",
          containment: "body",
          start: function( event, ui ) {
            scope.$apply(function(){
              $rootScope.isDragging = true;
            })
          },
          stop: function( event, ui ) {
            scope.$apply(function(){
              $rootScope.isDragging = false;
            })
          }
        });
      }

    }
    return ddo;
  }])

})();
