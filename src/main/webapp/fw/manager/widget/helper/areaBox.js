define(['mngEvent', 'basicUtil' 
        ], function ($aEvent, $aUtil) {
	
	'use strict';
	
	var _pm = {
		contents : ""
	};
	
	var _f = {
		html   : {
			areaBox : function() {
				return '<div class="area-color"></div>';
			}
		},	
		render : function( el, obj ) {
			
			var _opt = $.extend(true,{}, _pm, obj );
			el.html(_f.html.areaBox());
			var elBox = el.find(".area-color");
			elBox.html($aUtil.toHtmlFormat(_opt.contents));
		}
	};
	
	return {
		render : _f.render
	};
});