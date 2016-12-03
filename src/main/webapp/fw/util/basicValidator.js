define(['jquery','basicUtil'], function ($, $aUtil) {
	
	var validator = function() {
		
		var _this = this;
		var _options = {
			selector:null
			,chkMaxLength:-1
			,chkMinLength:-1
			,chkEmpty:false
			,chkOnlyEngNum:false
			,chkOnlyEng:false
			,chkOnlyNum:false
			,chkCurrency:false // 통화 형태( 숫자에 ., 포함 가능)
			,chkNotHangul:false
		};
		
		var _msg = {
			noSelector : "not selected selector",
			maxLength  : "exceed max length[{#1}]",
			minLenth   : "you must input over than {#1}",
			noEmpty    : "",
			onlyEngNum : "",
			onlyNum    : "",
			onlyEng    : "",
			cannotKor  : "",
		};
		
		var _showSuccess = function(selector )
		{
			// valid  체크
			selector.after('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
			selector.closest("div").addClass("has-success");
			
			setTimeout(function() {
				selector.closest("div").find(".form-control-feedback").remove();
				selector.closest("div").removeClass("has-success");
			}, 3000);
		};

		var _chkValidData = function(param)
		{
			var chkParam = $.extend(true, {}, _options);
			chkParam = $.extend(true, chkParam, param);
			if( chkParam.selector == undefined )
			{
				_this.showErrorMessage(_msg.noSelector); // 선택자가 지정되지 않았습니다.
				return false;
			}
			var selector = chkParam.selector;
			var data = selector.val();

			var dataByteLen = $aUtil.getLength(data);
			if( chkParam.chkMaxLength != undefined
			   && chkParam.chkMaxLength > 0 
			   && dataByteLen > 0 
			   && dataByteLen >  chkParam.chkMaxLength 
			  )
			{
				_this.showErrorMessage(selector, _msg.maxLength.replace("{#1}",chkParam.chkMaxLength)); // 최대 입력 글자를 초과 하였습니다.
				return false;
			}

			if( chkParam.chkMinLength != undefined
			   && chkParam.chkMinLength > 0 
			   && dataByteLen > 0 
			   && $aUtil.getLength(data) < chkParam.chkMinLength )
			{
				_this.showErrorMessage(selector, _msg.minLenth.replace("{#1}",chkParam.chkMinLength)); //  최소 {#1}자 이상 입력이 되어야 합니다.
				return false;
			}

			if( chkParam.chkEmpty != undefined 
			   && chkParam.chkEmpty )
			{
				if( $aUtil.isEmpty(data) )
				{
					_this.showErrorMessage(selector, _msg.noEmpty); // 필수 입력 입니다.
					return false;
				}
			}

			// 필수 체크가 아닌 경우, 공백이 들어 오면 하단 사항에 대해서 체크 한지 않는다.
			if( $aUtil.isEmpty(data) ) 
				return true;

			if( chkParam.chkOnlyEngNum != undefined 
			   && chkParam.chkOnlyEngNum)
			{
				if( !$aUtil.isEngNumber(data) )
				{
					_this.showErrorMessage(selector, _msg.onlyEngNum); //  영문 및 숫자만 입력 가능합니다.
					return false;
				}
			}

			if( chkParam.chkOnlyEng != undefined 
			   && chkParam.chkOnlyEng)
			{
				if( !$aUtil.isEnglish(data) )
				{
					_this.showErrorMessage(selector, _msg.onlyNum); // 영문자만 입력 가능 합니다.
					return false;
				}
			}

			if( chkParam.chkOnlyNum != undefined 
			   && chkParam.chkOnlyNum)
			{
				if( !$aUtil.isNumber(data) )
				{
					_this.showErrorMessage(selector, _msg.onlyEng); // 숫자만 가능
					return false;
				}
			}
			
			if( chkParam.chkCurrency != undefined 
			   && chkParam.chkCurrency)
			{
				if( !$aUtil.isCurrency(data) )
				{
					_this.showErrorMessage(selector, _msg.onlyNum); // 숫자만 가능 ( ., 가능 )
					return false;
				}
			}

			if( chkParam.chkNotHangul != undefined 
			   && chkParam.chkNotHangul)
			{
				if( $aUtil.isInHangul(data) )
				{
					_this.showErrorMessage(selector, _msg.cannotKor); // 한글 입력 불가
					return false;
				}
			}
			return true;
		};
		
		/**************************************************************************************
		 * 
		 * return method.. 
		 * 
		 ***************************************************************************************/
		
		_this.initializeMessage = function(obj) {
			
			$.extend(true, _msg, obj);
		};
		
		_this.showErrorMessage = function(selector, message )
		{
			var formSelector = selector.closest("div.form-group");
			if( formSelector.hasClass("has-error") )
				return;
			// error 표시
			
			formSelector.append('<span class="help-block-art">&nbsp;<span class=" label label-warning">'+message+'</span></span>');
			formSelector.addClass("has-error");
			setTimeout(function() {
				formSelector.find(".help-block-art").remove();
				formSelector.removeClass("has-error");
			}, 3000);
			
			selector.focus();
		};

		_this.getCheckParam = function(param)
		{
			if( param != undefined )
				return $.extend(true, {}, _options, param);
			else
				return _options;
		};

		_this.isValidParam = function(param)
		{
			var rtnBln = _chkValidData(param);
			
			if( rtnBln){
				// 성공 체크 표시
				_showSuccess(param.selector);
			}
			
			return rtnBln;
		};

		_this.isValidData = function(selector,isEmpty,maxLength, etcOpt)
		{
			var rtnBln = false;
			var _p = {
				selector : selector
			};
			if( isEmpty !== undefined )
				_p.chkEmpty = isEmpty;
			if( maxLength !== undefined )
				_p.chkMaxLength = maxLength;

			if( etcOpt !== undefined )
				_p = $.extend(true, _p, etcOpt);
			
			rtnBln = _chkValidData(_p);
			
			if( rtnBln){
				// 성공 체크 표시
				_showSuccess(selector);
			}
			return  rtnBln;
		};
		
		_this.isValidBatchData = function( parentEl )
		{
			var formArray = parentEl.find('.form-group');
			var len = formArray.length;
			if( len == undefined || len == 0 )
				return;

			var formEl ;
			var chkEl, subEls;
			var chkParam;
			var chkResult;
			
			for( var idx = 0 ; idx < len; idx++ )
			{
				
				formEl = formArray.eq(idx);
				subEls = formEl.find("input:text, textarea, select, checkbox, radio");
				
				if( subEls.length == 0 )
					continue;
				
				for( var jdx = 0; jdx < subEls.length; jdx++ ) {
					
					chkParam = {};
					chkEl = subEls.eq(jdx);
					
					// disaply 여부에 따라서 
					if( !chkEl.is(":visible") || !chkEl.closest("div").is(":visible") )
						continue;
					
					if( chkEl.attr("required") != undefined ){
						chkParam.chkEmpty = true;
					}
					
					if( chkEl.attr("max-length") != undefined ) {
						chkParam.chkMaxLength = chkEl.attr("max-length");
					}
					
					if( chkEl.attr("min-length") != undefined ) {
						chkParam.chkMinLength = chkEl.attr("min-length");
					}
					
					if( chkEl.attr("only-eng") != undefined ) {
						chkParam.chkOnlyEng = true;
					}
					
					if( chkEl.attr("only-engNum") != undefined ) {
						chkParam.chkOnlyEngNum = true;
					}
					
					if( chkEl.attr("only-num") != undefined ) {
						chkParam.chkOnlyNum = true;
					}
					
					if( chkEl.attr("currency") != undefined ) {
						chkParam.chkCurrency = true;
					}
					
					if( chkEl.attr("not-kor") != undefined ) {
						chkParam.chkNotHangul = true;
					}

					if( !$.isEmptyObject(chkParam) ){
						chkParam.selector = chkEl;
						chkResult = _chkValidData(chkParam) ;

						if( !chkResult ) {
							return false;
						}else {
							_showSuccess(chkEl);
						}
					}
				}
				
			}
			return true;
		}


		return _this;
	};
	
	return new validator();
});