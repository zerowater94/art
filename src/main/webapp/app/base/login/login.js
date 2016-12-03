define([ 'abstractView', 'basicInfo', 'basicUtil', 'basicValid'
         ,'text!base/login/login.html'
         , '../../../libs/security/aes'
       ], function ( AbstractView , BasicInfo, BasicUtil, BasicValid,  Tmpl) {
	

	'use strict';
		
	var _funcs = function( thisEl ) {
		
		var _this = this;
		
		var _pm  = {
			type : 'login' ,  // type : login/setup
			callbackFunc : null
		} ; // param
		var _els  = {} ; // elements
		var _dts = {};
		var _f   = {
			// 암호화를 위한 Key를 요청한다.
			reqEncKey : function( paramData ) {
				var encData;
				BasicInfo.send({
					url : BasicInfo.getDefaultUrl()+"/base/login/encrypt/getKey",
					type : "get",
					success : function(data) {
						var encKey = CryptoJS.enc.Base64.parse(data.secureKey).toString(CryptoJS.enc.Utf8);
						var inxKey = parseInt(data.indexKey,10);
						var inxIv  = parseInt(data.indexIv, 10);
						var key = CryptoJS.enc.Latin1.parse( encKey.substring(inxKey, (inxKey+16)) );
						var iv = CryptoJS.enc.Latin1.parse( encKey.substring(inxIv, (inxIv+16)) );
						
						encData = CryptoJS.AES.encrypt(paramData, key, { 
							iv: iv,
							mode: CryptoJS.mode.CBC,
							keySize: 256 / 32,
							padding: CryptoJS.pad.Pkcs7
						});
					}
				});
				return encData;
			},
			// password enter action
			addEnterId : function ( e ) {
				
				if (e.keyCode == 13){
					_els.fmPassword.focus();
			    }  
			},
			// password enter action
			addEnterPwd : function ( e ) {
				
				if (e.keyCode == 13){
					_f.executeLogin();
			    }  
			},
			// 로그인 처리
			executeLogin : function() {
console.log("DDD");
				// valiation  체크.
				var _p = {
					selector : _els.fmLoginId,
					chkEmpty : true,
					chkMaxLength:50,
					chkMinLength:4
				};

				if( !BasicValid.isValidParam(_p))
					return;
				
				_p.selector = _els.fmPassword;
				_p.chkMinLength = 8;
				if( !BasicValid.isValidParam(_p))
					return;
				
				// 암호화..
				var encData = _f.reqEncKey(JSON.stringify({
					loginId   : _els.fmLoginId.val(),
					password  : _els.fmPassword.val(),
					loginType : _pm.type 
				}));
				
				BasicInfo.send({
					url : BasicInfo.getDefaultUrl()+"/base/login/execute/login",
					data : {
						encData : encodeURI(encData.toString())
					},
					success : function(data) {
						
						if( data.result ) {
							thisEl.removeClass("login");
							_pm.callbackFunc();
						}else {

							if ( data.resultCode == BasicInfo.getConstants("RESULT", "NO_AUTH") ) {
								BasicInfo.print.alert("fail..");
							} else  {
								BasicInfo.print.alert(data.resultMessage);
							}
							
						}
					}
				});
					
			},
		}; // functions..
		
		
		/*************************************************
		 * common structure
		 *************************************************/
		 _this.setParam = function(obj) {
			
			_pm = $.extend( true, _pm ,obj);
		};
		
		_this.createPage = function() {
			
			thisEl.addClass("login");
			var tmpl = _.template(Tmpl);
			thisEl.html(tmpl({
				lbl_saveUserID : "id기억하기", //아이디 기억하기
				lbl_login      : "로그인",  //로그인
				lbl_forgetPwd  : "비밀번호찾기"  //비밀번호 찾기
			}));
			
			// setElment.
			_els.btnLogin  = thisEl.find("#btn-login");
			_els.fmLoginId = thisEl.find("#fm-login");
			_els.fmPassword = thisEl.find("#fm-password");
		};
		
		_this.reloadContents = function() {
			
			
			_els.fmLoginId.focus();
			
			thisEl.find("#login").find("label").addClass("text-temp-css");
			
			BasicInfo.addEvent(_els.btnLogin, "click", _f.executeLogin);
			BasicInfo.addEvent(_els.fmLoginId, "keypress", _f.addEnterId);
			BasicInfo.addEvent(_els.fmPassword, "keypress", _f.addEnterPwd);
		};
		
		_this.returns = {
			
		};
		return _this;
	};
	
	return AbstractView.extend({
		executor : _funcs
	});

});
