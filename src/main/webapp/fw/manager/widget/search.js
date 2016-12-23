define(['mngEvent', 'wgHelper'
        ], function ($aEvent, $aWg) {
	
	'use strict';
	
	return function() {
		
		var _this = {};
		
		var _pm = {
			title        : null,
			formList     : null,
			searchFunc   : null
		} ; // param
		
		var _formObj = {
			id   : null,
			type : "text" // text / select / checkbox, radio ,
		};
		
		var _els = {
			currBoxBox : null,
			currFormBody : null
		} ; // elements
		
		var _dts = {
			currBoxObj : null,
		};
		var _f = {
			html   : {
				formBody : function() {
					return "<div class='form-body'></div>";
				},
			},
			render : function(el, obj){
				
				_pm = {
					title        : null,
					formList     : null,
					searchFunc   : null
				};

				$.extend(true, _pm, obj );
					
				el.empty();
				
				// row box 생성
				_dts.currBoxObj = $aWg.rowBox.render(el,{
					title   : _pm.title,
					buttons : [{
						name : $aWg.msg.search,
						callbackFunc : _pm.searchFunc
					}]
				});
				
				_els.currBoxBox = _dts.currBoxObj.elBoxBody;
				
				_els.currBoxBox.addClass("search-area");
				_els.currBoxBox.append(_f.html.formBody());
				
				_els.currFormBody = _els.currBoxBox.find(".form-body");
				var obj, areaForm;
				
				return $aWg.makeForm.execBatch(_els.currFormBody, _pm.formList);
			},
			addButton : function(obj) {
				_dts.currBoxObj.addButton(obj);
			},
			getSearchValue : function() {
				return $aWg.makeForm.getFormValues(_els.currFormBody, _pm.formList);
			}
		};
				
		_this.render = _f.render;
		_this.addButton = _f.addButton;
		_this.getSearchValue = _f.getSearchValue;

		return _this;
	}; 
});