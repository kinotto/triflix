;(function(){
  angular.module('triflix')
  .directive('draggable', [function(){
    var ddo = {
      link: function(scope, elem, attrs){
        elem.draggable({
          appendTo: "body",
          helper: "clone",
          containment: "document",
          revert: 'invalid'
        });
      }

    }
    return ddo;
  }])

})();
