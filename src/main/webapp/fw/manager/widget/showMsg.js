define(['mngEvent', 'wgHelper'
        ], function ($aEvent, $aWg) {
	
	'use strict';
	
	var _pm = {
		msg : "",
		callbackFunc : null,
		type : 'seccess',
	} ; // param
	
	var _els = {} ; // elements
	
	var _f = {
		html   : {
			showMsg : function( obj ) {
				var rtnHtml = '<div class="alert alert-'+obj.type+'">';
				rtnHtml += '<strong>'+obj.msg+'</strong>';
				rtnHtml += '<button type="button" class="close" >×</button>';
				rtnHtml +='</div>';
				return rtnHtml;
			},
		},
		init : function(elObj) {

			_els.areaMain   = elObj.areaMain;
			_els.areaShowMsg = elObj.areaShowMsg;
			
		},
		render : function(obj){
			
			var _opt = $.extend(true,{},_pm, obj );
			
			_els.areaShowMsg.append(_f.html.showMsg(_opt));
			var _alert = _els.areaShowMsg.children(".alert").last();
			var _btnClose = _alert.find("button.close");
			_els.areaShowMsg.animate({
	            bottom: "150px", 
	        }, 500 );
			_alert.animate({
	            opacity: 1, 
	        }, 1000 );
			
			setTimeout(function(){
				_els.areaShowMsg.animate({
		            bottom: "0px", 
		        }, 1000 );
				
			}, 200);
			
			var _fHideMsg = function() {
				
				_alert.animate({
		            opacity:0, 
		        }, 1000 );
				
				setTimeout(function(){
					_alert.remove();
				}, 1000);
			};
			$aEvent.addEvent(_btnClose,"click", _fHideMsg);
			setTimeout(_fHideMsg, 4000);
			
			if( _opt.callbackFunc != null )
				_opt.callbackFunc();
		}
	};
	
	
	return {
		initialize : _f.init,
		render     : _f.render
	};
});