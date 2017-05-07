define(['mngEvent', 'basicUtil' ,
	'fw/manager/widget/helper/button',
	'fw/manager/widget/helper/makeFormFile'
        ], function ($aEvent, $aUtil, $aWgButton, $aWgFile ) {
	
	'use strict';
	var _pm = {
		type   : "text",
		id     : 'form-'+$.guid,
		label  : "",
		labelCls : "",
		inputCls : "",
		formGroupCls : "input-group",
		placeholder : "",
		validation : {
			readOnly   : false,
			required   : false,
			maxLength  : null,
			minLength  : null,
			onlyEng    : null,
			onlyEngNum : null,
			onlyNum    : null,
			currency   : null,
			notKor     : null,
		},
		addedBtn : null,
		typeOpt  : null
	}
	var gApp = {
		msg : {
			blankStr   : "::::::",
			search     : "Search",
		},
		initialize : function( msgObj ) {
			
		}
	};

	var wgApp = Backbone.View.extend({
		els : {},
		initialize : function(msgObj) {
			
		},
		text : function() {
			
		},
		textarea : function() {
			
		}
	});
	
	return {
		app : null,
		initialize : function(msgObj) {
			this.app = new wgApp($aWg.els.areaSearchUser);
			$.extend(true, _msg, msgObj);
		},
		make : function(el, formList) {
			var _rtnElObj = {};
			var _obj;
			
			if ( formList.length == undefined )
				return {};
			
			for( var idx = 0 ; idx < formList.length; idx++ ) {
				_obj = formList[idx];
				_rtnElObj[_obj.id] = _f.addNewForm( el, _obj);
			}
			return _rtnElObj;
		},
		setValues : function() {
			
		},
		getValues : function() {
			
		}
	};
});