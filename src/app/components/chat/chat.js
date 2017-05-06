;(function(){
  angular.module('triflix')
  .component('chat', {
    bindings: {

    },
    templateUrl: 'app/components/chat/chat.html',
    controller: chatCtrl
  });

  chatCtrl.$inject = ['$element', '$scope', '$timeout', '$document', 'UserService'];


  function chatCtrl($element, $scope, $timeout, $document, UserService){
    var self = this;
    self.messages = [];

    self.addMessage = function(e){
      var chatContainer = $element.find('.chat__container').first();
      self.user = UserService.getUser();
      self.messages.push({
        img: self.user.facebook.img,
        name: self.user.facebook.name,
        text: self.message
      })
      self.message = "";
      e.preventDefault(); //impedisco all'invio di andare a capo
      //aspetto la fine di questo digest così si aggiorna il div
      //con la nuova altezza e posso scrollare fino in basso
      $timeout(function(){
        chatContainer[0].scrollTop = chatContainer[0].scrollHeight; //scrollo giù
      },0, false);
    }

    self.$postLink = function(){
      var chatLogo = $element.find('.chat__logo').first();
      var chat = $element.find('.chat').first();
      var textArea = $element.find('.chat textarea').first();

      chat.on('click', function (e){
        $scope.$apply(function(){
          e.stopPropagation();
          var chatOpened = true;
          chat.removeClass('chat__closed').addClass('chat__opened')
          $timeout(function(){self.chatOpened = chatOpened}, 1000);
        })
      });


      $document.on('click', handlerDocClick);

      $scope.$on('$destroy', function(){
        $document.off('click', handlerDocClick);
      })

      function handlerDocClick(){
        $scope.$apply(function(){
          if(self.chatOpened){
            self.chatOpened = false;
            chat.removeClass('chat__opened').addClass('chat__closed');
          }
        })
      }
    }
  }

})();
