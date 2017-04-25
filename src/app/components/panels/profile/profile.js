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

  profileCtrl.$inject = ['$scope', 'ScoreService'];

  function profileCtrl($scope, ScoreService){
    var self = this;
    ScoreService.get(self.user.data.facebook.id)
    .then(function(resp){
      self.scores = resp.data;
    })
    .catch(function(err){
      console.log(err);
    })

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
