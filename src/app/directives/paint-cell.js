;(function(){
  angular.module('triflix')
  .directive('paintCell', ['Game', function(Game){
    /*paint a single cell on the board*/
    var ddo = {
      scope: {
        cell: '=paintCell',
        game: '='
      },
      link: function(scope, elem, attrs){
        var icon = angular.element('<span class="icon animated tada"></span>');
        scope.$watch('cell', function(){
          if(scope.cell === Game.TEAMS.O){
            elem.addClass('board__cell--selected board__cell--o');
            elem.append(icon);
          } else if(scope.cell === Game.TEAMS.X){
            elem.addClass('board__cell--selected board__cell--x');
            elem.append(icon);
          }

        })


      }
    }
    return ddo;
  }])



  /*.component('paintCell', {
    bindings: {
      cell: '<',
      game: '<'
    },
    controller: paintCellCtrl,
    controllerAs: 'paint'
  });

  paintCellCtrl.$inject = ['$element', '$compile', 'Game', '$rootScope', '$timeout', '$scope'];

  function paintCellCtrl($element, $compile, Game, $rootScope, $timeout, $scope){

    var previousVal = this.cell;
    var self = this;
    self.$doCheck = function(){
      if(this.cell !== previousVal){
        if(this.cell === Game.TEAMS.X){
          $element.css('background-image', 'url('+Game.IMAGES.X+')');
        } else if(this.cell === Game.TEAMS.O){
          $element.css('background-image', 'url('+Game.IMAGES.O+')');
        } else if(this.cell === Game.TEAMS.EMPTY){
          $element.css('background-image', 'none');
        }
        previousVal = this.cell;
      }
    }

    $rootScope.$on('triflix.game.victory', function(evt, data){
      $timeout(function(){
        $element.removeClass('animated pulse');
      }, 100)
      $timeout(function(){
        $element.addClass('animated pulse');
      },200)

    })


    self.$postLink = function(){

      var overlayHtml =
      '<div class="paintCell--overlay">'+
        '<div style="text-align: center; position: relative; width: 100%; height: 100%;">'+
          '<img class="paintCell--overlay--team" alt="no image" ng-src="{{paint.imgPath}}"/>'+
        '</div>'+
      '</div>';

      var overlayEl = angular.element(overlayHtml);

      $element.on('mouseenter', function(){
        if(!Game.lockBoard && self.cell === Game.TEAMS.EMPTY){
          self.imgPath = Game.IMAGES[self.game.team];
          $element.append($compile(overlayEl)($scope));
        }
      })

      $element.on('mouseleave', function(){
        if(!Game.lockBoard){
          overlayEl.remove();
        }
      })

    }

  }*/
}())