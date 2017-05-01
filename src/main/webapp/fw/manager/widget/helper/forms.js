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
	});
	
	
	return {
		app : null,
		initialize : function(msgObj) {
			this.app = new wgApp($aWg.els.areaSearchUser);
			$.extend(true, _msg, msgObj);
		},
		makeForms : function() {},
		setValues : function() {},
		getValues : function() {}
	};
});