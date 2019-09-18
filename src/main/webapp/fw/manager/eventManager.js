define(['jquery'], function ($) {
	
	var _this = {};
	var _winResizeMain = {};
	var _winResize = {};
	var _timeOut = 500;
	var _isVaidWindResize = false;
	
	_this.addWinResizeEvent = function(name, callbackFunc) {
		
		if ( name.startsWith("WIN-MAIN") )
			_winResizeMain[name] = callbackFunc;
		else
			_winResize[name] = callbackFunc;
			
	};
	
	_this.removeWinResizeEvent = function(name) {
		
		if ( name.startsWith("WIN-MAIN") )
			delete _winResizeMain[name];
		else
			delete _winResize[name];
	};
	
	_this.execWinResize= function() {
		
		$.each(_winResizeMain, function(key, func) {
		    func();
		});
		
		$.each(_winResize, function(key, func) {
		    func();
		});
	};
	
	_this.clearWinResize = function() {
		
		$.each(_winResize, function(key, func) {
		    delete _winResize[key];
		});
	};
	
	_this.startWinResize = function() {
		
		$(window).resize(function()
		{	
			clearTimeout(window.resizedFinished);
		    window.resizedFinished = setTimeout(function(){
		    	_this.execWinResize();
		    }, _timeOut);

		});
	};
	
	_this.addEvent = function(el, type, func) {
		
		el.off().on(type, func);
	};
	
	_this.addEnterEvent = function(el, func) {
		el.off().on("keypress", function(e) {
			if (e.keyCode == 13) {
				func();
			} 
		})
	};
	
	return _this;
});