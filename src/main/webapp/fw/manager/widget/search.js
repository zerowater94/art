define(['mngEvent', 'wgHelper'
        ], function ($aEvent, $aWg) {
	
	'use strict';
	
	var _pm = {
		title        : null,
		hideTitle    : false,
		buttons      : [],
		formList     : null,
		searchFunc   : null
	} ; // param
	
	var _formObj = {
		id   : null,
		type : "text" // text / select / checkbox, radio ,
	};
	var _msg = {
		blankStr   : "::::::",
		search     : "Search",
	};
	
	var _f = {
		initMsg : function( obj ) {
			
			$.extend(true, _msg, obj);
		},
		render : function(el, obj){
			
			var _opt = $.extend(true, {} ,_pm, obj );
			el.empty();
			// row box 생성
			_opt.buttons.push({
				name     : _msg.search,
				btnCls   : 'btn-default btn-xs pull-right',
				callbackFunc : _opt.searchFunc
			});
			var searchBox = $aWg.rowBox.render(el,_opt);
			
			searchBox.elBoxBody.addClass("search-area");
			var elForms = $aWg.makeForm.execBatch(searchBox.elBoxBody, _opt.formList);
			
			var colCnt  = (_opt.formList.length > 2)?3:_opt.formList.length;
			searchBox.elBoxBody.find(".form-group").css({
				width : (90/colCnt)+"%"
			});
			
			return {
				elForms : elForms,
				changeTitle : searchBox.changeTitle,
				getValues : function() {
					return $aWg.makeForm.getFormValues(el, _opt.formList);
				},
				setValues : function( obj ) {
					$aWg.makeForm.setFormValues(el, _opt.formList, obj);
				},
				clearValues : function() {
					this.setValues({});
				}
			};
		},	
	};
	
	
	return {
		initMsg : _f.initMsg, 
		render  : _f.render
	};
});