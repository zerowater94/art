define(['mngEvent', 'wgHelper'
        ], function (MngEvent, wgHelper) {
	
	'use strict';
	
	var _funcs = function() {
		
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
		
		var _els = {} ; // elements
		var _f = {
			html   : {
				formBody : function() {
					return "<div class='form-body'></div>";
				},
			},
			render : function(el, obj){
				
				var _opt = $.extend(true,{},_pm, obj );
				el.empty();
				
				// row box 생성
				var boxObj = wgHelper.rowBox.render(el,{
					title   : _opt.title,
					buttons : [{
						name : wgHelper.msg.search,
						callbackFunc : _opt.searchFunc
					}]
				});
				
				boxObj.elBoxBody.addClass("search-area");
				boxObj.elBoxBody.append(_f.html.formBody());
				
				var elBody = boxObj.elBoxBody.find(".form-body");
				var obj, areaForm;
				
				wgHelper.makeForm.execBatch(elBody, _opt.formList);

				var _searchData = function() {
					
					var rtnObj = {};
					var obj;
					for( var idx = 0 ; idx < _opt.formList.length; idx++ ) {
						obj = _opt.formList[idx];
						if ( obj.type == 'select' )
							rtnObj[obj.id] = elBody.find("#"+obj.id).val();
						else
							rtnObj[obj.id] = elBody.find("#"+obj.id).val();
					}
					return rtnObj;
				};
				
				return {
					searchData : _searchData,
					addButton : boxObj.addButtion
				};
			}
		};
				
		_this.render = _f.render;

		return _this;
	}; 
	
	return _funcs;
});