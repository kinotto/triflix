;(function(){
  angular.module('triflix')
  .component('triflixHeader', {
    bindings: {
      params: '<'
    },
    templateUrl: 'app/components/triflix-header/triflix-header.html',
    controller: headerCtrl,
    controllerAs: 'header'
  });

  headerCtrl.$inject = ['$compile', '$scope', '$element'];
  var main = '<div class="col-xs-12"></div>';
  var back = '<div class="col-xs-3"></div>';
  var forward = '<div class="col-xs-3 col-xs-offset-6"></div>';
  var avatar;

  function headerCtrl($compile, $scope, $element){

    this.handler = {
      back: this.params.back && this.params.back.cb || function(){},
      forward: this.params.forward && this.params.forward.cb || function(){}
    };
    //this.avatar = this.params.avatar.url || 'assets/images/fb-profile.gif';
    this.avatar = this.params.avatar && this.params.avatar.url;



  }

})();
