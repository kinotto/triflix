;(function(){
  angular.module('triflix')
  .component('staticBoard', {
    bindings: {
      state: '<',
      locked: '@'
    },
    templateUrl: 'app/components/static-board/static-board.html',
    controller: staticBoardCtrl
  });

  staticBoardCtrl.$inject = [];


  function staticBoardCtrl(){
    var self = this;


  }

})();
