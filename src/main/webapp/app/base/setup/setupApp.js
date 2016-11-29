define([ 'abstractView', 'basicInfo', 'basicUtil',
       ], function ( AbstractView , BasicInfo, BasicUtil) {
	

	'use strict';
		
	var _funcs = function( thisEl ) {
		
		var _this = this;
		
		var _pm = {
			
		} ; // param
		var _els = {
				
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
			thisEl.html("########################### setup ");
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
