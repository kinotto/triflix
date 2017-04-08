;(function(){
  angular.module('triflix')
  .directive('svgIcon', svgIconDirective)
  .service('svgIconService', svgIconService);

  svgIconDirective.$inject = ['svgIconService', 'ANIMATIONS'];
  svgIconService.$inject = [];


  function svgIconDirective(svgIconService, ANIMATIONS){
    var ddo = {
      link: function(scope, elem, attrs){
        attrs.$observe('svgIcon', function(icon){
          var svg = svgIconService.getIcons()[icon];
          if(svg){
            svg = angular.element(svg);
            svg.css('width', attrs.width ? attrs.width + 'px' : '64px');
            var animation = ANIMATIONS[icon.charAt(0)];
            svg.attr('class','animated '+animation);
            elem.replaceWith(svg);
          }
        })
      }
    }
    return ddo;
  }

  function svgIconService(){
    var ICONS = {
      'X-icon': "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon fill='#DB9E36' fill-rule='nonzero' points='100 11.5399943 88.4595969 0 50.0001022 38.4599035 11.5404031 0 0 11.5399943 38.4596991 50.0001022 0 88.4595969 11.5406074 100 50.0001022 61.5403009 88.4595969 100 99.9997956 88.4595969 61.5403009 50.0001022'></polygon></svg>",
      'O-icon': "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle stroke='#DC3522' stroke-width='14' fill='transparent' cx='50' cy='50' r='43' /></svg>"
    }
    this.getIcons = function(){
      return ICONS;
    }
  }

})();
