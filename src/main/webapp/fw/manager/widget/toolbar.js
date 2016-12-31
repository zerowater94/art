define(['mngEvent', 'wgHelper'
        ], function ($aEvent, $aWg) {
	
	'use strict';
		
	var _this = {};
	var _pm = {
		colClass : 'col-lg-12',
		boxClass : null,
		id       : $.guid, 
		buttons  : null,
	} ; // param
	
	var _els = {} ; // elements
	var _f = {
		html : {
			toolbar : function( obj ) {
				
				var rtnHtml = '<div class="box">';
				rtnHtml += '<header><div class="toolbar" id="'+obj.id+'"></div></header>';
				rtnHtml += "</div>";
				return rtnHtml; 
			},
		},
		init : function(elObj) {

			_els.areaMain   = elObj.areaMain;
			
		},
		render : function(el, obj){
			
			var _opt = $.extend(true,{},_pm, obj );
			
			el.html( _f.html.toolbar(_opt));
			
			if( _opt.boxClass != null )
				el.find(".box").addClass(_opt.boxClass);
			
			var _areaToolbar = el.find(".toolbar");
			
			if( _opt.buttons != null ) {
				
				for( var idx = 0 ; idx < _opt.buttons.length; idx++ ) {
					
					$aWg.render(_areaToolbar, $.extend(true, {btnCls:"btn-default btn-xs"}, _opt.buttons[idx]));
				}
			}
			
			return _areaToolbar;
		}
	};
			
	_this.render = _f.render;

	return _this;
});