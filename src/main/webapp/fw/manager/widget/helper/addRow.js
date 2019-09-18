define(['mngEvent', 'basicUtil' 
        ], function ($aEvent, $aUtil) {
	
	'use strict';
	
	var _pm = {
		id   : "",
		cols : []
	};
	
	var _colOpt = {
		colCnt : 12,
		colCls : ""
	};
	
	var _f = {
		html   : {
			addRow : function( obj ) {
				return '<div class="col-sm-'+obj.colCnt+' '+obj.colCls+' " ></div>';
			},
		},	
		render : function( el, obj ) {
			
			var _opt = $.extend(true,{}, _pm, obj );

			el.append('<div class="row" id="'+_opt.id+'" ><div>');
			var rowEl = el.find(".row").last();
			for( var idx = 0 ; idx < _opt.cols.length; idx++ ) {
				rowEl.append(_f.html.addRow($.extend(true,{},_colOpt, _opt.cols[idx] )));
			}
			return {
				el : rowEl
			};
		}
	};
	
	return {
		render : _f.render
	};
});