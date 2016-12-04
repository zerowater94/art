define([ 'basicInfo'], 
		function ( $a) {
	
	'use strict';
		
	var _funcs = function( thisEl ) {
		
		var _this = {};
		
		var _pm = {
			
		} ; // param
		var _els = {
				
		} ; // elements
		var _f = {
			
		}; // functions..
		
		/*************************************************
		 * common structure
		 *************************************************/
		
		_this.render = function(obj) {
			$.extend( true, _pm ,obj);
			thisEl.html("########################### setup ");
		};
		return _this;
	};
	
	return _funcs;
});
