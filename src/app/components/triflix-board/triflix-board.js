(function(){
  angular.module('triflix')
  .component('triflixBoard', {
    bindings: {
      index: '@'
    },
    templateUrl: 'app/components/triflix-board/triflix-board.html',
    controller: triflixBoardCtrl,
    controllerAs: 'board'
  });

  triflixBoardCtrl.$inject = ['$element', '$compile', '$scope', 'Game'];

  function triflixBoardCtrl($element, $compile, $scope, Game){
    var game, previous;

    this.$onInit = function(){
      game = Game.getStatus()[this.index];
      this.game = game;
      previous = angular.copy(game);
    }
    this.$doCheck = function(){
      if(!_.isEqual(game.state, previous.state)){

      }
    }

    this.makeMove = function(x, y){
      if(game.state[x + (y*3)] === ''){
        game.state[x + (y*3)] = game.team;
        Game.AImove(game)
        .then(function(resp){
          _.extend(game.state, resp.data.state);
        }, function(err){
          console.log(err);
        });
      }
    }


    this.$postLink = function(){
      //var td_els = $element.find('td');
      //var tdWidth = td_els.first().width();
      //td_els.css('height', tdWidth);

      var overlayHtml =
      '<div class="triflixboard--overlay">'+
        '<div style="text-align: center; position: relative; width: 100%; height: 100%;">'+
          '<img class="triflixboard--overlay--locker" alt="no image" ng-src="assets/images/locker.png"/>'+
        '</div>'+
      '</div>';
      overlayHtml = angular.element(overlayHtml);

      var table =   $element.find('table').first();
      table.addClass('triflixboard--table');
      table.append($compile(overlayHtml)($scope));


      table.on('click', function(){
        overlayHtml.fadeOut("300", function(){})
      })

    }


  }
}())
