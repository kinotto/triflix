!function(){"use strict";angular.module("triflix",["ui.router","ui.bootstrap"]).constant("TEAMS",{X:"X",O:"O",EMPTY:""}).constant("ANIMATIONS",{X:"tada",O:"bounceIn"}).constant("LEVELS",{IMPOSSIBLE:{label:"Hard",errors:0},MEDIUM:{label:"Medium",errors:1},EASY:{label:"Easy",errors:2}}).constant("ApiPath",{game:{local:"http://127.0.0.1:8080/jerseybackend/rest/game",remote:"https://triflixbackend.herokuapp.com/rest/game"},login:{local:"http://localhost:3007/auth/facebook",remote:"https://triflixbe.herokuapp.com/auth/facebook"},getUser:{local:"http://127.0.0.1:3007/user",remote:"https://triflixbe.herokuapp.com/user"},multiplayer:{local:"http://localhost:3007",remote:"https://triflixbe.herokuapp.com"},score:{local:"http://localhost:3007/score",remote:"https://triflixbe.herokuapp.com/score"},getFBfriendsWithApp:{local:"http://localhost:3007/user/me/friends",remote:"https://triflixbe.herokuapp.com/user/me/friends"},inviteFriends:{local:"http://localhost:3007/user/invite-friend",remote:"https://triflixbe.herokuapp.com/user/invite-friend"}})}(),function(){function e(e,t,n,i){var a=this;a.teams=t,a.levels=n,a.applySetting=function(e,t){"team"===e&&i.setTeam(t),"level"===e&&i.setLevel(t)},a.params={back:{text:"Back",cb:function(){e.$parent.$close()}}}}angular.module("triflix").component("settings",{bindings:{},templateUrl:"app/components/panels/settings/settings.html",controller:e,controllerAs:"settings"}),e.$inject=["$scope","TEAMS","LEVELS","GameSettings"]}(),function(){function e(e,t,n,i){function a(e){for(var t=0;t<e.length;t++)e[t].player1.facebook&&e[t].player1.facebook.id!==o.user.facebook.id&&(e[t].opponent=e[t].player1),e[t].player2.facebook&&e[t].player2.facebook.id!==o.user.facebook.id&&(e[t].opponent=e[t].player2)}var o=this;o.user=o.user.data||o.user,t.get(o.user.facebook.id).then(function(e){o.scores=e.data,a(o.scores)}).then(function(e){})["catch"](function(e){console.log(e)}),this.params={back:{text:"Back",cb:function(){e.$parent.$close()}}},this.openGameStats=function(t){i.open({component:"game-stats",scope:e,resolve:{score:function(){return t}}})}}angular.module("triflix").component("profile",{bindings:{user:"<"},templateUrl:"app/components/panels/profile/profile.html",controller:e,controllerAs:"profile"}),e.$inject=["$scope","ScoreService","UserService","PanelService"]}(),function(){function e(e,t,n,i,a,o,s,a,r){function l(e,t,n){return _.each(t,function(t){var i=_.find(e,function(e){return e.data.facebook[n]===t.data.facebook[n]?e:void 0});i?_.extend(i,t):e.push(t)}),e}var c=this;c.user=n.getUser();var d=c.user;if(!d)return e.$parent.$close();if(!d.facebook)return e.$parent.$close();o.initSocket();var p=function(){a.open({component:"board",scope:e})};c.fbFriends=[];var m=function(e){return n.getFBfriendsWithApp(e).then(function(e){[].push.apply(c.fbFriends,e.data.data),e.data.paging&&e.data.paging.next&&m({nextPage:e.data.paging.next})},function(e){console.log(e)})};c.chooseOpponent=function(e){if(c.users){var t=o.getOpponentSocketFromValue(e,c.users);o.emit("choose opponent",{team:r.getSettings().team,opponentSocketId:t})}},m().then(function(){o.emit("add to room",{userId:d.facebook.id,data:d}),o.on("add to room",function(t){e.$apply(function(){c.users=t.users,c.usersOnline=_.map(t.users,function(e,t){return e.online=!0,e}),c.usersOnline=l(c.fbFriends,c.usersOnline,"id")})})}),o.on("challenge request",function(e){var t="Challenge request from "+e.opponent.data.facebook.name;i.open({animation:!0,component:"confirm",backdrop:"static",resolve:{text:[function(){return t}],okCb:[function(){return function(){o.emit("challenge accepted",{accepter:o.getSocketId(),challenger:e.opponentSocketId}),o.chooseOpponent(e),s.$emit("triflix.game.start"),p()}}]}})}),o.on("challenge accepted",function(e){o.chooseOpponent(e),s.$emit("triflix.game.start"),p()}),this.openProfile=function(t){a.open({component:"profile",scope:e,resolve:{user:function(){return t}}})},this.inviteFriend=function(e){n.invite({inviteFrom:c.user.facebook.id,inviteTo:e.data.facebook.id})},this.params={back:{text:"Back",cb:function(){o.removeOpponent(),e.$parent.$close()}}}}angular.module("triflix").component("multiplayer",{bindings:{},templateUrl:"app/components/panels/multiplayer/multiplayer.html",controller:e,controllerAs:"multiplayer"}),e.$inject=["$scope","ApiPath","UserService","$uibModal","PanelService","SocketService","$rootScope","PanelService","GameSettings"]}(),function(){function e(e,t,n,i,a,o,s){function r(e){var t=document.createElement("a");return t.click?(t.setAttribute("href",e),t.style.display="none",document.body.appendChild(t),void t.click()):void(window.location=e)}function l(){var e=window.RequestFileSystem||window.webkitRequestFileSystem;e?e(window.TEMPORARY,100,function(){c=!1},function(){c=!0,p("multiplayer")}):(console.log("check failed"),c=!1)}l();var c=!1;this.teams=a,this.animations=o;var d=function(t){i.open({component:t,scope:e})},p=function(e){t.user().then(function(t){this.user=t.data,e&&n(function(){d(e)},100)},function(e){console.log(e)})};p(""),this.continueNotLogged=function(){d("board")},this.loginWithFacebook=function(){window.localStorage.getItem("x-auth")?p("multiplayer"):m()},this.openSettings=function(){d("settings")};var m=function(){r(s.login.remote)}}angular.module("triflix").component("login",{bindings:{},templateUrl:"app/components/panels/login/login.html",controller:e,controllerAs:"login"}),e.$inject=["$scope","UserService","$timeout","PanelService","TEAMS","ANIMATIONS","ApiPath"]}(),function(){function e(e){this.params={back:{text:"Back",cb:function(){e.$parent.$close()}}}}angular.module("triflix").component("gameStats",{bindings:{score:"<"},templateUrl:"app/components/panels/game-stats/game-stats.html",controller:e}),e.$inject=["$scope"]}(),function(){function e(e,t,n,i,a){var o=i.getUser(),s=function(){a.$emit("triflix.game.change.settings"),t.$parent.$close()};this.params={back:{text:"Back",cb:s},avatar:{url:o?o.facebook.img||"":""}}}angular.module("triflix").component("board",{bindings:{},templateUrl:"app/components/panels/board/board.html",controller:e,controllerAs:"board"}),e.$inject=["PanelService","$scope","$timeout","UserService","$rootScope"]}(),function(){function e(e){var t=this;t.game=t.resolve.game,t.winner=t.game.winner,t.$postLink=function(){}}angular.module("triflix").component("victoryModal",{bindings:{resolve:"<"},templateUrl:"app/components/modals/victory/victory.html",controller:e,controllerAs:"$ctrl"}),e.$inject=["Game"]}(),function(){function e(e,t){var n=this,i=n.resolve.okCb;n.resolve.okCb=function(){n.modalInstance.dismiss("cancel"),i()},n.resolve.cancelCb=function(){n.modalInstance.dismiss("cancel")}}angular.module("triflix").component("confirm",{bindings:{resolve:"<",modalInstance:"<"},templateUrl:"app/components/modals/confirm/confirm.html",controller:e,controllerAs:"confirm"}),e.$inject=["$scope","UserService"]}(),function(){function e(e,t){var n=this;n.teams=t,n.choose=function(t){e.chooseTeam(t),n.modalInstance.close(t)},n.$postLink=function(){}}angular.module("triflix").component("chooseTeamModal",{bindings:{modalInstance:"<",resolve:"<"},templateUrl:"app/components/modals/choose-team/choose-team.html",controller:e,controllerAs:"chooseTeam"}),e.$inject=["Game","TEAMS"]}(),function(){angular.module("triflix").service("PanelService",["$rootScope",function(e){var t=(angular.element(document.getElementsByClassName("triflix-panel")[0]),function(e){return e?!0:!1});this.open=function(n,i){t(n)&&e.$emit("triflix.addpanel",n)}}])}(),function(){function e(e,t,n){this.handler={back:this.params.back&&this.params.back.cb||function(){},forward:this.params.forward&&this.params.forward.cb||function(){}},this.avatar=this.params.avatar&&this.params.avatar.url}angular.module("triflix").component("triflixHeader",{bindings:{params:"<"},templateUrl:"app/components/triflix-header/triflix-header.html",controller:e,controllerAs:"header"}),e.$inject=["$compile","$scope","$element"]}(),function(){function e(e,t,n,i,a,o,s,r,l){var c,d=this;this.$onInit=function(){d.userMove=!0,i.lockBoard=!0,i.reset(),c=i.getStatus(),this.game=c,r.getOpponent()&&(r.getOpponent().opponentTeam&&(this.game.team=r.getOpponent().opponentTeam===s.X?s.O:s.X),d.opponentName=r.getOpponent().opponent.data.facebook.name.split(" ")[0],i.lockBoard=!1,r.on("make move",function(e){n.$apply(function(){c.state[e]=c.team===s.X?s.O:s.X,d.userMove=!0,i.winner(c)&&(r.emit("winner or draw",{description:"test",player1:user.facebook.id,player2:r.getOpponent().opponent.data.facebook.id,teamPlayer1:c.team,teamPlayer2:r.getOpponent().opponentTeam,winner:c.winner.team===c.team?user.facebook.id:r.getOpponent().opponent.data.facebook.id,state:c.state}),p("victoryModal",function(e){i.reset(),a.$emit("triflix.game.start")}))})}),r.on("game aborted",function(){n.$parent.$parent.$close()}))},this.makeMove=function(e,t){var n=i.flatCoordinate(e,t);i.lockBoard||c.state[n]===s.EMPTY&&d.userMove&&(d.userMove=!1,c.state[n]=c.team,i.opponentMove(c,n).then(function(e){_.extend(c,e.data),r.getOpponent()||(d.userMove=!0),c.winner&&c.winner.team&&(a.$emit("triflix.game.victory"),p("victoryModal",function(e){i.reset(),a.$emit("triflix.game.start")}))})["catch"](function(e){"draw"===e.message?p("victoryModal",function(e){i.reset(),a.$emit("triflix.game.start"),d.userMove=!0}):console.log(e)}))},this.$postLink=function(){};var p=function(e,t){var n=o.open({animation:!0,component:e,resolve:{game:[function(){return d.game}]}});n.result["catch"](t)}}angular.module("triflix").component("triflixBoard",{bindings:{index:"@"},templateUrl:"app/components/triflix-board/triflix-board.html",controller:e,controllerAs:"board"}),e.$inject=["$element","$compile","$scope","Game","$rootScope","$uibModal","TEAMS","SocketService","ScoreService"]}(),function(){function e(){}angular.module("triflix").component("staticBoard",{bindings:{state:"<",locked:"@"},templateUrl:"app/components/static-board/static-board.html",controller:e}),e.$inject=[]}(),function(){function e(e,t,n,i,a,o,s,r){var l=this;l.messages=[];var c="click";s.on("msg to user",function(e){t.$apply(function(){l.messages.push(e),l.chatOpened?l.lastMsgRead=!0:l.lastMsgRead=!1})}),l.addMessage=function(t){var n=e.find(".chat__container").first();l.user=o.getUser();var a={img:l.user.facebook.img,name:l.user.facebook.name,msg:l.message};l.messages.push(a),t.preventDefault(),i(function(){n[0].scrollTop=n[0].scrollHeight},0,!1),s.emit("msg to user",_.extend({socketTo:s.getOpponent().opponentSocketId},a)),l.message=""},l.$postLink=function(){function o(){s.data("draggable")&&s.draggable("enable"),t.$apply(function(){l.chatOpened&&(l.chatOpened=!1,s.removeClass("chat__opened").addClass("chat__closed"))})}var s=(e.find(".chat__logo").first(),e.find(".chat").first());e.find(".chat textarea").first();s.on(c,function(e){return e.preventDefault(),e.stopPropagation(),n.isDragging?t.$apply(function(){l.chatOpened=!1}):(s.data("draggable")&&s.draggable("disable"),void t.$apply(function(){var e=!0;l.lastMsgRead=!0,s.removeClass("chat__closed").addClass("chat__opened"),i(function(){l.chatOpened=e},1e3)}))}),a.on(c,o),t.$on("$destroy",function(){a.off("click",o)})}}angular.module("triflix").component("chat",{bindings:{},templateUrl:"app/components/chat/chat.html",controller:e}),e.$inject=["$element","$scope","$rootScope","$timeout","$document","UserService","SocketService","MobileService"]}(),function(){function e(e,t,n,i,a,o,s){function r(){c=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,d=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}function l(){r(),p.forEach(function(e){e.css("height",d),e.css("width",c)}),e.css("height",d),e.css("width",c*p.length),e.css("left",-c*(p.length-1)),e.parent().css("height",d),e.parent().css("width",c)}var c,d;r(),this.$onInit=function(){e.css("position","absolute"),e.css("width",c),e.css("height",d),e.css("top","0px"),e.css("left",-c+"px")};var p=[];n.$on("triflix.addpanel",function(t,o){var r=n.$new(),l=angular.element("<div></div>");if(l.css("float","left"),l.css("width",c),l.css("height",d),o.controller){var m=angular.element("<div></div>");m.attr("ng-controller",o.controller);var u=i.get(o.templateUrl);m.append(angular.element(u)),l.append(m)}else if(o.component){var g="<"+o.component;if(o.resolve&&"object"==typeof o.resolve)for(var f in o.resolve)r["resolved"+f]=o.resolve[f](),g+=" "+f+'="resolved'+f+'"';g+="></"+o.component+">",l.append(g)}r.prototype=o.scope,r.$close=function(){var t=p.indexOf(v);p.splice(t,1),v.scope().$destroy();var n=p.length?-c*(p.length-1):0;e.css("left",n),s(function(){v.remove(),e.css("width",c*p.length)},500)};var v=a(l)(r);p.push(v),e.parent().css("position","relative"),e.parent().css("overflow-x","hidden"),e.parent().css("width",c),e.parent().css("height",d),e.css("width",c*p.length),e.append(v);var h=-c*(p.length-1);e.css("left",h)}),this.$postLink=function(){angular.element(o).on("resize",l)}}angular.module("triflix").component("panelContainer",{bindings:{},controller:e,controllerAs:"panel"}),e.$inject=["$element","$scope","$rootScope","$templateCache","$compile","$window","$timeout"]}(),function(){"use strict";function e(e,t,n,i){var a=this;n(function(){t.open({component:"login",scope:e})}),e.$watch(function(){return i.getOpponent()},function(e,t){e?a.showChat=!0:a.showChat=!1})}angular.module("triflix").controller("HomeController",e),e.$inject=["$scope","PanelService","$timeout","SocketService"]}(),function(){function e(e,t){var n={link:function(n,i,a){a.$observe("svgIcon",function(n){var o=e.getIcons()[n];if(o){o=angular.element(o),o.css("width",a.width?a.width+"px":"64px");var s=t[n.charAt(0)];o.attr("class","animated "+s),i.replaceWith(o)}})}};return n}function t(){var e={"X-icon":"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon fill='#DB9E36' fill-rule='nonzero' points='100 11.5399943 88.4595969 0 50.0001022 38.4599035 11.5404031 0 0 11.5399943 38.4596991 50.0001022 0 88.4595969 11.5406074 100 50.0001022 61.5403009 88.4595969 100 99.9997956 88.4595969 61.5403009 50.0001022'></polygon></svg>","O-icon":"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle stroke='#DC3522' stroke-width='14' fill='transparent' cx='50' cy='50' r='43' /></svg>"};this.getIcons=function(){return e}}angular.module("triflix").directive("svgIcon",e).service("svgIconService",t),e.$inject=["svgIconService","ANIMATIONS"],t.$inject=[]}(),function(){angular.module("triflix").directive("selectOption",["GameSettings",function(e){var t={scope:{option:"@selectOption",value:"=selectOptionValue"},link:function(t,n,i){_.isEqual(e.getSettings()[t.option],t.value)&&n.addClass("settings__content__el__selected"),n.on("click",function(){var e=n.siblings();e.removeClass("settings__content__el__selected"),n.addClass("settings__content__el__selected")})}};return t}])}(),function(){angular.module("triflix").directive("refreshBoard",["$rootScope","SocketService",function(e,t){var n={link:function(n,i,a){var o=e.$on("triflix.game.start",function(){i.children().removeClass("board__cell--selected board__cell--o board__cell--x"),angular.forEach(i.children(),function(e){$(e).find(".icon").remove()})});n.$on("$destroy",function(){o()}),t.getOpponent()&&e.$emit("triflix.game.start")}};return n}])}(),function(){angular.module("triflix").directive("paintCell",["Game","$compile","ANIMATIONS",function(e,t,n){var i={scope:{cell:"=paintCell",game:"="},link:function(e,i,a){var o=angular.element('<span class="icon animated {{iconEffect}}"></span>');e.$watch("cell",function(a){a&&(e.iconEffect=n[e.cell]||"bounceIn",i.removeClass("board__cell--x board__cell--o"),i.addClass("board__cell--selected board__cell--"+e.cell.toLowerCase()),i.append(t(o)(e)))})}};return i}])}(),function(){angular.module("triflix").directive("lockBoard",["$uibModal","Game","$rootScope","SocketService",function(e,t,n,i){var a={link:function(e,a,o){function s(e){a.off("click",s),t.lockBoard=!1,n.$emit("triflix.game.start")}i.getOpponent()||a.on("click",s)}};return a}])}(),function(){angular.module("triflix").directive("draggable",["$rootScope",function(e){var t={link:function(t,n,i){n.draggable({appendTo:"body",containment:"body",start:function(n,i){t.$apply(function(){e.isDragging=!0})},stop:function(n,i){t.$apply(function(){e.isDragging=!1})}})}};return t}])}(),function(){function e(e,t){var n;this.getUser=function(){return n},this.extUser=function(n){return e({method:"GET",url:t.getUser.remote,params:n})},this.getFBfriendsWithApp=function(n){return e({method:"GET",url:t.getFBfriendsWithApp.remote,params:n})},this.invite=function(n){return e({method:"GET",url:t.inviteFriends.remote,params:n})},this.user=function(i){return e({method:"GET",url:t.getUser.remote}).then(function(e){return e.data.error||(n=e.data),e},function(e){return e})}}angular.module("triflix").service("UserService",e),e.$inject=["$http","ApiPath"]}(),function(){angular.module("triflix").factory("TicTacToeWrapper",["LEVELS","TEAMS",function(e,t){function n(t){var n=new TicTacToe.TicTacToeBoard(t.state),a=new TicTacToe.TicTacToeAIPlayer,o=n.oppositePlayer(t.team);a.initialize(o,n);var s=n.winner();if(!s){if(!_.isEqual(t.level,e.IMPOSSIBLE)&&this.errors<t.level.errors){var r=i(t);n.board[r]=o,this.errors++}else{var l=a.makeMove();if(null==l)throw new Error("invalid move");n.makeMove(o,l)}s=n.winner()}return{data:{team:t.team,state:n.board,winner:{team:s?s.cell:"",indexes:s?s.indexes:[]}}}}function i(e){for(var n,i=!1;!i;)n=_.random(0,8),i=e.state[n]===t.EMPTY?!0:!1;return n}return function(){this.errors=0,this.makeMove=n,this.winner=function(e){var t=new TicTacToe.TicTacToeBoard(e.state),n=new TicTacToe.TicTacToeAIPlayer,i=t.oppositePlayer(e.team);return n.initialize(i,t),t.winner()}}}])}(),function(){function e(e,t){var n=e.score.remote;this.save=function(e){return t({url:n,method:"POST",data:e})},this.get=function(e){return t({url:n,method:"GET",params:{id:e}})}}angular.module("triflix").service("ScoreService",e),e.$inject=["ApiPath","$http"]}(),function(){function e(){var e=!1;(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))&&(e=!0),this.isMobile=function(){return e}}angular.module("triflix").service("MobileService",e),e.$inject=[]}(),function(){function e(e){return{request:function(e){var n=window.localStorage.getItem(t);return n&&(e.headers[t]=n),e},response:function(e){var n=e.headers()[t];return n&&window.localStorage.setItem(t,n),e},responseError:function(e){return e}}}angular.module("triflix").factory("httpInterceptor",e),e.$inject=["$location"];var t="x-auth"}(),function(){function e(e,t,n){function i(){localStorage.setItem("settings",angular.toJson(o))}function a(){var n=localStorage.getItem("settings");return n?angular.fromJson(n):{team:e.X,level:t.IMPOSSIBLE,sound:"off"}}var o=a();this.setTeam=function(t){o.team=e[t.toUpperCase()]||e.X,n.$emit("triflix.game.change.settings"),i()},this.setLevel=function(e){o.level=t[e.toUpperCase()]||t.IMPOSSIBLE,n.$emit("triflix.game.change.settings"),i()},this.getSettings=function(){return o}}angular.module("triflix").service("GameSettings",e),e.$inject=["TEAMS","LEVELS","$rootScope"]}(),function(){function e(e,t,n,i,a,o,s,r,l,c){var d,p=this;game={},game.team=i.getSettings().team,game.level=i.getSettings().level,game.state=["","","","","","","","",""],game.winner={},this.lockBoard=!0;var m=function(e){var t=s.defer();return a(function(){try{if(!p.hasEmptySlots(e.state))return t.reject(new Error("draw"));var n=d.makeMove(e);t.resolve(n)}catch(i){t.reject(i)}},800),t.promise},u=function(e,t){var n=p.hasEmptySlots(e.state);return p.winner(e),r.makeMove(e,t,n)};this.opponentMove=function(e,t){return r.getOpponent()?u(e,t):m(e)},this.reset=function(){game.state=["","","","","","","","",""],game.winner={},d=new c},this.flatCoordinate=function(e,t){return e+3*t},this.getStatus=function(){return game},this.hasEmptySlots=function(e){var n=_.find(e,function(e){return e===t.EMPTY});return void 0!==n?!0:!1},this.winner=function(e){return e.winner=d.winner(e),e.winner&&(e.winner.team=e.winner.cell,delete e.winner.cell),e.winner},l.$on("triflix.game.change.settings",function(e,t){game.team=i.getSettings().team,game.level=i.getSettings().level})}angular.module("triflix").service("Game",e),e.$inject=["$http","TEAMS","LEVELS","GameSettings","$timeout","ApiPath","$q","SocketService","$rootScope","TicTacToeWrapper"]}(),function(){function e(e,t,n,i,a){var o,s;this.initSocket=function(){return window.io?void(o||(o=io.connect(e.multiplayer.remote),this.on("disconnect",function(){o=null}))):console.log("socket.io not loaded")},this.emit=function(e,t){o.emit(e,t)},this.on=function(e,t){o.on(e,t)},this.getSocketId=function(){return o.id},this.chooseOpponent=function(e){s=e},this.removeOpponent=function(){s=null},this.getOpponentSocketFromValue=function(e,t){var n=-1;return _.mapObject(t,function(t,i){t.userId===e.userId&&(n=i)}),n},this.getOpponent=function(){return s},this.makeMove=function(e,t,i){var a=n.defer();return i||a.reject(new Error("draw")),o.emit("make move",{move:t,opponent:s}),a.resolve({data:e}),a.promise}}angular.module("triflix").service("SocketService",e),e.$inject=["ApiPath","$timeout","$q","TEAMS","$rootScope"]}(),function(){function e(e,t,n){n.defaults.withCredentials=!0,n.interceptors.push("httpInterceptor"),e.state("home",{url:"/",templateUrl:"app/home/home.html",controller:"HomeController as homeCtrl"}),t.otherwise("/")}angular.module("triflix").config(e),e.$inject=["$stateProvider","$urlRouterProvider","$httpProvider"]}(),angular.module("triflix").run(["$templateCache",function(e){e.put("app/home/home.html",'<div class=panelParent><panel-container class=panel-container></panel-container></div><chat ng-if=homeCtrl.showChat></chat><!--\n\n<svg xmlns="http://www.w3.org/2000/svg" style="display: none">\n\n  <symbol id="o" viewBox="0 0 100 100">\n    <circle cx="50" cy="50" r="43" />\n  </symbol>\n\n  <symbol id="x" viewbox="0 0 100 100">\n    <polygon fill-rule="nonzero" points="100 11.5399943 88.4595969 0 50.0001022 38.4599035 11.5404031 0 0 11.5399943 38.4596991 50.0001022 0 88.4595969 11.5406074 100 50.0001022 61.5403009 88.4595969 100 99.9997956 88.4595969 61.5403009 50.0001022"></polygon>\n  </symbol>\n\n</svg>\n\n-->'),e.put("app/components/chat/chat.html",'<div class=chat><div style="position: relative; width: 100%; height: 100%"><img ng-show=!$ctrl.chatOpened class=chat__logo ng-src=assets/images/chat.png alt="no img"> <img ng-if="$ctrl.lastMsgRead === false" ng-src=assets/images/one-message.png class=chat__toread alt="no img"><div ng-if=$ctrl.chatOpened style="text-align: center; color: grey">Today</div><div ng-if=$ctrl.chatOpened class=chat__container><div ng-repeat="message in $ctrl.messages" style="overflow: auto;\n        margin-bottom: 10px" ng-style="$first && {\'margin-top\': \'10px\'}"><div class=chat__col2><img class=chat__userImg ng-src={{message.img}} width=32 alt="no img"></div><div class=chat__col10><span class=chat__username>{{message.name}}</span> <span class=chat__message>{{message.msg}}</span></div></div></div><div class=chat__textarea ng-if=$ctrl.chatOpened><textarea ng-keydown="$event.keyCode === 13 && $ctrl.message && $ctrl.addMessage($event)" ng-model=$ctrl.message placeholder=Message..></textarea></div></div></div>'),e.put("app/components/static-board/static-board.html","<div><div class=board><div paint-cell=$ctrl.state[0] game=$ctrl.state class=board__cell></div><div paint-cell=$ctrl.state[3] game=$ctrl.state class=board__cell></div><div paint-cell=$ctrl.state[6] game=$ctrl.state class=board__cell></div><div paint-cell=$ctrl.state[1] game=$ctrl.state class=board__cell></div><div paint-cell=$ctrl.state[4] game=$ctrl.state class=board__cell></div><div paint-cell=$ctrl.state[7] game=$ctrl.state class=board__cell></div><div paint-cell=$ctrl.state[2] game=$ctrl.state class=board__cell></div><div paint-cell=$ctrl.state[5] game=$ctrl.state class=board__cell></div><div paint-cell=$ctrl.state[8] game=$ctrl.state class=board__cell></div><div ng-if=$ctrl.locked class=board__overlay></div></div></div>"),e.put("app/components/triflix-board/triflix-board.html",'<div class=col-sm-12><div class=header><h1>TicTacToe</h1><p ng-if=board.userMove>It\'s <b>your</b> turn</p><p ng-if="!board.userMove && !board.opponentName"><b>AI</b> turn</p><p ng-if="!board.userMove && board.opponentName"><b>{{board.opponentName}}</b> turn</p><!--<p>Cras ultricies ligula sed magna dictum porta.</p>--></div></div><div lock-board><div class=board refresh-board><div ng-click=board.makeMove(0,0) paint-cell=board.game.state[0] game=board.game class="board__cell board__cell--selected board__cell--o"><span class="icon animated bounceIn"></span></div><div ng-click=board.makeMove(0,1) paint-cell=board.game.state[3] game=board.game class=board__cell></div><div ng-click=board.makeMove(0,2) paint-cell=board.game.state[6] game=board.game class="board__cell board__cell--selected board__cell--x"><span class="icon animated tada"></span></div><div ng-click=board.makeMove(1,0) paint-cell=board.game.state[1] game=board.game class=board__cell></div><div ng-click=board.makeMove(1,1) paint-cell=board.game.state[4] game=board.game class=board__cell></div><div ng-click=board.makeMove(1,2) paint-cell=board.game.state[7] game=board.game class=board__cell></div><div ng-click=board.makeMove(2,0) paint-cell=board.game.state[2] game=board.game class=board__cell></div><div ng-click=board.makeMove(2,1) paint-cell=board.game.state[5] game=board.game class=board__cell></div><div ng-click=board.makeMove(2,2) paint-cell=board.game.state[8] game=board.game class=board__cell></div></div></div>'),e.put("app/components/triflix-header/triflix-header.html",'<div class="col-sm-12 triflix-header"><div class="col-xs-4 triflix-header--button" ng-click=header.handler.back() ng-show=header.params.back><i class="fa fa-arrow-left" aria-hidden=true></i> <span>Back</span></div><div class="col-xs-4 text-center"><img ng-show=header.avatar ng-src={{header.avatar}} width=32 height=24 class=img-circle alt="no img"></div><div class="col-xs-4 triflix-header--button" ng-click=header.handler.forward() ng-show=header.params.forward><div class=pull-right><i class="fa fa-arrow-right" aria-hidden=true></i> <span>Forward</span></div></div></div>'),e.put("app/components/modals/choose-team/choose-team.html",'<div class=triflix-modal><div class=triflix-modal--header><h3 class=triflix-modal--title>Choose a team</h3></div><div class=triflix-modal--body><div ng-repeat="team in chooseTeam.teams" ng-click=chooseTeam.choose(team) style=display:inline><span svg-icon={{team}}-icon width=64></span></div></div></div>'),e.put("app/components/modals/confirm/confirm.html",'<div class=triflix-modal><div class=triflix-modal--header><h3 class=triflix-modal--title style="text-align: center">{{confirm.resolve.text}}</h3></div><div class=triflix-modal--body><button style="width: 25%" class="btn btn-success" ng-click=confirm.resolve.okCb()>Join</button> <button style="width: 25%" class="btn btn-danger" ng-click=confirm.resolve.cancelCb()>Leave</button></div></div>'),e.put("app/components/modals/victory/victory.html",'<div class=triflix-modal><div class=triflix-modal--header><h3 ng-if=$ctrl.winner.team class=triflix-modal--title>We have a winner</h3><h3 ng-if=!$ctrl.winner.team class=triflix-modal--title>Draw :(</h3></div><div ng-if=$ctrl.winner.team class=triflix-modal--body>Player <span svg-icon={{$ctrl.winner.team}}-icon width=32></span> win the game</div><div ng-if=!$ctrl.winner.team class=triflix-modal--body>Play again!</div></div><!--<div class="modal-header">\n    <h3 class="modal-title" id="modal-title">I\'m a modal!</h3>\n</div>\n<div class="modal-body" id="modal-body">\n    <ul>\n        <li ng-repeat="item in $ctrl.items">\n            <a href="#" ng-click="$event.preventDefault(); $ctrl.selected.item = item">{{ item }}</a>\n        </li>\n    </ul>\n    Selected: <b>{{ $ctrl.selected.item }}</b>\n</div>\n<div class="modal-footer">\n    <button class="btn btn-primary" type="button" ng-click="$ctrl.ok()">OK</button>\n    <button class="btn btn-warning" type="button" ng-click="$ctrl.cancel()">Cancel</button>\n</div>-->'),e.put("app/components/panels/board/board.html","<triflix-header params=board.params ng-if=board.params></triflix-header><triflix-board class=col-sm-12 index=0></triflix-board>"),e.put("app/components/panels/game-stats/game-stats.html",'<triflix-header params=$ctrl.params></triflix-header><div class="container stats"><div class=row><div class=col-xs-12><h1 class=stats__title>Game stats</h1></div></div><table class="table table-inverse"><thead><tr><th>#</th><th>Player</th><th>Team</th></tr></thead><tbody><tr><th scope=row><img ng-src={{$ctrl.score.player1.facebook.img}} class=stats__img alt=""></th><td>{{$ctrl.score.player1.facebook.name}}</td><td>{{$ctrl.score.teamPlayer1}}</td></tr><tr><th scope=row><img ng-src={{$ctrl.score.player2.facebook.img}} class=stats__img alt=""></th><td>{{$ctrl.score.player2.facebook.name}}</td><td>{{$ctrl.score.teamPlayer2}}</td></tr></tbody></table><static-board state=$ctrl.score.state locked=true></static-board></div>'),e.put("app/components/panels/login/login.html",'<div class="container login"><div class=row><div class="col-xs-8 col-xs-offset-2 col-sm-4 col-sm-offset-4 text-center"><div ng-repeat="team in login.teams" style="display: inline"><span svg-icon={{team}}-icon width=64></span></div></div></div><div class=row style="margin-top: 30px"><div class="col-xs-8 col-xs-offset-2 col-sm-4 col-sm-offset-4 text-center login--button login--button--local" ng-click=login.continueNotLogged()>Local game</div></div><div class=row><div class="col-xs-8 col-xs-offset-2 col-sm-4 col-sm-offset-4 text-center login--button login--button--facebook" ng-click=login.loginWithFacebook()>Multiplayer game <a class="btn btn-social-icon btn-facebook" style="height: 32px"><span class="fa fa-facebook"></span></a></div></div><!--<div class="row">\n    <div class="col-xs-8 col-xs-offset-2 col-sm-4 col-sm-offset-4 text-center login--button\n      login--button--realtime">\n      realtime game\n    </div>\n  </div>--><div class=row><div class="col-xs-8 col-xs-offset-2 col-sm-4 col-sm-offset-4 text-center login--button login--button--settings" ng-click=login.openSettings()>settings</div></div></div><!--\nhttp://localhost:3002/auth/facebook\nhttps://triflixbe.herokuapp.com/auth/facebook\n-->'),
e.put("app/components/panels/multiplayer/multiplayer.html",'<triflix-header params=multiplayer.params></triflix-header><div class="container multiplayer"><div class=row><div class=col-sm-12><h1>Multiplayer</h1></div></div><div class=row><div class="col-sm-6 multiplayer--box" ng-repeat="user in multiplayer.usersOnline\n    track by $index"><div class=card ng-init="inviteSent = false"><img ng-click=multiplayer.openProfile(user) ng-src={{user.data.facebook.img}} alt="no img" class=card__img> <span class=card__name>{{user.data.facebook.name}}</span> <span class="circle animated infinite pulse" ng-class="{\'offline\' : !user.online, \'online\': user.online}" style="width: 15px; height: 15px"></span> <img ng-if=user.fbFriend class=card__fbFriends ng-src=assets/images/fbfriends.jpg alt="no img"> <button ng-show="!inviteSent && user.online" ng-click="multiplayer.chooseOpponent(user); inviteSent = true" class=card__cta ng-disabled="user.data.facebook.id === multiplayer.user.facebook.id">Invite</button> <button ng-show="!inviteSent && !user.online" ng-click="multiplayer.inviteFriend(user); inviteSent = true" class=card__cta ng-disabled="user.data.facebook.id === multiplayer.user.facebook.id">Invite</button> <button ng-show=inviteSent ng-disabled=inviteSent class=card__cta>Invite<br>sent</button><!--<div class="overlay">\n          <span class="circle animated infinite pulse"\n            ng-class="{\'offline\' : !user.online, \'online\': user.online}"></span>\n        </div>--></div></div></div></div>'),e.put("app/components/panels/profile/profile.html",'<triflix-header params=profile.params></triflix-header><div class="container profile"><div class=row><div class=col-xs-12><h1 class=profile__title>Profile info <i class="fa fa-user-circle" aria-hidden=true></i></h1></div></div><div class=row><div class=col-xs-6><img class=profile__img ng-src={{profile.user.facebook.img}} alt="no img"></div><div class=col-xs-6><div class="profile__info pull-right"><div class=row><div class=col-xs-12><span class=profile__info__name>{{profile.user.facebook.name}}</span></div></div><div class=row><div class=col-xs-12><span class=profile__info__member>Member since</span></div></div><div class=row><div class=col-xs-12><span class=profile__info__createdAt>{{profile.user.createdAt | date: \'yyyy-MM-dd\'}}</span></div></div><div class=row><div class=col-xs-12><span class=profile__info__badgetitle>Badges</span></div></div><div class=row><div class=col-xs-12><img class=profile__info__badge ng-src=https://cdn0.iconfinder.com/data/icons/customicondesign-office7-shadow-png/256/Metal-gold-blue.png width=64 alt=""></div></div></div></div></div><div class=stats><div class=row><div class=col-xs-12><h1 class="profile__title profile__title__gamestats">Game stats</h1></div></div><div class=row ng-repeat="score in profile.scores" ng-if=score.opponent><div class=stats__container><div class=col-xs-4><img class=stats__opponenentImg ng-src={{score.opponent.facebook.img}} alt="no img"></div><div class=col-xs-4><span class="stats__text col-xs-12 text-center">vs {{score.opponent.facebook.name}}</span></div><div class=col-xs-4 ng-click=profile.openGameStats(score)><img class="stats__forwardImg pull-right" ng-src=assets/images/forward.png alt="no img"></div></div></div></div></div>'),e.put("app/components/panels/settings/settings.html",'<triflix-header params=settings.params></triflix-header><div class="container settings"><div class=row><div class=col-sm-12><h1>Settings <i class="fa fa-gamepad" aria-hidden=true></i></h1></div></div><div class="row settings__bordered"><div class=col-xs-2><div class=settings__head>Team</div></div><div class=col-xs-10><div class="settings__content pull-right"><div class=settings__content__el select-option=team select-option-value=TEAM ng-repeat="TEAM in settings.teams" ng-if="TEAM !== \'\'" ng-click="settings.applySetting(\'team\', TEAM)"><span svg-icon={{TEAM}}-icon width=64></span></div></div></div></div><div class="row settings__bordered"><div class=col-xs-2><div class=settings__head>Level</div></div><div class=col-xs-10><div class="settings__content pull-right"><div class=settings__content__el select-option=level select-option-value=LEVEL ng-repeat="(key, LEVEL) in settings.levels" ng-click="settings.applySetting(\'level\', key)"><span>{{LEVEL.label}}</span></div></div></div></div><div class="row settings__bordered"><div class=col-xs-2><div class=settings__head>Sound</div></div><div class=col-xs-10><div class="settings__content pull-right"><div class=settings__content__el select-option=sound select-option-value=SOUND ng-repeat="SOUND in [\'on\', \'off\']" ng-click="settings.applySetting(\'sound\', SOUND)"><span>{{SOUND}}</span></div></div></div></div></div>')}]);
//# sourceMappingURL=../maps/scripts/app-f931f4d12d.js.map