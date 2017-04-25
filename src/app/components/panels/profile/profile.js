;(function(){
  angular.module('triflix')
  .component('profile', {
    bindings: {
      user: '<'
    },
    templateUrl: 'app/components/panels/profile/profile.html',
    controller: profileCtrl,
    controllerAs: 'profile'
  });

  profileCtrl.$inject = ['$scope'];

  function profileCtrl($scope){
    var self = this;


    this.params = {
      back: {
        text: 'Back',
        cb: function(){
          $scope.$parent.$close();
        }
      }
    };
  }
})();
