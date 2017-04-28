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

  profileCtrl.$inject = ['$scope', 'ScoreService', 'UserService'];

  function profileCtrl($scope, ScoreService, UserService){
    var self = this;
    self.user = self.user.data || self.user;
    ScoreService.get(self.user.facebook.id)
    .then(function(resp){
      self.scores = resp.data;
      return UserService.extUser(self.scores[0].player1);
      //risolvi con $q tutti gli utenti con cui ha fatto partite
      //oppure recupera questa informazione direttamente con una select su node
    })
    .then(function(resp){
      var p = resp;
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
