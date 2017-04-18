define([ 'basicInfo'
       ], function ( $a ){
	
	'use strict';
	
	var app = {};
	
	var indexApp = $a.ctl({
		render : function(obj) {
			var _self = this;
			$.extend(true, this.pm, obj);
			_self.initialize();
			_self.parseLocation();
			_self.setupContentLoad();
			_self.chkSessionInfo();
			_self.loadCustomCss();
			_self.goPage();
		},
		callParam : {
			hash : null,
			search : null
		},
		initialize : function() {
			$(document).attr("title", $a.getMsg("document.title"));
			$(document.body).css({
				minWidth : "770px"
			});
		},
		parseLocation : function() {
			var _self = this;
			var wl = window.location;
			_self.callParam.hash = wl.hash;
			_self.callParam.search = $a.u.getUrlParams(wl.search);
			// hash url 삭제
			history.replaceState({}, document.title, wl.pathname);
		},
		setupContentLoad : function() {
			var _self = this;
			window.addEventListener('popstate', function(event){
				if( event.state != null )
					Backbone.trigger('historyLocation', event);
			});
			// window.history.
			Backbone.on("historyLocation", function(event){
				if (event.state && _.keys(event.state).length > 0) {
					$a.goPage(event.state);
				}
			} );
			
			// Main Page로 이동한다. 
			Backbone.on("contentsLoad", function(data) {
				var wl = window.location;
				history.replaceState({}, document.title, wl.pathname);
				history.pushState(data, data.viewName, '');
				_self.goMainPage(data);
			} );
			
			$(document).bind("contextmenu",function(e){
				e.preventDefault();
				console.log("Not arrowed...right click..");
		    });
		},
		chkSessionInfo : function() {
			var _param = {
				url:$a.getDefaultUrl() + "/base/login/session",
				type : "GET",
				success : function(data) {
					if( typeof data == 'object' ) {
						$a.setSessionInfo(data);
					}
				}
			};
			$a.send(_param);
		},
		loadCustomCss : function() {
			var customCss = $a.getDefaultUrl()+'/common/initialize/getCustomCss/'+$a.getTheme()+'/art-custom.css';
			$('head').append('<link rel="stylesheet" href="'+customCss+'" type="text/css" />');
		},
		goPage : function() {
			var _self = this;
			
			if (_self.callParam.search.type ==  $a.getConstants("LOGIN_TYPE","SETUP")  ) {
				_self.isCallSetup = true;
			}

			if( $a.getSessionInfo() == null ) {
				_self.goLoginPage();
			} else {
				
				if ( _self.isCallSetup && $a.getSessionInfo("SYS_ROLE") == $a.getConstants("SYS_ROLE","SETUPADM") ) {
					_self.goSetupPage();
				} else {
					_self.goMainPage();
				}
			}
		},
		goLoginPage : function() {
			var _self = this;

			var _p = $.extend(true, {}, _self.callParam.search);
			if( _self.isCallSetup ) {
				
				_p.callbackFunc = _self.goSetupPage; 
			} else {
				_p.callbackFunc = _self.goMainPage;
			}
			
			$a.goPage({
				viewName : 'app/base/login/login',
				el       : $(document.body)  ,
				paramData : _p
			});
		},
		goSetupPage : function() {
			$a.goPage({
				viewName : 'app/base/setup/setupApp',
				el       : $(document.body)  ,
			});
		},
		goMainPage : function( param ) {
			$a.goPage({
				viewName  : 'app/main/main',
				paramData : param ,
				el        : $(document.body)  ,
			});
		},
	});
	
	return $a.ctl({
		render : function(obj) {
			var _self = this;
			$a.initializeResource('ko');
			$a.initializeApp();
			$.extend(true, _self.pm, obj);
			app = {};
			app.index = new indexApp(); 
			app.index.render();
		},
	});
});
