;(function(){
  angular.module('triflix')
  .directive('selectOption', ['GameSettings', function(GameSettings){
    /*paint the background of a selected option in the setting panel */
    var ddo = {
      scope: {
        option: '@selectOption',
        value: '=selectOptionValue'
      },
      link: function(scope, elem, attrs){
        if(GameSettings.getSettings()[scope.option] === scope.value)
          elem.addClass('settings__content__el__selected');

        elem.on('click', function(){
          var options = elem.siblings();
          options.removeClass('settings__content__el__selected');
          elem.addClass('settings__content__el__selected');
        })

      }
    }
    return ddo;
  }])

})();
