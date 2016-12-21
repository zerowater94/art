define([], function () {
	
	'use strict';
	
	var _funcs = function() {
		
		var _this = {};
		
		var _pm = {
			tabs : null, 
			callbackFunc : null,
			height : null,
		} ; // param
		
		var _tabOptions = {
			tabName : "",
		};
		
		var _els = {} ; // elements
		var _f = {
			
			html : {
				
				mainDetail : function() {
					var rtnHtml = '<div class="main-detail">';
					rtnHtml += '<ul class="nav nav-tabs"></ul>';
					rtnHtml += "<div class='tab-content'></div>";
					return rtnHtml; 
				},
				tabli : function( idx, obj ) {
					return '<li><a data-toggle="tab" href="#tab-'+idx+'">'+obj.tabName+'</a></li>';
				}, 
				tabContents : function( idx, obj ) {
					var rtnHtml = ''
					return '<div id="#tab-'+idx+'" class="tab-pane"></div>';
				}, 
			},
			init : function(elObj) {

				_els.areaMain   = elObj.areaMain;
			},
			render : function( obj ) {
				_pm = {
					tabs : null,
					callbackFunc : null,
					height : 300,
				};
				
				if( _els.areaDetail != undefined && _els.areaMain.length > 0 )
					_els.areaDetail.remove();

				$.extend(true, _pm, obj );
				
				_els.areaMain.append(_f.html.mainDetail());
				_els.areaDetail = _els.areaMain.find(".main-detail");
				_els.tabUl = _els.areaDetail.find("ul.nav");
				_els.tabContents = _els.areaDetail.find(".tab-content");
				
				if ( _pm.tabs != null ) {
					var _obj;
					for( var idx = 0; idx < _pm.tabs.length; idx++ ) {
						_obj = _pm.tabs[idx];
						_els.tabUl.append(_f.html.tabli((idx+1), _obj));
						_els.tabContents.append(_f.html.tabContents((idx+1), _obj));
					}
				}
				_els.areaDetail.hide();
			},
			showDetail : function(){
				
				_els.areaDetail.show();
//				
//				_els.areaMain.closest(".area-inner").animate({
//		            height: (_els.areaMain.height()-_pm.height)+"px",
//		        }, 500 );
//				
//				_els.areaDetail.animate({
//					height: _pm.height+"px", 
//		            opacity:1,
//		        }, 500 );
			}
		}
		
		
		_this.initialize = _f.init;
		_this.render = _f.render;
		_this.showDetail = _f.showDetail;
		
		return _this;
	}; 
	
	return _funcs;
});