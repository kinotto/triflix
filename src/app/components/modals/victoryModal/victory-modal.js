;(function(){
  angular.module('triflix')
  .component('victoryModal', {
    binding: {
      game: '<'
    },
    template: '<div>ciao</div>',
    controller: VictoryModalCtrl,
    controllerAs: 'victory'
  })

  VictoryModalCtrl.$inject = [];

  function VictoryModalCtrl(){
    var p = 'ciao';
  }
})
