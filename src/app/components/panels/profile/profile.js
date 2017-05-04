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

  profileCtrl.$inject = ['$scope', 'ScoreService', 'UserService', 'PanelService'];

  function profileCtrl($scope, ScoreService, UserService, PanelService){
    var self = this;
    self.user = self.user.data || self.user;
    ScoreService.get(self.user.facebook.id)
    .then(function(resp){
      self.scores = resp.data;
      extractOpponents(self.scores);
      //return UserService.extUser(self.scores[0].player1);
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

    this.openGameStats = function(score){
      PanelService.open({
        component: 'game-stats',
        scope: $scope,
        resolve: {
          score: function(){
            return score;
          }
        }
      });
    }

    function extractOpponents(scores){
      for(var i = 0; i < scores.length; i++){
        if(scores[i].player1.facebook && scores[i].player1.facebook.id !== self.user.facebook.id)
          scores[i].opponent = scores[i].player1;
        if(scores[i].player2.facebook && scores[i].player2.facebook.id !== self.user.facebook.id)
          scores[i].opponent = scores[i].player2;
      }
    }
  }
})();
