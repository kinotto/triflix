;(function(){
  angular.module('triflix')
  .directive('refreshBoard', ['$rootScope', 'SocketService', function($rootScope, SocketService){
    var ddo = {
      link: function(scope, elem, attrs){
        /*remove all the classes and icons from the board everytime you start the game*/

        var unwatch = $rootScope.$on('triflix.game.start', function(){
          elem.children().removeClass('board__cell--selected board__cell--o board__cell--x');
          angular.forEach(elem.children(), function(child){
            $(child).find('.icon').remove();
          })
        })

        scope.$on('$destroy', function(){
          unwatch();
        })

        if(SocketService.getOpponent()){
          //se multiplayer levo subito le icone di esempio
          $rootScope.$emit('triflix.game.start');
        }
      }
    }
    return ddo;
  }])
})();
