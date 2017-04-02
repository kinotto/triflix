;(function(){
  angular.module('triflix')
  .service('PanelService', ['$rootScope',
  function($rootScope){

    var panel = angular.element(document.getElementsByClassName("triflix-panel")[0]);;


    var validParams = function(params){
      if(!params) return false;
      return true;
    }
    this.open = function(params, scope){
      if(!validParams(params)) return;

      $rootScope.$emit('triflix.addpanel', params);


    }


  }])
})();
