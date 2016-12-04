define([ 'basicInfo
         ,'text!base/login/login.html'
         , '../../../libs/security/aes'
       ], function ( $a, Tmpl) {
	

	'use strict';
		
	return function( thisEl ) {
		
		var _this = this;
		
		var _pm  = {
			type : 'login' ,  // type : login/setup
			callbackFunc : null
		} ; // param
		var _els  = {} ; // elements
		var _dts = {};
		var _f   = {
			createPage : function() {
				
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
				_els.fmLoginId.focus();
				thisEl.find("#login").find("label").addClass("text-temp-css");
			},
			addEvent : function() {
				
				$a.e.addEvent(_els.btnLogin, "click", _f.executeLogin);
				$a.e.addEvent(_els.fmLoginId, "keypress", _f.addEnterId);
				$a.e.addEvent(_els.fmPassword, "keypress", _f.addEnterPwd);
				
			},
			// 암호화를 위한 Key를 요청한다.
			reqEncKey : function( paramData ) {
				var encData;
				$a.send({
					url : $a.getDefaultUrl()+"/base/login/encrypt/getKey",
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

				// valiation  체크.
				var _p = {
					selector : _els.fmLoginId,
					chkEmpty : true,
					chkMaxLength:50,
					chkMinLength:4
				};

				if( !$a.v.isValidParam(_p))
					return;
				
				_p.selector = _els.fmPassword;
				_p.chkMinLength = 8;
				if( !$a.v.isValidParam(_p))
					return;
				
				// 암호화..
				var encData = _f.reqEncKey(JSON.stringify({
					loginId   : _els.fmLoginId.val(),
					password  : _els.fmPassword.val(),
					loginType : _pm.type 
				}));
				
				$a.send({
					url : $a.getDefaultUrl()+"/base/login/execute/login",
					data : {
						encData : encodeURI(encData.toString())
					},
					success : function(data) {
						
						if( data.result ) {
							thisEl.removeClass("login");
							_pm.callbackFunc();
						}else {

							if ( data.resultCode == $a.getConstants("RESULT", "NO_AUTH") ) {
								$a.print.alert("fail..");
							} else  {
								$a.print.alert(data.resultMessage);
							}
							
						}
					}
				});
					
			},
		}; // functions..
		
		// return method...
		_this.render = function( obj ) {
			$.extend( true, _pm ,obj);
			_f.createPage();
			_f.addEvent();
		}
		
		return _this;
	};
});
