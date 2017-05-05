!function(){"use strict";angular.module("triflix",["ui.router","ui.bootstrap"]).constant("TEAMS",{X:"X",O:"O",EMPTY:""}).constant("ANIMATIONS",{X:"tada",O:"bounceIn"}).constant("LEVELS",{IMPOSSIBLE:{label:"Hard",errors:0},MEDIUM:{label:"Medium",errors:1},EASY:{label:"Easy",errors:2}}).constant("ApiPath",{game:{local:"http://127.0.0.1:8080/jerseybackend/rest/game",remote:"https://triflixbackend.herokuapp.com/rest/game"},login:{local:"http://localhost:3007/auth/facebook",remote:"https://triflixbe.herokuapp.com/auth/facebook"},getUser:{local:"http://127.0.0.1:3007/user",remote:"https://triflixbe.herokuapp.com/user"},multiplayer:{local:"http://localhost:3007",remote:"https://triflixbe.herokuapp.com"}})}(),function(){function e(e,t,n,o){var i=this;i.teams=t,i.levels=n,i.applySetting=function(e,t){"team"===e&&o.setTeam(t),"level"===e&&o.setLevel(t)},i.params={back:{text:"Back",cb:function(){e.$parent.$close()}}}}angular.module("triflix").component("settings",{bindings:{},templateUrl:"app/components/panels/settings/settings.html",controller:e,controllerAs:"settings"}),e.$inject=["$scope","TEAMS","LEVELS","GameSettings"]}(),function(){function e(e,t,n,o,i,a,l,i){var r=n.getUser();if(!r)return e.$parent.$close();if(!r.facebook)return e.$parent.$close();var s=this;a.initSocket();var c=function(){i.open({component:"board",scope:e})};s.chooseOpponent=function(e){if(s.users){var t=a.getOpponentSocketFromValue(e,s.users);a.emit("choose opponent",t)}},a.emit("add to room",{userId:r.facebook.id,data:r.facebook}),a.on("add to room",function(t){e.$apply(function(){s.users=t.users,s.usersOnline=_.map(t.users,function(e,t){return e})})}),a.on("challenge request",function(e){var t="Challenge request from "+e.opponent.data.name;o.open({animation:!0,component:"confirm",backdrop:"static",resolve:{text:[function(){return t}],okCb:[function(){return function(){a.emit("challenge accepted",{accepter:a.getSocketId(),challenger:e.opponentSocketId}),a.chooseOpponent(e),l.$emit("triflix.game.start"),c()}}]}})}),a.on("challenge accepted",function(e){a.chooseOpponent(e),l.$emit("triflix.game.start"),c()}),this.params={back:{text:"Back",cb:function(){e.$parent.$close()}}}}angular.module("triflix").component("multiplayer",{bindings:{},templateUrl:"app/components/panels/multiplayer/multiplayer.html",controller:e,controllerAs:"multiplayer"}),e.$inject=["$scope","ApiPath","UserService","$uibModal","PanelService","SocketService","$rootScope","PanelService"]}(),function(){function e(e,t,n,o,i,a,l){function r(e){var t=document.createElement("a");return t.click?(t.setAttribute("href",e),t.style.display="none",document.body.appendChild(t),void t.click()):void(window.location=e)}function s(){var e=window.RequestFileSystem||window.webkitRequestFileSystem;e?e(window.TEMPORARY,100,function(){c=!1},function(){c=!0,m("multiplayer")}):(console.log("check failed"),c=!1)}s();var c=!1;this.teams=i,this.animations=a;var d=function(t){o.open({component:t,scope:e})},m=function(e){t.user().then(function(t){this.user=t.data,e&&n(function(){d(e)},100)},function(e){console.log(e)})};m(""),this.continueNotLogged=function(){d("board")},this.loginWithFacebook=function(){window.localStorage.getItem("x-auth")?m("multiplayer"):p()},this.openSettings=function(){d("settings")};var p=function(){r(l.login.remote)}}angular.module("triflix").component("login",{bindings:{},templateUrl:"app/components/panels/login/login.html",controller:e,controllerAs:"login"}),e.$inject=["$scope","UserService","$timeout","PanelService","TEAMS","ANIMATIONS","ApiPath"]}(),function(){function e(e,t,n,o){var i=o.getUser(),a=function(){t.$parent.$close()};this.params={back:{text:"Back",cb:a},avatar:{url:i?i.facebook.img||"":""}}}angular.module("triflix").component("board",{bindings:{},templateUrl:"app/components/panels/board/board.html",controller:e,controllerAs:"board"}),e.$inject=["PanelService","$scope","$timeout","UserService"]}(),function(){function e(e){var t=this;t.game=t.resolve.game,t.winner=t.game.winner,t.$postLink=function(){}}angular.module("triflix").component("victoryModal",{bindings:{resolve:"<"},templateUrl:"app/components/modals/victory/victory.html",controller:e,controllerAs:"$ctrl"}),e.$inject=["Game"]}(),function(){function e(e,t){var n=this,o=n.resolve.okCb;n.resolve.okCb=function(){n.modalInstance.dismiss("cancel"),o()},n.resolve.cancelCb=function(){n.modalInstance.dismiss("cancel")}}angular.module("triflix").component("confirm",{bindings:{resolve:"<",modalInstance:"<"},templateUrl:"app/components/modals/confirm/confirm.html",controller:e,controllerAs:"confirm"}),e.$inject=["$scope","UserService"]}(),function(){function e(e,t){var n=this;n.teams=t,n.choose=function(t){e.chooseTeam(t),n.modalInstance.close(t)},n.$postLink=function(){}}angular.module("triflix").component("chooseTeamModal",{bindings:{modalInstance:"<",resolve:"<"},templateUrl:"app/components/modals/choose-team/choose-team.html",controller:e,controllerAs:"chooseTeam"}),e.$inject=["Game","TEAMS"]}(),function(){angular.module("triflix").service("PanelService",["$rootScope",function(e){var t=(angular.element(document.getElementsByClassName("triflix-panel")[0]),function(e){return e?!0:!1});this.open=function(n,o){t(n)&&e.$emit("triflix.addpanel",n)}}])}(),function(){function e(e,t,n){this.handler={back:this.params.back&&this.params.back.cb||function(){},forward:this.params.forward&&this.params.forward.cb||function(){}},this.avatar=this.params.avatar&&this.params.avatar.url}angular.module("triflix").component("triflixHeader",{bindings:{params:"<"},templateUrl:"app/components/triflix-header/triflix-header.html",controller:e,controllerAs:"header"}),e.$inject=["$compile","$scope","$element"]}(),function(){function e(e,t,n,o,i,a,l,r){var s,c=this;this.$onInit=function(){c.userMove=!0,o.lockBoard=!0,o.reset(),s=o.getStatus(),this.game=s,r.getOpponent()&&(c.opponentName=r.getOpponent().opponent.data.name.split(" ")[0],o.lockBoard=!1,r.on("make move",function(e){n.$apply(function(){s.state[e]=s.team===l.X?l.O:l.X,c.userMove=!0,o.winner(s)&&d("victoryModal",function(e){o.reset(),i.$emit("triflix.game.start")})})}),r.on("game aborted",function(){n.$parent.$parent.$close()}))},this.makeMove=function(e,t){var n=o.flatCoordinate(e,t);o.lockBoard||s.state[n]===l.EMPTY&&c.userMove&&(c.userMove=!1,s.state[n]=s.team,o.opponentMove(s,n).then(function(e){_.extend(s,e.data),r.getOpponent()||(c.userMove=!0),s.winner.team&&(i.$emit("triflix.game.victory"),d("victoryModal",function(e){o.reset(),i.$emit("triflix.game.start")}))})["catch"](function(e){"draw"===e.message?d("victoryModal",function(e){o.reset(),i.$emit("triflix.game.start"),c.userMove=!0}):console.log(e)}))},this.$postLink=function(){};var d=function(e,t){var n=a.open({animation:!0,component:e,resolve:{game:[function(){return c.game}]}});n.result["catch"](t)}}angular.module("triflix").component("triflixBoard",{bindings:{index:"@"},templateUrl:"app/components/triflix-board/triflix-board.html",controller:e,controllerAs:"board"}),e.$inject=["$element","$compile","$scope","Game","$rootScope","$uibModal","TEAMS","SocketService"]}(),function(){function e(e,t,n,o,i,a,l){function r(){c=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,d=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}function s(){r(),m.forEach(function(e){e.css("height",d),e.css("width",c)}),e.css("height",d),e.css("width",c*m.length),e.css("left",-c*(m.length-1)),e.parent().css("height",d),e.parent().css("width",c)}var c,d;r(),this.$onInit=function(){e.css("position","absolute"),e.css("width",c),e.css("height",d),e.css("top","0px"),e.css("left",-c+"px")};var m=[];n.$on("triflix.addpanel",function(t,a){var r=angular.element("<div></div>");if(r.css("float","left"),r.css("width",c),r.css("height",d),a.controller){var s=angular.element("<div></div>");s.attr("ng-controller",a.controller);var p=o.get(a.templateUrl);s.append(angular.element(p)),r.append(s)}else if(a.component){var u="<"+a.component+"></"+a.component+">";r.append(u)}var v=n.$new();v.prototype=a.scope,v.$close=function(){var t=m.indexOf(f);m.splice(t,1),f.scope().$destroy();var n=m.length?-c*(m.length-1):0;e.css("left",n),l(function(){f.remove(),e.css("width",c*m.length)},500)};var f=i(r)(v);m.push(f),e.parent().css("position","relative"),e.parent().css("overflow-x","hidden"),e.parent().css("width",c),e.parent().css("height",d),e.css("width",c*m.length),e.append(f);var g=-c*(m.length-1);e.css("left",g)}),this.$postLink=function(){angular.element(a).on("resize",s)}}angular.module("triflix").component("panelContainer",{bindings:{},controller:e,controllerAs:"panel"}),e.$inject=["$element","$scope","$rootScope","$templateCache","$compile","$window","$timeout"]}(),function(){"use strict";function e(e,t,n){n(function(){t.open({component:"login",scope:e})})}angular.module("triflix").controller("HomeController",e),e.$inject=["$scope","PanelService","$timeout"]}(),function(){function e(e,t){var n={link:function(n,o,i){i.$observe("svgIcon",function(n){var a=e.getIcons()[n];if(a){a=angular.element(a),a.css("width",i.width?i.width+"px":"64px");var l=t[n.charAt(0)];a.attr("class","animated "+l),o.replaceWith(a)}})}};return n}function t(){var e={"X-icon":"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><polygon fill='#DB9E36' fill-rule='nonzero' points='100 11.5399943 88.4595969 0 50.0001022 38.4599035 11.5404031 0 0 11.5399943 38.4596991 50.0001022 0 88.4595969 11.5406074 100 50.0001022 61.5403009 88.4595969 100 99.9997956 88.4595969 61.5403009 50.0001022'></polygon></svg>","O-icon":"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle stroke='#DC3522' stroke-width='14' fill='transparent' cx='50' cy='50' r='43' /></svg>"};this.getIcons=function(){return e}}angular.module("triflix").directive("svgIcon",e).service("svgIconService",t),e.$inject=["svgIconService","ANIMATIONS"],t.$inject=[]}(),function(){angular.module("triflix").directive("selectOption",["GameSettings",function(e){var t={scope:{option:"@selectOption",value:"=selectOptionValue"},link:function(t,n,o){_.isEqual(e.getSettings()[t.option],t.value)&&n.addClass("settings__content__el__selected"),n.on("click",function(){var e=n.siblings();e.removeClass("settings__content__el__selected"),n.addClass("settings__content__el__selected")})}};return t}])}(),function(){angular.module("triflix").directive("refreshBoard",["$rootScope","SocketService",function(e,t){var n={link:function(n,o,i){var a=e.$on("triflix.game.start",function(){o.children().removeClass("board__cell--selected board__cell--o board__cell--x"),angular.forEach(o.children(),function(e){$(e).find(".icon").remove()})});n.$on("$destroy",function(){a()}),t.getOpponent()&&e.$emit("triflix.game.start")}};return n}])}(),function(){angular.module("triflix").directive("paintCell",["Game","$compile","ANIMATIONS",function(e,t,n){var o={scope:{cell:"=paintCell",game:"="},link:function(e,o,i){var a=angular.element('<span class="icon animated {{iconEffect}}"></span>');e.$watch("cell",function(i){i&&(e.iconEffect=n[e.cell]||"bounceIn",o.removeClass("board__cell--x board__cell--o"),o.addClass("board__cell--selected board__cell--"+e.cell.toLowerCase()),o.append(t(a)(e)))})}};return o}])}(),function(){angular.module("triflix").directive("lockBoard",["$uibModal","Game","$rootScope","SocketService",function(e,t,n,o){var i={link:function(e,i,a){function l(e){i.off("click",l),t.lockBoard=!1,n.$emit("triflix.game.start")}o.getOpponent()||i.on("click",l)}};return i}])}(),function(){function e(e,t){var n;this.getUser=function(){return n},this.user=function(){return e({method:"GET",url:t.getUser.remote}).then(function(e){return e.data.error||(n=e.data),e},function(e){return e})}}angular.module("triflix").service("UserService",e),e.$inject=["$http","ApiPath"]}(),function(){angular.module("triflix").factory("TicTacToeWrapper",["LEVELS","TEAMS",function(e,t){function n(t){var n=new TicTacToe.TicTacToeBoard(t.state),i=new TicTacToe.TicTacToeAIPlayer,a=n.oppositePlayer(t.team);i.initialize(a,n);var l=n.winner();if(!l){if(!_.isEqual(t.level,e.IMPOSSIBLE)&&this.errors<t.level.errors){var r=o(t);n.board[r]=a,this.errors++}else{var s=i.makeMove();if(null==s)throw new Error("invalid move");n.makeMove(a,s)}l=n.winner()}return{data:{team:t.team,state:n.board,winner:{team:l?l.cell:"",indexes:l?l.indexes:[]}}}}function o(e){for(var n,o=!1;!o;)n=_.random(0,8),o=e.state[n]===t.EMPTY?!0:!1;return n}return function(){this.errors=0,this.makeMove=n,this.winner=function(e){var t=new TicTacToe.TicTacToeBoard(e.state),n=new TicTacToe.TicTacToeAIPlayer,o=t.oppositePlayer(e.team);return n.initialize(o,t),t.winner()}}}])}(),function(){function e(e){return{request:function(e){var n=window.localStorage.getItem(t);return n&&(e.headers[t]=n),e},response:function(e){var n=e.headers()[t];return n&&window.localStorage.setItem(t,n),e},responseError:function(e){return e}}}angular.module("triflix").factory("httpInterceptor",e),e.$inject=["$location"];var t="x-auth"}(),function(){function e(e,t,n){function o(){localStorage.setItem("settings",angular.toJson(a))}function i(){var n=localStorage.getItem("settings");return n?angular.fromJson(n):{team:e.X,level:t.IMPOSSIBLE,sound:"off"}}var a=i();this.setTeam=function(t){a.team=e[t.toUpperCase()]||e.X,n.$emit("triflix.game.change.settings"),o()},this.setLevel=function(e){a.level=t[e.toUpperCase()]||t.IMPOSSIBLE,n.$emit("triflix.game.change.settings"),o()},this.getSettings=function(){return a}}angular.module("triflix").service("GameSettings",e),e.$inject=["TEAMS","LEVELS","$rootScope"]}(),function(){function e(e,t,n,o,i,a,l,r,s,c){var d,m=this;game={},game.team=o.getSettings().team,game.level=o.getSettings().level,game.state=["","","","","","","","",""],game.winner={},this.lockBoard=!0;var p=function(e){var t=l.defer();return i(function(){try{if(!m.hasEmptySlots(e.state))return t.reject(new Error("draw"));var n=d.makeMove(e);t.resolve(n)}catch(o){t.reject(o)}},800),t.promise},u=function(e,t){var n=m.hasEmptySlots(e.state);return m.winner(e),r.makeMove(e,t,n)};this.opponentMove=function(e,t){return r.getOpponent()?u(e,t):p(e)},this.reset=function(){game.state=["","","","","","","","",""],game.winner={},d=new c},this.flatCoordinate=function(e,t){return e+3*t},this.getStatus=function(){return game},this.hasEmptySlots=function(e){var n=_.find(e,function(e){return e===t.EMPTY});return void 0!==n?!0:!1},this.winner=function(e){return e.winner=d.winner(e),e.winner&&(e.winner.team=e.winner.cell,delete e.winner.cell),e.winner},s.$on("triflix.game.change.settings",function(e,t){game.team=o.getSettings().team,game.level=o.getSettings().level})}angular.module("triflix").service("Game",e),e.$inject=["$http","TEAMS","LEVELS","GameSettings","$timeout","ApiPath","$q","SocketService","$rootScope","TicTacToeWrapper"]}(),function(){function e(e,t,n,o,i){var a,l;this.initSocket=function(){return window.io?void(a||(a=io.connect(e.multiplayer.remote),this.on("disconnect",function(){a=null}))):console.log("socket.io not loaded")},this.emit=function(e,t){a.emit(e,t)},this.on=function(e,t){a.on(e,t)},this.getSocketId=function(){return a.id},this.chooseOpponent=function(e){l=e},this.getOpponentSocketFromValue=function(e,t){var n=-1;return _.mapObject(t,function(t,o){t.userId===e.userId&&(n=o)}),n},this.getOpponent=function(){return l},this.makeMove=function(e,t,o){var i=n.defer();return o||i.reject(new Error("draw")),a.emit("make move",{move:t,opponent:l}),i.resolve({data:e}),i.promise}}angular.module("triflix").service("SocketService",e),e.$inject=["ApiPath","$timeout","$q","TEAMS","$rootScope"]}(),function(){function e(e,t,n){n.defaults.withCredentials=!0,n.interceptors.push("httpInterceptor"),e.state("home",{url:"/",templateUrl:"app/home/home.html",controller:"HomeController as homeCtrl"}),t.otherwise("/")}angular.module("triflix").config(e),e.$inject=["$stateProvider","$urlRouterProvider","$httpProvider"]}(),angular.module("triflix").run(["$templateCache",function(e){e.put("app/home/home.html",'<div class=panelParent><panel-container class=panel-container></panel-container></div><!--\n\n<svg xmlns="http://www.w3.org/2000/svg" style="display: none">\n\n  <symbol id="o" viewBox="0 0 100 100">\n    <circle cx="50" cy="50" r="43" />\n  </symbol>\n\n  <symbol id="x" viewbox="0 0 100 100">\n    <polygon fill-rule="nonzero" points="100 11.5399943 88.4595969 0 50.0001022 38.4599035 11.5404031 0 0 11.5399943 38.4596991 50.0001022 0 88.4595969 11.5406074 100 50.0001022 61.5403009 88.4595969 100 99.9997956 88.4595969 61.5403009 50.0001022"></polygon>\n  </symbol>\n\n</svg>\n\n-->'),e.put("app/components/triflix-board/triflix-board.html",'<div class=col-sm-12><div class=header><h1>TicTacToe</h1><p ng-if=board.userMove>It\'s <b>your</b> turn</p><p ng-if="!board.userMove && !board.opponentName"><b>AI</b> turn</p><p ng-if="!board.userMove && board.opponentName"><b>{{board.opponentName}}</b> turn</p><!--<p>Cras ultricies ligula sed magna dictum porta.</p>--></div></div><div lock-board><div class=board refresh-board><div ng-click=board.makeMove(0,0) paint-cell=board.game.state[0] game=board.game class="board__cell board__cell--selected board__cell--o"><span class="icon animated bounceIn"></span></div><div ng-click=board.makeMove(0,1) paint-cell=board.game.state[3] game=board.game class=board__cell></div><div ng-click=board.makeMove(0,2) paint-cell=board.game.state[6] game=board.game class="board__cell board__cell--selected board__cell--x"><span class="icon animated tada"></span></div><div ng-click=board.makeMove(1,0) paint-cell=board.game.state[1] game=board.game class=board__cell></div><div ng-click=board.makeMove(1,1) paint-cell=board.game.state[4] game=board.game class=board__cell></div><div ng-click=board.makeMove(1,2) paint-cell=board.game.state[7] game=board.game class=board__cell></div><div ng-click=board.makeMove(2,0) paint-cell=board.game.state[2] game=board.game class=board__cell></div><div ng-click=board.makeMove(2,1) paint-cell=board.game.state[5] game=board.game class=board__cell></div><div ng-click=board.makeMove(2,2) paint-cell=board.game.state[8] game=board.game class=board__cell></div></div></div>'),e.put("app/components/triflix-header/triflix-header.html",'<div class="col-sm-12 triflix-header"><div class="col-xs-4 triflix-header--button" ng-click=header.handler.back() ng-show=header.params.back><i class="fa fa-arrow-left" aria-hidden=true></i> <span>Back</span></div><div class="col-xs-4 text-center"><img ng-show=header.avatar ng-src={{header.avatar}} width=32 height=24 class=img-circle alt="no img"></div><div class="col-xs-4 triflix-header--button" ng-click=header.handler.forward() ng-show=header.params.forward><div class=pull-right><i class="fa fa-arrow-right" aria-hidden=true></i> <span>Forward</span></div></div></div>'),e.put("app/components/modals/choose-team/choose-team.html",'<div class=triflix-modal><div class=triflix-modal--header><h3 class=triflix-modal--title>Choose a team</h3></div><div class=triflix-modal--body><div ng-repeat="team in chooseTeam.teams" ng-click=chooseTeam.choose(team) style=display:inline><span svg-icon={{team}}-icon width=64></span></div></div></div>'),e.put("app/components/modals/confirm/confirm.html",'<div class=triflix-modal><div class=triflix-modal--header><h3 class=triflix-modal--header--title>Heading</h3></div><div class=triflix-modal--body><h2>{{confirm.resolve.text}}</h2><button style="width: 25%" class="btn btn-success" ng-click=confirm.resolve.okCb()>Ok</button> <button style="width: 25%" class="btn btn-danger" ng-click=confirm.resolve.cancelCb()>Cancel</button></div></div>'),e.put("app/components/modals/victory/victory.html",'<div class=triflix-modal><div class=triflix-modal--header><h3 ng-if=$ctrl.winner.team class=triflix-modal--title>We have a winner</h3><h3 ng-if=!$ctrl.winner.team class=triflix-modal--title>Draw :(</h3></div><div ng-if=$ctrl.winner.team class=triflix-modal--body>Player <span svg-icon={{$ctrl.winner.team}}-icon width=32></span> win the game</div><div ng-if=!$ctrl.winner.team class=triflix-modal--body>Play again!</div></div><!--<div class="modal-header">\n    <h3 class="modal-title" id="modal-title">I\'m a modal!</h3>\n</div>\n<div class="modal-body" id="modal-body">\n    <ul>\n        <li ng-repeat="item in $ctrl.items">\n            <a href="#" ng-click="$event.preventDefault(); $ctrl.selected.item = item">{{ item }}</a>\n        </li>\n    </ul>\n    Selected: <b>{{ $ctrl.selected.item }}</b>\n</div>\n<div class="modal-footer">\n    <button class="btn btn-primary" type="button" ng-click="$ctrl.ok()">OK</button>\n    <button class="btn btn-warning" type="button" ng-click="$ctrl.cancel()">Cancel</button>\n</div>-->'),e.put("app/components/panels/board/board.html","<triflix-header params=board.params ng-if=board.params></triflix-header><triflix-board class=col-sm-12 index=0></triflix-board>"),e.put("app/components/panels/login/login.html",'<div class="container login"><div class=row><div class="col-xs-8 col-xs-offset-2 col-sm-4 col-sm-offset-4 text-center"><div ng-repeat="team in login.teams" style="display: inline"><span svg-icon={{team}}-icon width=64></span></div></div></div><div class=row style="margin-top: 30px" ng-click=login.continueNotLogged()><div class="col-xs-8 col-xs-offset-2 col-sm-4 col-sm-offset-4 text-center login--button login--button--local">Local game</div></div><div class="row login--button"><div class="col-xs-8 col-xs-offset-2 col-sm-4 col-sm-offset-4 text-center login--button login--button--facebook" ng-click=login.loginWithFacebook()>Multiplayer game <a class="btn btn-social-icon btn-facebook" style="height: 32px"><span class="fa fa-facebook"></span></a></div></div><div class="row login--button"><div class="col-xs-8 col-xs-offset-2 col-sm-4 col-sm-offset-4 text-center login--button login--button--realtime">realtime game</div></div><div class="row login--button" ng-click=login.openSettings()><div class="col-xs-8 col-xs-offset-2 col-sm-4 col-sm-offset-4 text-center login--button login--button--settings">settings</div></div></div><!--\nhttp://localhost:3002/auth/facebook\nhttps://triflixbe.herokuapp.com/auth/facebook\n-->'),e.put("app/components/panels/multiplayer/multiplayer.html",'<triflix-header params=multiplayer.params></triflix-header><div class="container multiplayer"><div class=row><div class=col-sm-12><h1>Multiplayer</h1></div></div><div class=row><div class="col-sm-6 multiplayer--box" ng-repeat="user in multiplayer.usersOnline\n    track by $index"><div class=card ng-init="inviteSent = false"><img ng-src={{user.data.img}} alt="no img" class=card__img> <span class=multiplayer--name class=card__name>{{user.data.name}}</span> <button ng-show=!inviteSent ng-click="multiplayer.chooseOpponent(user); inviteSent = true" class=card__cta>Invite</button> <button ng-show=inviteSent ng-disabled=inviteSent class=card__cta>Invite sent..</button></div></div></div></div>'),e.put("app/components/panels/settings/settings.html",'<triflix-header params=settings.params></triflix-header><div class="container settings"><div class=row><div class=col-sm-12><h1>Settings <i class="fa fa-gamepad" aria-hidden=true></i></h1></div></div><div class="row settings__bordered"><div class=col-xs-2><div class=settings__head>Team</div></div><div class=col-xs-10><div class="settings__content pull-right"><div class=settings__content__el select-option=team select-option-value=TEAM ng-repeat="TEAM in settings.teams" ng-if="TEAM !== \'\'" ng-click="settings.applySetting(\'team\', TEAM)"><span svg-icon={{TEAM}}-icon width=64></span></div></div></div></div><div class="row settings__bordered"><div class=col-xs-2><div class=settings__head>Level</div></div><div class=col-xs-10><div class="settings__content pull-right"><div class=settings__content__el select-option=level select-option-value=LEVEL ng-repeat="(key, LEVEL) in settings.levels" ng-click="settings.applySetting(\'level\', key)"><span>{{LEVEL.label}}</span></div></div></div></div><div class="row settings__bordered"><div class=col-xs-2><div class=settings__head>Sound</div></div><div class=col-xs-10><div class="settings__content pull-right"><div class=settings__content__el select-option=sound select-option-value=SOUND ng-repeat="SOUND in [\'on\', \'off\']" ng-click="settings.applySetting(\'sound\', SOUND)"><span>{{SOUND}}</span></div></div></div></div></div>')}]);
//# sourceMappingURL=../maps/scripts/app-89277db1cd.js.map