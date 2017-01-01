define(['mngEvent', 'basicUtil' 
        ], function ($aEvent, $aUtil) {
	
	'use strict';
	
	var _pm = {
		name : null,
		btnCls : null,
		id   : $.guid,
		callbackFunc : null	
	};
	
	var _f = {
		html   : {
			button : function( obj ) {
				return '<button type="button" class="btn '+obj.btnCls+'" id="'+obj.id+'">'+obj.name+'</button>\n';
			},
		},	
		render : function( el, obj ) {
			
			var _opt = $.extend(true,{}, _pm, obj );
			el.append( _f.html.button(_opt));
			var elBtnEl = el.find("button").last();
			elBtnEl.click(function(e){
				if ( _opt.callbackFunc != null )
					_opt.callbackFunc(e);
				$(this).blur();
			});
			return elBtnEl;
		}
	};
	
	return {
		render : _f.render
	};
});