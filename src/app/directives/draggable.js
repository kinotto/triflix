;(function(){
  angular.module('triflix')
  .directive('draggable', [function(){
    var ddo = {
      link: function(scope, elem, attrs){
        elem.draggable({
          appendTo: "body",
          containment: "body"
        });
      }

    }
    return ddo;
  }])

})();
