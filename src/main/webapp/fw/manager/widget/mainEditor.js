define(['mngEvent', 'wgHelper',
        'text!../../../../../fw/manager/tmpl/mainEditor.html'
        ], function (MngEvent, _wg, _tmpl) {
	
	'use strict';
	
	var _funcs = function() {
		
		var _this = {};
		
		var _pm = {
			title : null,
			showToolbar  : true,
			buttons      : null,
			formList     : null,
			callBackHide : null,
			callBackShow : null
		} ; // param
		
		var _els = {} ; // elements
		var _f = {
			
			html : {
				
				mainDetail : function() {
					var rtnHtml = '<ul class="nav nav-tabs"></ul>';
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
				_els.areaEditor = elObj.areaEditor;
				
				_els.areaEditor.html(_.template(_tmpl));
				
				_els.editPanel = _els.areaEditor.find(".panel");
				_els.editTitle = _els.editPanel.find(".panel-title");
				_els.editBody = _els.editPanel.find(".panel-body");
				_els.editToolbar = _els.editPanel.find(".panel-toolbar");
				MngEvent.addEvent(_els.editPanel.find(".close"), "click", _f.hideEditor);
				
			},
			render : function( obj ) {
				_pm = {
					title : null,
					showToolbar  : true,
					buttons      : [],
					formList     : [],
					callBackHide : null,
					callBackShow : null
				};

				$.extend(true, _pm, obj );
				_els.editTitle.text(_pm.title);
				_els.editPanel.addClass("panel-default");
				_els.editToolbar.empty();
				_els.editBody.empty();
				
				if ( _pm.showToolbar ) {
					
					for( var idx = 0 ; idx < _pm.buttons.length; idx++ ) {
						
						_wg.button.render(_els.editToolbar, $.extend(true, {btnCls:"btn-default btn-sm"}, _pm.buttons[idx]));
					}
				}
				
				_wg.makeForm.execBatch(_els.editBody, _pm.formList);
				
				_els.areaEditor.width(320).css({
					position: "absolute",
					right : -(_els.areaEditor.width())
				});
				_els.areaEditor.hide();
				
			},
			showEditor : function(){
				
				_els.areaEditor.show();
				
				_els.areaMain.closest(".area-inner").animate({
		            marginRight: _els.areaEditor.width(),
		        }, 500 );
				
				_els.areaEditor.animate({
		            right: 2, 
		            opacity:1,
		            display:'block'
		        }, 500 );
				
				setTimeout(function(){

					if ( _pm.callBackShow != null )
						_pm.callBackShow();
					
					MngEvent.execWinResize();
				}, 500);
			},
			hideEditor : function() {
				
				_els.areaMain.closest(".area-inner").animate({
					marginRight: "0px"
		        }, 500 );

				_els.areaEditor.animate({
		            right  : -(_els.areaMain.width()+10),
		            opacity:0,
		        }, 500 );
				
				setTimeout(function(){
					
					if ( _pm.callBackHide != null )
						_pm.callBackHide();
					_els.areaEditor.hide();
					
					MngEvent.execWinResize();
				}, 500);
				
			},
			getInputValue : function() {
				
				var rtnObj = {};
				var obj;
				console.log(this.options);
				for( var idx = 0 ; idx < this.options.formList.length; idx++ ) {
					obj = this.options.formList[idx];

					if ( obj.type == 'custom' )
						continue;
						
					if ( obj.type == 'date' )
						rtnObj[obj.id] = _els.editBody.find("#"+obj.id).val();
					else
						rtnObj[obj.id] = _els.editBody.find("#"+obj.id).val(); //text , textarea, select
				}
				return rtnObj;
			},
			getContents : function() {
				return _els.editBody;
			}
		};
				
		_this.initialize = _f.init;
		_this.render = _f.render;
		_this.showEditor = _f.showEditor;
		_this.hideEditor = _f.hideEditor;
		_this.getInputValue = _f.getInputValue;
		_this.getContents = _f.getContents;
		
		return _this;
	}; 
	
	return _funcs;
});