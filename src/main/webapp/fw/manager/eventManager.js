define(['jquery'], function ($) {
	
	var _funcs = function() {
		
		var _winResizeMain = {};
		var _winResize = {};
		var _timeOut = 500;
		var _isVaidWindResize = false;
		
		var _addWinResize = function(name, callbackFunc) {
			
			if ( name.startsWith("WIN-MAIN") )
				_winResizeMain[name] = callbackFunc;
			else
				_winResize[name] = callbackFunc;
				
		};
		
		var _rmResizeEvent = function(name) {
			
			if ( name.startsWith("WIN-MAIN") )
				delete _winResizeMain[name];
			else
				delete _winResize[name];
		};
		
		var _execWinResize = function() {
			
			$.each(_winResizeMain, function(key, func) {
			    func();
			});
			
			$.each(_winResize, function(key, func) {
			    func();
			});
		};
		
		var _clearResizeEvent = function() {
			
			$.each(_winResize, function(key, func) {
			    delete _winResize[key];
			});
		};
		
		var _startWinResize = function() {
			
			$(window).resize(function()
			{	
				clearTimeout(window.resizedFinished);
			    window.resizedFinished = setTimeout(function(){
			    	_execWinResize();
			    }, _timeOut);

			});
		};
		
		var _addEvent = function(el, type, func) {
			
			el.off().on(type, func);
		};
		
		return {
			addWinResizeEvent : _addWinResize,
			removeWinResizeEvent : _rmResizeEvent,
			execWinResize : _execWinResize,
			startWinResize : _startWinResize,
			clearWinResize : _clearResizeEvent,
			addEvent : _addEvent
		};
	};
	
	return new _funcs();
	
});