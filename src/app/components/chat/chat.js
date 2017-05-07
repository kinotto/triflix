;(function(){
  angular.module('triflix')
  .component('chat', {
    bindings: {

    },
    templateUrl: 'app/components/chat/chat.html',
    controller: chatCtrl
  });

  chatCtrl.$inject = ['$element', '$scope', '$rootScope', '$timeout', '$document',
  'UserService', 'SocketService', 'MobileService'];


  function chatCtrl($element, $scope, $rootScope, $timeout, $document, UserService,
    SocketService, MobileService){
    var self = this;
    self.messages = [];
    //var isTouch = MobileService.isMobile();
    //var clickEvt = isTouch ? 'tap' : 'click'
    //var clickEvt = 'touchstart click';
    var clickEvt = 'click';
    SocketService.on('msg to user', function(data){
      $scope.$apply(function(){
        self.messages.push(data);
        if(self.chatOpened)
          self.lastMsgRead = true;
        else
          self.lastMsgRead = false;
      })
    })

    self.addMessage = function(e){
      var chatContainer = $element.find('.chat__container').first();
      self.user = UserService.getUser();
      var newMessage = {
        img: self.user.facebook.img,
        name: self.user.facebook.name,
        msg: self.message
      }
      self.messages.push(newMessage);
      e.preventDefault(); //impedisco all'invio di andare a capo
      //aspetto la fine di questo digest così si aggiorna il div
      //con la nuova altezza e posso scrollare fino in basso
      $timeout(function(){
        chatContainer[0].scrollTop = chatContainer[0].scrollHeight; //scrollo giù
      },0, false);
      SocketService.emit('msg to user', _.extend({
        socketTo: SocketService.getOpponent().opponentSocketId,
      }, newMessage))
      self.message = "";
    }

    self.$postLink = function(){
      var chatLogo = $element.find('.chat__logo').first();
      var chat = $element.find('.chat').first();
      var textArea = $element.find('.chat textarea').first();

      chat.on(clickEvt, function (e){
        /*if ($(this).is('.ui-draggable-dragging')){
          console.log('is dragging');
          return; // in drag mode l'elemento acquisisce da jqueryUI.js questa nuova classe
          //bisogna evitare una sovrapposizione tra click e drag
        }*/
        e.preventDefault();
        e.stopPropagation();
        if($rootScope.isDragging)
          return $scope.$apply(function(){self.chatOpened = false;});

        chat.data('draggable') && chat.draggable('disable');
        $scope.$apply(function(){
          var chatOpened = true;
          self.lastMsgRead = true;
          chat.removeClass('chat__closed').addClass('chat__opened')
          $timeout(function(){self.chatOpened = chatOpened}, 1000);
        })
      });


      $document.on(clickEvt, handlerDocClick);

      $scope.$on('$destroy', function(){
        $document.off('click', handlerDocClick);
      })

      function handlerDocClick(){
        chat.data('draggable') && chat.draggable('enable');
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
