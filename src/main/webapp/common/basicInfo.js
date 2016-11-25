define(['alertify', 'blockUi', 'basicUtil', '../fw/manager/eventManager' , '../fw/manager/routerManager'
        ], function (Alertify, BlockUi, BasicUtil, MngEvent, MngRouter) 
{
	'use strict';
	
	var basicInfo = function() { 
		
		var _this = this;

		var _dts  = {
			
			isStopAjax : false,
			msg        : {},
			config     : {},
			code       : {},
			option     : {},
			properties : null,
			constant   : null,
			sessionInfo: null,
		};

		var _errMsg = {
			noSession  : 'No session info , please login',
			notConnect : 'Not Connection server..',
			failProcess: 'Fail to execute request'
		};

		var _pm = {
			domain     : "",
			defaultUrl : "/rest",
			cssUrl     : "/css",
			locales    : [],
			defaultLocale : 'ko',
			theme      : 'basic',
			mainArea   : null,
			mainEditor : null,
			pageParm   : {
				viewName : null,
				queryString : null,
				el     : null
			},
			ajaxParam  : {
				type     :"POST", // send Type : post,get,put,delete
				"async"  :false,
				cache    :false,
				timeout  : 3000, // sets timeout to 3 seconds
				dataType : "json",
				contentType      : "application/json",
				callBackFunction : null,
				callBackError    : null,
				callBackComplete : null,
				error:function(xhr,st,err){
					
					if( _dts.isStopAjax )
						return;
					
					if( xhr.status == 404 ) { // page not found
					
						console.log(xhr.statusText+"\n"+this.url);
						_this.print.alert(xhr.statusText+"\n"+this.url);
						
					}else if ( xhr.status == 401 ) { // sesssion error
						 _dts.isStopAjax = true; // 다음 부터 session 오류 발생되지 않게 하기 위해서.. 
						_this.print.alert(_errMsg.noSession, _this.goHome ); // no seession.
						
					}else if(  xhr.status == 0 ) {
						// server close
						_this.print.alert(_errMsg.notConnect, _this.goHome); // 에러 메시지 출력
					}else if( xhr.status == 200 ) {  // NULL값이 return 될 경우..
						
						this.success(xhr.responseText);
						
					}else { // 500 error
						try {
							// JSON object 형태임.
							var errObj = $.parseJSON(xhr.responseText);
							console.error(xhr.status+"\n"+errObj.resultMessage+"\n"+errObj.url);
							if( errObj.resultMessage == '' )
								_this.print.alert(_errMsg.failProcess); // 에러 메시지 출력
							else
								_this.print.alert(errObj.resultMessage); // 에러 메시지 출력
							
						}catch ( ex ) {
							// JSON object 형태가 아님.
							var errMsg ;
							if( typeof err == 'object' )
								errMsg = JSON.stringify(err);
							else
								errMsg = err;

							console.error(errMsg+"\n"+xhr.responseText);
							_this.print.alert(errMsg+"<br>"+xhr.responseText); // 에러 메시지 출력
						}
						
						if( this.callBackError != null )
							this.callBackError();
					}
						
				},
			    complete : function( xhr, result ) {
			    	
			    	$.unblockUI();
					if( this.callBackComplete != null )
						this.callBackComplete();
					
				}
				
			}
		};
		
		var _f = {
				
			initialSearch : function(locale) {
				
				var param = {
					url : _this.getDefaultUrl()+"/common/initialize/reload/resource/"+locale,
					type : "GET",
					success : function(data) {

						_dts.code = null;
						_dts.config = null;
						_dts.constant = data.CONSTANTS;
						_dts.msg.common = data.MSG;
						_dts.option = null;
						_dts.properties = data.PROPERTIES;
					}
				};
				_this.send(param);
			},
			initialApplication : function() {
				
				// initailizeApplication
				_f.setLocales();
				_f.setErrorMessage();
				_this.print.init({labels : {
					ok     : _dts.msg.common["lbl.confirm"],
					cancel : _dts.msg.common["lbl.cancle"], // 취소
				}});
				_f.execuRouter();
				MngEvent.startWindResize();
			},
			reloadCode : function( group ) {
				
				_dts.code[group] = null;
			},
			reloadConfig : function( group ) {
				
				_dts.config[group] = null;
			},
			reloadMessage : function(group) {
				_dts.msg[group] = null;
			},
			reloadOptions : function(group) {
				
				_dts.option[group] = null;
			},
			setLocales : function() {
				
				// config xml에서 데이터를 가져 온다.
				var langArry = _dts.properties["LOCALES"].split(",");// _this.getProperty("LOCALES").split(",");
				var disPlayArry = _dts.properties["LOCALES_NAME"].split(",");
				
				for( var idx = 0 ; idx < langArry.length; idx ++ ) {
					
					_pm.locales.push({
						code     : langArry[idx], 
						name     : disPlayArry[idx],
						"default": (idx == 0)?true:false
					});
				};
				
				_pm.defaultLocale = _dts.properties["DEFAULT_LOCALE"];
			},
			// error message에 대해서 다국어 적용 시킨다.
			setErrorMessage : function() {
				
				_errMsg.noSession   = _dts.msg.common["err.noSession"];
				_errMsg.notConnect  = _dts.msg.common["err.notConnect"];
				_errMsg.failProcess = _dts.msg.common["err.failProcess"];
			},
			// Backbone Router 실행
			execuRouter : function() {
				
				var router = new MngRouter();
				Backbone.history.start();
//				window.addEventListener('popstate', function(e) {
//					
//					Backbone.trigger("contentsLoad", e);
//				});
//				
//				// window.history.
//				Backbone.on("contentsLoad", function(event){
//					
//					if (event.state && _.keys(event.state).length > 0) {
//						
//						console.log(event);
////						Backbone.history.navigate(event.state.viewName, true); 
//						//BasicInfo.goPage(event.state);
//					}
//				} );
				
				// Main Page로 이동한다. 
//				Backbone.on("popstate", function(data){
//					
//					Backbone.history.navigate(data.viewName, true); 
//					BasicInfo.goPage(data);
//				} );
				
			}
		};
		
		/*******************************************************
		 * 
		 * basic method.
		 * 
		 ********************************************************/
		_this.initializeResource = _f.initialSearch;
		_this.initializeApp = _f.initialApplication;
		
		_this.getDomain = function() {
			return _pm.domain;
		},
		_this.getDefaultUrl = function() {
			return _pm.domain+_pm.defaultUrl;
		};
		
		_this.getCssUrl = function() {
			return _pm.domain+_pm.cssUrl;
		};
		
		_this.getMainArea = function() {
			return _pm.mainArea;
		};
		
		_this.setMainArea = function( el ) {
			_pm.mainArea = el;
			_pm.pageParm.el = el;
		};
		
		_this.getMainEditor = function() {
			return _pm.mainEditor;
		};
		
		_this.setMainEditor = function( el ) {
			_pm.mainEditor = el;
		};
		
		_this.goHome = function() {
			parent.top.location.href = _pm.domain;
		};
		// page 이동 공통 _pm.pageParm
		_this.goPage = function( param ) {
			
			var _p = $.extend(true, _pm.pageParm, param );

			requirejs([_p.viewName] , function(_view) {
				new _view({el:_p.el}).render(_p.paramData);
            });
		}
		
		_this.getDefaultLocale = function() {
			return _pm.defaultLocale;
		};
		
		_this.getLocales = function() {
			return _pm.locales;	
		};
		
		_this.setTheme = function(theme) {
			
			_pm.theme = theme;
		};
		
		_this.getTheme = function() {
			
			return _pm.theme;
		};
		
		_this.blockUI = function() {
	
			$.blockUI({
				baseZ: 1030
			});
		};

		/*******************************************************
		 * 
		 * resource return method.. 
		 * 
		 ********************************************************/
		
		_this.getMsg = function( key, group ) {
			
			if( group == undefined || group == '' )
				group = "common";
			
			if( _dts.msg[group] == undefined ) {
				_f.reloadMessage(group);
			}
			
			if( _dts.msg[group][key] == undefined  )
				return "";
			
			return _dts.msg[group][key];
		};
		
		_this.option = {
			get : function( optionId, group ) {
				
				if( group == undefined || group == '' )
					group = "common";
				
				if( _dts.option[group] == undefined ) {
					_f.reloadCode(group);
				}
				
				if( _dts.option[group][optionId] == undefined  )
					return "";
				
				return _dts.option[group][optionId];
			},
			getValue : function( optionId, group ) {
				
				return _this.option.get(optionId, group).value;
			},
			reset : function( group ) {
				
				if( _dts.option[group] != undefined )
					delete _dts.option[group];
			}
		};
		
		_this.code = {
			get : function( codeId, group ) {
				
				if( group == undefined || group == '' )
					group = "common";
				
				if( _dts.code[group] == undefined ) {
					
					_f.reloadCode(group);
				}
				
				if( _dts.code[group][codeId] == undefined  )
					return "";
				
				return _dts.code[group][codeId];
			},
			getValue : function( codeId, group ) {
				
				return _this.code.get(codeId, group).value;
			},
			reset : function( group ) {
				
				if( _dts.code[group] != undefined )
					delete _dts.code[group];
			}
		};
		
		_this.option = {
			get : function( optionId, group ) {
				
				if( group == undefined || group == '' )
					group = "common";
				
				if( _dts.option[group] == undefined ) {
					
					_f.reloadOptions(group);
				}
				
				if( _dts.option[group][optionId] == undefined  )
					return "";
				
				return _dts.option[group][optionId];
			},
			getValue : function( optionId, group ) {
				
				return _this.option.get(optionId, group).value;
			},
			reset : function( group ) {
				
				if( _dts.option[group] != undefined )
					delete _dts.option[group];
			}
		};
		
		
		_this.getConstants = function( constantGroup, constantKey ) {
			
			if ( constantKey === undefined  )
				return _dts.constant[constantGroup];
			else
				return _dts.constant[constantGroup][constantKey];
		};
		
		_this.getSessionInfo = function( sessionKey ) {
			
			if( sessionKey == undefined )
				return _dts.sessionInfo;
			else
				return _dts.sessionInfo[sessionKey];
		};
		
		_this.setSessionInfo = function( sessionObj ) {
			
			_dts.sessionInfo = sessionObj;
		};
		
		
		/*******************************************************
		 * 
		 * alert / confirm
		 * 
		 ********************************************************/
		_this.print = {
			init : function( obj ) {
				
				var def = {
					labels : {
						ok     : 'OK', // 확인
						cancel : 'cancel', // 취소
					},
					delay : 5000,
					buttonReverse : true,
					buttonFocus   : "ok"
				};
				Alertify.set( $.extend(true, def, obj) );
					
				window.alert = this.alert;
			},
			alert : function(msg, callback ) {
//				$("*:focus").blur();
				Alertify.alert(""+msg, function(){
					if (event) {
						if( callback !== undefined )
							callback();
					} 
					_this.winScrollTop();
				});
				
			},
			confirm : function(msg , callback ) {
				$("*:focus").blur();
				Alertify.confirm(""+msg, function (event) {
					
					if (event) {
						if( callback !== undefined )
							callback();
					} 
				});
				
			}
		};
		
		/*******************************************************
		 * 
		 * browser manager..
		 * 
		 ********************************************************/
		
		_this.addWinResizeEvent = function(name, callbackFunc){
			
			MngEvent.addWinResizeEvent(name, callbackFunc);
		};
		
		_this.removeWinResizeEvent = function(name){
			
			MngEvent.removeWinResizeEvent(name);
		};
		
		_this.winResize = function()
		{
			
			MngEvent.execWinResize();
		};
		
		_this.winResizeStart = function() {
			
			MngEvent.startWindResize();
		};
		
		_this.winScrollTop = function(){
			/**
			* 부모창의 scroll 을 상단으로 옮긴다.
			*/
			$("html, body").animate({scrollTop: 0}, 200);
		};
		
		/*******************************************************
		 * 
		 * action helper
		 * 
		 ********************************************************/
		_this.addEvent = function(el, type, func) {
			
			el.off().on(type, func);
		};
		_this.send = function(param)
		{
			
			if( _dts.isStopAjax ) // 세션이 없으면 send 하지 않는다.
				return; 
			
			
			
			var sendParam = $.extend(true, {}, _pm.ajaxParam, param);

			if( sendParam.url == undefined 
					|| sendParam.url == "" )
			{
				_this.print.alert("Menu URL is NULL");
				return;
			}
			
			if( sendParam.contentType == 'application/json'  && sendParam.type.toUpperCase() != "GET")
				sendParam.data = JSON.stringify(sendParam.data);
			
			$.ajax(sendParam);
		};
		
		
		return _this;
	};
	
	return new basicInfo();
	
});