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
      back: this.params.back.cb || function(){},
      forward: this.params.forward.cb || function(){}
    };
    //this.avatar = this.params.avatar.url || 'assets/images/fb-profile.gif';
    this.avatar = this.params.avatar && this.params.avatar.url;

    /*this.$postLink = function(){
      var mainEl = angular.element(main);
      if(this.params.avatar){
        back = forward = avatar = '<div class="col-xs-4"></div>';
      }

      if(this.params.back){
        var backEl = angular.element(back);
        var btn = angular.element('<div class="btn btn-warning col-xs-6"></div>');
        btn.attr('ng-click', 'header.params.back.cb()');
        btn.html(this.params.back.text);
        backEl.append(btn);
        mainEl.append(backEl);
      }
      if(this.params.avatar){
        var avatarEl = angular.element(avatar);
        avatarEl.addClass('text-center');
        var img = angular.element('<img class="img-rounded" width=64 height=32 />');
        img.attr('src', this.params.avatar.url);
        avatarEl.append(img);
        //avatarEl.html(this.params.avatar.url);
        mainEl.append(avatarEl);
      }
      if(this.params.forward){
        var forwardEl = angular.element(forward);
        var btn = angular.element('<div class="btn btn-warning col-xs-6 pull-right"></div>');
        btn.attr('ng-click', 'header.params.forward.cb()');
        btn.html(this.params.forward.text);
        forwardEl.append(btn);
        mainEl.append(forwardEl);
      }

      $element.append($compile(mainEl)($scope));


    }*/

  }

})();
