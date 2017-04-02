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

    this.$postLink = function(){
      var mainEl = angular.element(main);
      if(this.params.avatar){
        back = forward = avatar = '<div class="col-xs-4"></div>';
      }

      if(this.params.back){
        var backEl = angular.element(back);
        backEl.attr('ng-click', 'header.params.back.cb()');
        backEl.html(this.params.back.text);
        mainEl.append(backEl);
      }
      if(this.params.avatar){
        var avatarEl = angular.element(avatar);
        avatarEl.addClass('text-center');
        avatarEl.html(this.params.avatar.text);
        mainEl.append(avatarEl);
      }
      if(this.params.forward){
        var forwardEl = angular.element(forward);
        forwardEl.addClass('text-right');
        forwardEl.html(this.params.forward.text);
        forwardEl.attr('ng-click', 'header.params.forward.cb()');
        mainEl.append(forwardEl);
      }

      $element.append($compile(mainEl)($scope));


    }

  }

})();
