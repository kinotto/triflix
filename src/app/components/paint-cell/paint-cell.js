(function(){
  angular.module('triflix')
  .component('paintCell', {
    bindings: {
      cell: '<',
      game: '<'
    },
    controller: paintCellCtrl,
    controllerAs: 'paint'
  });

  paintCellCtrl.$inject = ['$element', '$compile', 'Game'];

  function paintCellCtrl($element, $compile, Game){

    var previousVal = this.cell;

    this.$doCheck = function(){
      if(this.cell !== previousVal){
        if(this.cell === Game.TEAMS.X){
          $element.css('background-image', 'url(\'assets/images/x.png\')');
        } else if(this.cell === Game.TEAMS.O){
          $element.css('background-image', 'url(\'assets/images/o.png\')');
        }

        previousVal = this.cell;
      }
    }



  }
}())
