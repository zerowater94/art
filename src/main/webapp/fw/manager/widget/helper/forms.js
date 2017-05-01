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
			$.extend(true, this.msg, msgObj);
		}
	};

	var wgApp = Backbone.View.extend({
		els : {},
		initialize : function(el, msgObj) {
			this.$el = el;
			$.extend(true, _msg, msgObj);
		},
		render : function(obj) {
			
		}
	});
	
	
	return {
		app : null,
		initialize : function() {
			this.app = new wgApp($aWg.els.areaSearchUser);
			this.app.render();
		},
		showSearchUser : function() {
			
		}
	};
});