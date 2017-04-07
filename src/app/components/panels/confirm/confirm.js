;(function(){
  angular.module('triflix')
  .component('confirm', {
    bindings: {
      resolve: '<',
      modalInstance: '<'
    },
    templateUrl: 'app/components/panels/confirm/confirm.html',
    controller: confirmCtrl,
    controllerAs: 'confirm'
  });

  confirmCtrl.$inject = ['$scope', 'UserService'];

  function confirmCtrl($scope, UserService){
    var ctrl = this;
    var okCb = ctrl.resolve.okCb;
    ctrl.resolve.okCb = function(){
      ctrl.modalInstance.dismiss('cancel');
      okCb();
    }
  }
})();