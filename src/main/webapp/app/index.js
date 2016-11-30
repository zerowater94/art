define([ 'abstractView', 'basicInfo', 'basicUtil'
       ], function ( AbstractView , $a, $aUtil) {
	
	'use strict';
	
	var _funcs = function( thisEl ) {
		
		var _this = this;
		
		var _pm = {
			
		} ; // param	
		var _els = {
				
		} ; // elements
		var _dts = {
			isCallSetup : false,
			callParam   : {
				hash : null,
				search : null
			}
		} ; // elements
		var _f = {
			initialize : function() {
				
				$(document).attr("title", $a.getMsg("document.title"));
				
				$(document.body).css({
					minWidth : "770px"
				});
			},
			// 세션을 체크 한다.
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
			parseLocation : function() {
				
				var wl = window.location;
				_dts.callParam.hash = wl.hash;
				_dts.callParam.search = $aUtil.getUrlParams(wl.search);
				// hash url 삭제
				history.replaceState({}, document.title, wl.pathname);
				
			},
			// page 이동에 대한 listener 등록
			setupContentLoad : function() {
				
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
					_f.goMainPage(data);
				} );
			},
			goLoginPage : function() {
				
				var _p = $.extend(true, {}, _dts.callParam.search);
				if( _dts.isCallSetup ) {
					
					_p.callbackFunc = _f.goSetupPage; 
				} else {
					_p.callbackFunc = _f.goMainPage;
				}
				$a.goPage({
					viewName : 'base/login/login',
					el       : $(document.body)  ,
					paramData : _p
				});
			},
			goSetupPage : function() {

				$a.goPage({
					viewName : 'base/setup/setupApp',
					el       : $(document.body)  ,
				});
				
			},
			goMainPage : function( param ) {
				$a.goPage({
					viewName  : 'main/main',
					paramData : param ,
					el        : $(document.body)  ,
				});
			},
			loadCustomCss : function() {
				
				var customCss = $a.getDefaultUrl()+'/common/initialize/getCustomCss/'+$a.getTheme()+'/art-custom.css';
				$('head').append('<link rel="stylesheet" href="'+customCss+'" type="text/css" />');
			},
		}; // functions..
		
		/*************************************************
		 * common structure
		 *************************************************/
		 _this.setParam = function(obj) {
			
			_pm = $.extend( true, _pm ,obj);
		 };
		
		 _this.createPage = function() {};

		 _this.reloadContents = function() {

			_f.initialize();
			_f.parseLocation();
			_f.setupContentLoad();
			_f.chkSessionInfo();
			_f.loadCustomCss();
			
			$(document).bind("contextmenu",function(e){
				e.preventDefault();
		        console.log(e);
		        console.log(event.which );
		        e.target.innerHTML ="AAA";
		        console.log(e.target.textContent);
		    });
			
			if(_dts.callParam.search.type ==  $a.getConstants("LOGIN_TYPE","SETUP")  ) {
				_dts.isCallSetup = true;
			}

			if( $a.getSessionInfo() == null ) {
				
//				_f.goLoginPage();
				_f.goMainPage();
			} else {
				
				if ( _dts.isCallSetup && $a.getSessionInfo("SYS_ROLE") == $a.getConstants("SYS_ROLE","SETUPADM") ) {
					_f.goSetupPage();
				} else {
					_f.goMainPage();
				}
			}
		 };
		
		 _this.returns = {
			
		 };
		
		return _this;
	};
	
	return AbstractView.extend({
		initialize : function(){
			$a.initializeResource('ko');
			$a.initializeApp();
		},
		executor : _funcs
	});

});
