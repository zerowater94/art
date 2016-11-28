define(['jquery'], function ($) {
	var _winResize = {};
	var _timeOut = 500;
	var _isVaidWindResize = false;
	
	var _addWinResize = function(name, callbackFunc) {
		
		_winResize[name] = callbackFunc;
			
	};
	
	var _rmResizeEvent = function(name) {
		
		delete _winResize[name];
	};
	
	var _execWinResize = function() {

		$.each(_winResize, function(key, func) {
		    func();
		});
	};
	
	var _clearResizeEvent = function() {
		
		$.each(_winResize, function(key, func) {
		    if ( !key.startsWith("WIN-MAIN") )
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
	
	return {
		addWinResizeEvent : _addWinResize,
		removeWinResizeEvent : _rmResizeEvent,
		execWinResize : _execWinResize,
		startWinResize : _startWinResize,
		clearWinResize : _clearResizeEvent
	}
});