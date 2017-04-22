;(function(){
  angular.module('triflix')
  .directive('paintCell', ['Game', '$compile', 'ANIMATIONS',
    function(Game, $compile, ANIMATIONS){
    /*paint a single cell on the board*/
    var ddo = {
      scope: {
        cell: '=paintCell',
        game: '='
      },
      link: function(scope, elem, attrs){
        var icon = angular.element('<span class="icon animated {{iconEffect}}"></span>');

        scope.$watch('cell', function(newVal){
          if(!newVal) return;
          scope.iconEffect = ANIMATIONS[scope.cell] || 'bounceIn';
          elem.removeClass('board__cell--x board__cell--o');
          elem.addClass('board__cell--selected board__cell--'+scope.cell.toLowerCase());
          elem.append($compile(icon)(scope));

        })


      }
    }
    return ddo;
  }])



})();
