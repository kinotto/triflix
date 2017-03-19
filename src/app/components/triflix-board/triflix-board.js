;(function(){
  angular.module('triflix')
  .component('triflixBoard', {
    bindings: {
      index: '@'
    },
    templateUrl: 'app/components/triflix-board/triflix-board.html',
    controller: triflixBoardCtrl,
    controllerAs: 'board'
  });

  triflixBoardCtrl.$inject = ['$element', '$compile', '$scope', 'Game',
  '$rootScope', '$uibModal'];

  function triflixBoardCtrl($element, $compile, $scope, Game, $rootScope, $uibModal){
    var game, previous, self = this;

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
      if(Game.lockBoard){
        return;
      }
      if(game.state[x + (y*3)] === ''){
        game.state[x + (y*3)] = game.team;
        Game.AImove(game)
        .then(function(resp){
          _.extend(game, resp.data);
          if(game.winner.team){
            $rootScope.$emit('triflix.game.victory');
            var victoryModal = $uibModal.open({
              animation: true,
              component: 'victoryModal',
              resolve: {
                game: [function(){
                  return self.game;
                }]
              }
            })
            victoryModal.result.catch(function(dismissed){
              Game.restart();
            })
          }

        }, function(err){
          console.log(err);
        });
      }
    }


    this.$postLink = function(){
      //var td_els = $element.find('td');
      //var tdWidth = td_els.first().width();
      //td_els.css('height', tdWidth);

      /*var overlayHtml =
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
      })*/
      var table =   $element.find('table').first();
      //table.addClass('triflixboard--table');

      var rows = table.children().first().children();
      for(var i = 0; i < rows.length; i++){
        if(i === 0){ //first row
          $(rows[i]).children().css('border-top', 'none');
        }
        if(i === rows.length - 1){ //last row
          $(rows[i]).children().css('border-bottom', 'none');
        }
        $(rows[i]).children().first().css('border-left', 'none');
        $(rows[i]).children().last().css('border-right', 'none');
      }
    }


  }
}())
