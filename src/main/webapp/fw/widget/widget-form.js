define([ 'abstractView', 'basicInfo', 'basicUtil',
       ], function ( AbstractView , BasicInfo, BasicUtil) {
	
	'use strict';
		
	var _funcs = function( thisEl ) {
		
		var _this = this;
		
		var _pm = {
			
		} ; // param
		var _el = {
			
		} ; // elements
		var _f = {
			
		}; // functions..
		
		/*************************************************
		 * common structure
		 *************************************************/
		 _this.setParam = function(obj) {
			
			_pm = $.extend( true, _pm ,obj);
		};
		
		_this.createPage = function() {
		};
		
		_this.reloadContents = function() {
			
		};
		
		_this.returns = {
			
		};
		return _this;
	};
	
	return AbstractView.extend({
		executor : _funcs
	});

});
