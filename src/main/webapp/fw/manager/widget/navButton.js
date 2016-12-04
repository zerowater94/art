define(['mngEvent', 'wgHelper'
        ], function (MngEvent, wgHelper) {
	
	'use strict';
	
	return function() {
		
		var _this = {};
		
		var _pm = {
			id      : "",
			linkCss : "",
			title   : "",
			btnCss  : ""
		} ; // param
		
		var _els = {} ; // elements
		var _f = {
			html   : {
				nvButton : function(obj) {
					var rtnHtml = '<div class="btn-group">';
					rtnHtml += '<a data-toggle="tooltip" data-original-title="'+obj.title+'" data-placement="bottom" class="btn '+obj.linkCss+'" id="'+obj.id+'">';
					rtnHtml += '<i class="'+obj.btnCss+'"></i>';
					rtnHtml += '</a></div>';
					return rtnHtml;
				},
			},
			add : function(el, obj){
				
				var _btnOpt = $.extend(true, {}, this.options, obj );
				el.append(_f.html.nvButton(_btnOpt));
			}
		};
				
		_this.add = _f.add;

		return _this;
	}; 
});