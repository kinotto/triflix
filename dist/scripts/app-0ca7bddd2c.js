!function(){"use strict";angular.module("triflix",["ui.router","ui.bootstrap"]).constant("TEAMS",{X:"X",O:"O",EMPTY:""}).constant("ANIMATIONS",{X:"tada",O:"bounceIn"}).constant("ApiPath",{game:{local:"http://127.0.0.1:8080/jerseybackend/rest/game",remote:"https://triflixbackend.herokuapp.com/rest/game"},login:{local:"http://localhost:3002/auth/facebook",remote:"https://triflixbe.herokuapp.com/auth/facebook"},getUser:{local:"http://127.0.0.1:3002/user",remote:"https://triflixbe.herokuapp.com/user"},multiplayer:{local:"http://localhost:3002",remote:"https://triflixbe.herokuapp.com"}}).constant("TABLE_NR",2)}(),function(){function e(e){var t=this;t.game=t.resolve.game,t.winnerTeam=t.game.winner.team,t.$postLink=function(){}}angular.module("triflix").component("victoryModal",{bindings:{resolve:"<"},templateUrl:"app/components/panels/victory/victory.html",controller:e,controllerAs:"$ctrl"}),e.$inject=["Game"]}(),function(){function e(e,t,o,n,a,i,r,a){var l=o.getUser();if(!l)return e.$parent.$close();if(!l.facebook)return e.$parent.$close();var c=this;i.initSocket();var s=function(){a.open({component:"board",scope:e})};c.chooseOpponent=function(e){if(c.users){var t=i.getOpponentSocketFromValue(e,c.users);i.emit("choose opponent",t)}},i.emit("add to room",{userId:l.facebook.id,name:l.facebook.name}),i.on("add to room",function(t){e.$apply(function(){c.users=t.users,c.usersOnline=_.map(t.users,function(e,t){return e})})}),i.on("challenge request",function(e){var t="Challenge request from "+e.opponent.name;n.open({animation:!0,component:"confirm",backdrop:"static",resolve:{text:[function(){return t}],okCb:[function(){return function(){i.emit("challenge accepted",{accepter:i.getSocketId(),challenger:e.opponentSocketId}),i.chooseOpponent(e),r.$emit("triflix.game.start"),s()}}]}})}),i.on("challenge accepted",function(e){i.chooseOpponent(e),r.$emit("triflix.game.start"),s()}),this.params={back:{text:"Back",cb:function(){e.$parent.$close()}}}}angular.module("triflix").component("multiplayer",{bindings:{},templateUrl:"app/components/panels/multiplayer/multiplayer.html",controller:e,controllerAs:"multiplayer"}),e.$inject=["$scope","ApiPath","UserService","$uibModal","PanelService","SocketService","$rootScope","PanelService"]}(),function(){function e(e,t,o,n,a,i,r){function l(e){var t=document.createElement("a");return t.click?(t.setAttribute("href",e),t.style.display="none",document.body.appendChild(t),t.click(),void console.log("click created")):void(window.location=e)}this.teams=a,this.animations=i;var c=function(t){n.open({component:t,scope:e})},s=function(e){t.user().then(function(t){this.user=t.data,e&&o(function(){c(e)},100)},function(e){console.log(e)})};s(),this.continueNotLogged=function(){c("board")},this.loginWithFacebook=function(){window.localStorage.getItem("x-auth")?s("multiplayer"):d()};var d=function(){l(r.login.remote)}}angular.module("triflix").component("login",{bindings:{},templateUrl:"app/components/panels/login/login.html",controller:e,controllerAs:"login"}),e.$inject=["$scope","UserService","$timeout","PanelService","TEAMS","ANIMATIONS","ApiPath"]}(),function(){function e(e,t){var o=this,n=o.resolve.okCb;o.resolve.okCb=function(){o.modalInstance.dismiss("cancel"),n()}}angular.module("triflix").component("confirm",{bindings:{resolve:"<",modalInstance:"<"},templateUrl:"app/components/panels/confirm/confirm.html",controller:e,controllerAs:"confirm"}),e.$inject=["$scope","UserService"]}(),function(){function e(e,t){var o=this;o.teams=t,o.choose=function(t){e.chooseTeam(t),o.modalInstance.close(t)},o.$postLink=function(){}}angular.module("triflix").component("chooseTeamModal",{bindings:{modalInstance:"<",resolve:"<"},templateUrl:"app/components/panels/choose-team/choose-team.html",controller:e,controllerAs:"chooseTeam"}),e.$inject=["Game","TEAMS"]}(),function(){function e(e,t,o,n){var a=n.getUser(),i=function(){t.$parent.$close()};this.params={back:{text:"Back",cb:i},avatar:{url:a?a.facebook.img||"":""}}}angular.module("triflix").component("board",{bindings:{},templateUrl:"app/components/panels/board/board.html",controller:e,controllerAs:"board"}),e.$inject=["PanelService","$scope","$timeout","UserService"]}(),function(){angular.module("triflix").service("PanelService",["$rootScope",function(e){var t=(angular.element(document.getElementsByClassName("triflix-panel")[0]),function(e){return e?!0:!1});this.open=function(o,n){t(o)&&e.$emit("triflix.addpanel",o)}}])}(),function(){function e(e,t,o){this.handler={back:this.params.back&&this.params.back.cb||function(){},forward:this.params.forward&&this.params.forward.cb||function(){}},this.avatar=this.params.avatar&&this.params.avatar.url}angular.module("triflix").component("triflixHeader",{bindings:{params:"<"},templateUrl:"app/components/triflix-header/triflix-header.html",controller:e,controllerAs:"header"}),e.$inject=["$compile","$scope","$element"]}(),function(){function e(e,t,o,n,a,i,r,l){var c,s,d=this;this.$onInit=function(){c=n.getStatus()[this.index],this.game=c,s=angular.copy(c),l.getOpponent()&&l.on("make move",function(e){o.$apply(function(){c.state[e]=c.team===r.X?r.O:r.X})})},this.$doCheck=function(){!_.isEqual(c.state,s.state)},this.makeMove=function(e,t){var o=n.flatCoordinate(e,t);n.lockBoard||c.state[o]===r.EMPTY&&(c.state[o]=c.team,n.opponentMove(c,o).then(function(e){if(_.extend(c,e.data),c.winner.team){a.$emit("triflix.game.victory");var t=i.open({animation:!0,component:"victoryModal",resolve:{game:[function(){return d.game}]}});t.result["catch"](function(e){n.restart(),a.$emit("triflix.game.start")})}})["catch"](function(e){console.log(e)}))},this.$postLink=function(){}}angular.module("triflix").component("triflixBoard",{bindings:{index:"@"},templateUrl:"app/components/triflix-board/triflix-board.html",controller:e,controllerAs:"board"}),e.$inject=["$element","$compile","$scope","Game","$rootScope","$uibModal","TEAMS","SocketService"]}(),function(){function e(e,t,o,n,a,i,r){function l(){s=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,d=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}function c(){l(),m.forEach(function(e){e.css("height",d),e.css("width",s)}),e.css("height",d),e.css("width",s*m.length),e.css("left",-s*(m.length-1)),e.parent().css("height",d),e.parent().css("width",s)}var s,d;l(),this.$onInit=function(){e.css("position","absolute"),e.css("width",s),e.css("height",d),e.css("top","0px"),e.css("left",-s+"px")};var m=[];o.$on("triflix.addpanel",function(t,i){var l=angular.element("<div></div>");if(l.css("float","left"),l.css("width",s),l.css("height",d),i.controller){var c=angular.element("<div></div>");c.attr("ng-controller",i.controller);var p=n.get(i.templateUrl);c.append(angular.element(p)),l.append(c)}else if(i.component){var u="<"+i.component+"></"+i.component+">";l.append(u)}var f=o.$new();f.prototype=i.scope,f.$close=function(){var t=m.indexOf(h);m.splice(t,1),h.scope().$destroy();var o=m.length?-s*(m.length-1):0;e.css("left",o),r(function(){h.remove(),e.css("width",s*m.length)},1e3)};var h=a(l)(f);m.push(h),e.parent().css("position","relative"),e.parent().css("overflow-x","hidden"),e.parent().css("width",s),e.parent().css("height",d),e.css("width",s*m.length),e.append(h);var v=-s*(m.length-1);e.css("left",v)}),this.$postLink=function(){angular.element(i).on("resize",c)}}angular.module("triflix").component("panelContainer",{bindings:{},controller:e,controllerAs:"panel"}),e.$inject=["$element","$scope","$rootScope","$templateCache","$compile","$window","$timeout"]}(),function(){"use strict";function e(e,t,o){o(function(){t.open({component:"login",scope:e})})}angular.module("triflix").controller("HomeController",e),e.$inject=["$scope","PanelService","$timeout"]}(),function(){function e(e,t){var o={link:function(o,n,a){a.$observe("svgIcon",function(o){var i=e.getIcons()[o];if(i){i=angular.element(i),i.css("width",a.width?a.width+"px":"64px");var r=t[o.charAt(0)];i.attr("class","animated "+r),n.replaceWith(i)}})}};return o}function t(){var e={"X-icon":"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon fill='#DB9E36' fill-rule='nonzero' points='100 11.5399943 88.4595969 0 50.0001022 38.4599035 11.5404031 0 0 11.5399943 38.4596991 50.0001022 0 88.4595969 11.5406074 100 50.0001022 61.5403009 88.4595969 100 99.9997956 88.4595969 61.5403009 50.0001022'></polygon></svg>","O-icon":"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle stroke='#DC3522' stroke-width='14' fill='transparent' cx='50' cy='50' r='43' /></svg>"};this.getIcons=function(){return e}}angular.module("triflix").directive("svgIcon",e).service("svgIconService",t),e.$inject=["svgIconService","ANIMATIONS"],t.$inject=[]}(),function(){angular.module("triflix").directive("refreshBoard",["$rootScope",function(e){var t={link:function(t,o,n){var a=e.$on("triflix.game.start",function(){o.children().removeClass("board__cell--selected board__cell--o board__cell--x"),angular.forEach(o.children(),function(e){$(e).find(".icon").remove()})});t.$on("$destroy",function(){a()})}};return t}])}(),function(){angular.module("triflix").directive("paintCell",["Game","$compile","ANIMATIONS",function(e,t,o){var n={scope:{cell:"=paintCell",game:"="},link:function(e,n,a){var i=angular.element('<span class="icon animated {{iconEffect}}"></span>');e.$watch("cell",function(a){a&&(e.iconEffect=o[e.cell]||"bounceIn",n.removeClass("board__cell--x board__cell--o"),n.addClass("board__cell--selected board__cell--"+e.cell.toLowerCase()),n.append(t(i)(e)))})}};return n}])}(),function(){angular.module("triflix").directive("lockBoard",["$uibModal","Game","$rootScope",function(e,t,o){var n={link:function(n,a,i){function r(n){var i=e.open({animation:!0,component:"chooseTeamModal",backdrop:"static",resolve:{}});i.result.then(function(e){a.off("click",r),t.lockBoard=!1,o.$emit("triflix.game.start")})["catch"](function(e){})}a.on("click",r)}};return n}])}(),function(){function e(e,t){var o;this.getUser=function(){return o},this.user=function(){return e({method:"GET",url:t.getUser.remote}).then(function(e){return e.data.error||(o=e.data),e},function(e){return e})}}angular.module("triflix").service("UserService",e),e.$inject=["$http","ApiPath"]}(),function(){function e(){}e.prototype.makeMove=function(e){var t=new TicTacToe.TicTacToeBoard(e.state),o=new TicTacToe.TicTacToeAIPlayer,n=t.oppositePlayer(e.team);o.initialize(n,t);var a=o.makeMove();if(null==a)throw new Error("invalid move");t.makeMove(n,a);var i=t.winner();return{data:{team:e.team,state:t.board,winner:{team:i?i.cell:"",indexes:i?i.indexes:[]}}}},window.TicTacToeWrapper=e}(),function(){function e(e){return{request:function(e){var o=window.localStorage.getItem(t);return o&&(e.headers[t]=o),e},response:function(e){var o=e.headers()[t];return o&&window.localStorage.setItem(t,o),e},responseError:function(e){return e}}}angular.module("triflix").factory("httpInterceptor",e),e.$inject=["$location"];var t="x-auth"}(),function(){function Game($http,TEAMS,TABLE_NR,$timeout,ApiPath,$q,SocketService){function init(){for(var e=0;TABLE_NR>e;e++)game[e]={},game[e].team=TEAMS.X,game[e].state=["","","","","","","","",""],game[e].winner={}}var ticTacToeWrapper=new TicTacToeWrapper,game=[];init(),this.lockBoard=!0,this.getStatus=function(){return game};var AImove=function(e){var t=$q.defer();return $timeout(function(){try{var o=ticTacToeWrapper.makeMove(e);t.resolve(o)}catch(n){t.reject(n)}}),t.promise},multiplayerMove=function(e,t){return SocketService.makeMove(e,t)};this.opponentMove=function(e,t){return SocketService.getOpponent()?multiplayerMove(e,t):AImove(e)},this.aiMoveRemote=function(){return $http({url:ApiPath.game.remote,method:"POST",headers:{"Content-Type":"application/json"},data:JSON.stringify(eval(game))})},this.restart=function(){game.forEach(function(e){e.state=["","","","","","","","",""],e.winner={}})},this.chooseTeam=function(e){game.forEach(function(t){t.team=e})},this.flatCoordinate=function(e,t){return e+3*t}}angular.module("triflix").service("Game",Game),Game.$inject=["$http","TEAMS","TABLE_NR","$timeout","ApiPath","$q","SocketService"]}(),function(){function e(e,t,o,n,a){var i,r;this.initSocket=function(){return window.io?void(i||(i=io.connect(e.multiplayer.remote),this.on("disconnect",function(){i=null}))):console.log("socket.io not loaded")},this.emit=function(e,t){i.emit(e,t)},this.on=function(e,t){i.on(e,t)},this.getSocketId=function(){return i.id},this.chooseOpponent=function(e){r=e},this.getOpponentSocketFromValue=function(e,t){var o=-1;return _.mapObject(t,function(t,n){t.userId===e.userId&&(o=n)}),o},this.getOpponent=function(){return r},this.makeMove=function(e,t){var n=o.defer();return i.emit("make move",{move:t,opponent:r}),n.resolve({data:e}),n.promise}}angular.module("triflix").service("SocketService",e),e.$inject=["ApiPath","$timeout","$q","TEAMS","$rootScope"]}(),function(){function e(e,t,o){o.defaults.withCredentials=!0,o.interceptors.push("httpInterceptor"),e.state("home",{url:"/",templateUrl:"app/home/home.html",controller:"HomeController as homeCtrl"}),t.otherwise("/")}angular.module("triflix").config(e),e.$inject=["$stateProvider","$urlRouterProvider","$httpProvider"]}(),angular.module("triflix").run(["$templateCache",function(e){e.put("app/home/home.html",'<div class=panelParent><panel-container class=panel-container></panel-container></div><!--\r\n\r\n<svg xmlns="http://www.w3.org/2000/svg" style="display: none">\r\n\r\n  <symbol id="o" viewBox="0 0 100 100">\r\n    <circle cx="50" cy="50" r="43" />\r\n  </symbol>\r\n\r\n  <symbol id="x" viewbox="0 0 100 100">\r\n    <polygon fill-rule="nonzero" points="100 11.5399943 88.4595969 0 50.0001022 38.4599035 11.5404031 0 0 11.5399943 38.4596991 50.0001022 0 88.4595969 11.5406074 100 50.0001022 61.5403009 88.4595969 100 99.9997956 88.4595969 61.5403009 50.0001022"></polygon>\r\n  </symbol>\r\n\r\n</svg>\r\n\r\n-->'),e.put("app/components/triflix-board/triflix-board.html",'<div class=col-sm-12><div class=header><h1>TicTacToe</h1><p>Cras ultricies ligula sed magna dictum porta.</p></div></div><div lock-board><div class=board refresh-board><div ng-click=board.makeMove(0,0) paint-cell=board.game.state[0] game=board.game class="board__cell board__cell--selected board__cell--o"><span class="icon animated bounceIn"></span></div><div ng-click=board.makeMove(0,1) paint-cell=board.game.state[3] game=board.game class=board__cell></div><div ng-click=board.makeMove(0,2) paint-cell=board.game.state[6] game=board.game class="board__cell board__cell--selected board__cell--x"><span class="icon animated tada"></span></div><div ng-click=board.makeMove(1,0) paint-cell=board.game.state[1] game=board.game class=board__cell></div><div ng-click=board.makeMove(1,1) paint-cell=board.game.state[4] game=board.game class=board__cell></div><div ng-click=board.makeMove(1,2) paint-cell=board.game.state[7] game=board.game class=board__cell></div><div ng-click=board.makeMove(2,0) paint-cell=board.game.state[2] game=board.game class=board__cell></div><div ng-click=board.makeMove(2,1) paint-cell=board.game.state[5] game=board.game class=board__cell></div><div ng-click=board.makeMove(2,2) paint-cell=board.game.state[8] game=board.game class=board__cell></div></div></div>'),e.put("app/components/triflix-header/triflix-header.html",'<div class="col-sm-12 triflix-header"><div class="col-xs-4 triflix-header--button" ng-click=header.handler.back() ng-show=header.params.back><i class="fa fa-arrow-left" aria-hidden=true></i> <span>Back</span></div><div class="col-xs-4 text-center"><img ng-show=header.avatar ng-src={{header.avatar}} width=32 height=24 class=img-circle alt="no img"></div><div class="col-xs-4 triflix-header--button" ng-click=header.handler.forward() ng-show=header.params.forward><div class=pull-right><i class="fa fa-arrow-right" aria-hidden=true></i> <span>Forward</span></div></div></div>'),e.put("app/components/panels/board/board.html","<triflix-header params=board.params ng-if=board.params></triflix-header><triflix-board class=col-sm-12 index=0></triflix-board>"),e.put("app/components/panels/choose-team/choose-team.html",'<div class=triflix-modal><div class=triflix-modal--header><h3 class=triflix-modal--title>Choose a team</h3></div><div class=triflix-modal--body><div ng-repeat="team in chooseTeam.teams" ng-click=chooseTeam.choose(team)><span svg-icon={{team}}-icon width=64></span></div></div></div>'),e.put("app/components/panels/multiplayer/multiplayer.html",'<triflix-header params=multiplayer.params></triflix-header><div class="row multiplayer"><div class=col-sm-12><h1>Multiplayer</h1></div><div class="col-sm-12 multiplayer--box"><div ng-repeat="user in multiplayer.usersOnline track by $index" ng-click=multiplayer.chooseOpponent(user) class="col-sm-4 col-sm-offset-4 multiplayer--box--el">{{user.name}}</div></div></div>'),e.put("app/components/panels/victory/victory.html",'<div class=triflix-modal><div class=triflix-modal--header><h3 class=triflix-modal--title>We have a winner</h3></div><div class=triflix-modal--body>Player <span svg-icon={{$ctrl.winnerTeam}}-icon width=32></span> win the game</div></div><!--<div class="modal-header">\r\n    <h3 class="modal-title" id="modal-title">I\'m a modal!</h3>\r\n</div>\r\n<div class="modal-body" id="modal-body">\r\n    <ul>\r\n        <li ng-repeat="item in $ctrl.items">\r\n            <a href="#" ng-click="$event.preventDefault(); $ctrl.selected.item = item">{{ item }}</a>\r\n        </li>\r\n    </ul>\r\n    Selected: <b>{{ $ctrl.selected.item }}</b>\r\n</div>\r\n<div class="modal-footer">\r\n    <button class="btn btn-primary" type="button" ng-click="$ctrl.ok()">OK</button>\r\n    <button class="btn btn-warning" type="button" ng-click="$ctrl.cancel()">Cancel</button>\r\n</div>-->'),e.put("app/components/panels/confirm/confirm.html",'<div class="triflix-modal row"><div class="triflix-modal--header col-sm-12"><h3 class=triflix-modal--header--title>Heading</h3></div><div class="triflix-modal--body col-sm-12"><h2>{{confirm.resolve.text}}</h2><button class="col-sm-3 col-sm-offset-3 btn btn-success" ng-click=confirm.resolve.okCb()>Ok</button> <button class="col-sm-3 btn btn-danger" ng-click="">Cancel</button></div></div>'),e.put("app/components/panels/login/login.html",'<div class=login><div class=row><div class="col-xs-8 col-xs-offset-2 col-sm-4 col-sm-offset-4 text-center"><div ng-repeat="team in login.teams" style="display: inline"><span svg-icon={{team}}-icon width=64></span></div></div></div><div class=row style="margin-top: 30px" ng-click=login.continueNotLogged()><div class="col-xs-8 col-xs-offset-2 col-sm-4 col-sm-offset-4 text-center login--button login--button--local">Local game</div></div><div class="row login--button"><div class="col-xs-8 col-xs-offset-2 col-sm-4 col-sm-offset-4 text-center login--button login--button--facebook" ng-click=login.loginWithFacebook()>Multiplayer game with <a class="btn btn-social-icon btn-facebook" style="height: 32px"><span class="fa fa-facebook"></span></a></div></div><div class="row login--button"><div class="col-xs-8 col-xs-offset-2 col-sm-4 col-sm-offset-4 text-center login--button login--button--realtime">realtime game</div></div></div><!--\r\nhttp://localhost:3002/auth/facebook\r\nhttps://triflixbe.herokuapp.com/auth/facebook\r\n-->')}]);
//# sourceMappingURL=../maps/scripts/app-0ca7bddd2c.js.map