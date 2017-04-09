;(function(){
  angular.module('triflix')
  .component('panelContainer', {
    bindings: {
    },
    controller: panelContainerCtrl,
    controllerAs: 'panel'
  });

  panelContainerCtrl.$inject = ['$element', '$scope', '$rootScope', '$templateCache', '$compile',
   '$window', '$timeout'];

  function panelContainerCtrl($element, $scope, $rootScope, $templateCache, $compile,
    $window, $timeout){


      var width, height, leftPos;

      function initWindow(){
        width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

        height = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
      }
      initWindow();

      this.$onInit = function(){
        $element.css('position', 'absolute');
        $element.css('width', width);
        $element.css('height', height);
        $element.css('top', '0px');
        $element.css('left', -width + 'px');
      }

      var panels = [];
      $rootScope.$on('triflix.addpanel', function(evt, params){
        var elem = angular.element('<div></div>');
        elem.css('float', 'left');
        elem.css('width', width);
        elem.css('height', height);

        if(params.controller ){
          var ctrl = angular.element('<div></div>');
          ctrl.attr('ng-controller', params.controller);
          var template = $templateCache.get(params.templateUrl);
          ctrl.append(angular.element(template));
          elem.append(ctrl);
        }
        else if(params.component){
          var component = '<' + params.component + '></' + params.component + '>';
          elem.append(component);
        }

        var newScope = $rootScope.$new();
        newScope.prototype = params.scope;
        newScope.$close = function(){
          var index = panels.indexOf(panel);

          panels.splice(index, 1);
          panel.scope().$destroy();


          var leftPos = panels.length ? -width * (panels.length - 1) : 0;
          /*$element.animate({
            left: leftPos
          }, 1000, function(){
            $timeout(function(){
              panel.remove();
              $element.css('width', width * panels.length);
            }, 3000);
          });*/
          $element.css('left', leftPos);
          $timeout(function(){
            panel.remove();
            $element.css('width', width * panels.length);
          }, 1000);

        }
        var panel = $compile(elem)(newScope);
        panels.push(panel);

        $element.parent().css('position', 'relative');
        $element.parent().css('overflow-x', 'hidden');
        $element.parent().css('width', width);
        $element.parent().css('height', height);

        $element.css('width', width * panels.length);
        $element.append(panel);
        var leftPos = -width * (panels.length - 1);
        /*$element.animate({
          left: leftPos
        }, 1000);*/
        $element.css('left', leftPos);

      });

      this.$postLink = function(){
        angular.element($window).on('resize', recalculateSize);
      }

      function recalculateSize(){
        initWindow();
        panels.forEach(function(panel){
          panel.css('height', height);
          panel.css('width', width);
        })

        $element.css('height', height);
        $element.css('width', width * panels.length);
        $element.css('left', (- width * (panels.length - 1)));
        $element.parent().css('height', height);
        $element.parent().css('width', width);
      }
  }
})();
