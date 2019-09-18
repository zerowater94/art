define(['mngEvent', 'wgHelper'
        ], function ($aEvent, $aWg) {
	
	'use strict';
	
	var styleSwitcher = function($el , param) {
		var icon = $el.find("#switcher-link").find("i");
		
		
		return {
			show : function() {
				$el.show();
			},
			hide : function() {
				$el.hide();
			} 
		};
	};
	
	var _f = {
		options : {
			
		},
		els : {
			
		},
		msg : {
			
		},
		init : function( $el ) {
			_f.els.switcher = $el;
			_f.els.switcherIcon = $el.find("#switcher-link").find("i");
			
			$aEvent.addEvent(_f.els.switcher,'click',function(){
				_f.els.switcherIcon.toggleClass("fa-spin");
			});
		},
		hide : function() {
			_f.els.switcher.hide();
		},
		show : function() {
			_f.els.switcher.show();
		},
		isActive : function() {
			return _f.els.switcherIcon.hasClass("fa-spin");
		},
		active : function( bln ) {
			if ( bln )
				_f.els.switcherIcon.addClass("fa-spin");
			else
				_f.els.switcherIcon.removeClass("fa-spin");
		}
	};
	
	

	return {
		initialize : _f.init,
		hide : _f.hide,
		show : _f.show,
		isActive : _f.isActive,
		active : _f.active
	};
	
});