define(['mngEvent', 'wgHelper',
        'text!../../../../../fw/manager/tmpl/mainEditor.html'
        ], function ($aEvent, $aWg, _tmpl) {
	
	'use strict';
	
		
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
			$aEvent.addEvent(_els.editPanel.find(".close"), "click", _f.hideEditor);
			
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
					
					$aWg.button.render(_els.editToolbar, $.extend(true, {btnCls:"btn-default btn-sm"}, _pm.buttons[idx]));
				}
			}
			
			var rtnObj = $aWg.makeForm.execBatch(_els.editBody, _pm.formList);
			
			_els.areaEditor.width(320).css({
				position: "absolute",
				right : -(_els.areaEditor.width())
			});
			_els.areaEditor.hide();
			return rtnObj;
			
		},
		showEditor : function(obj){
			
			var showTime = 500;
			if ( _els.areaEditor.is(":visible") )
				showTime = 0 ;
			
			_els.areaEditor.show();
			
			_els.areaMain.closest(".area-inner").animate({
	            marginRight: _els.areaEditor.width(),
	        }, showTime );
			
			_els.areaEditor.animate({
	            right: 2, 
	            opacity:1,
	            display:'block'
	        }, showTime );
			
			setTimeout(function(){

				if ( _pm.callBackShow != null )
					_pm.callBackShow();
				
				if( obj == undefined )
					_f.clearValues();
				else {
					_f.setValues(obj);
					if ( obj.shown !== undefined )
						obj.shown();
				}

				$aEvent.execWinResize();
			}, showTime);
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
				
				$aEvent.execWinResize();
			}, 500);
			
		},
		getValues : function() {
			return $aWg.makeForm.getFormValues(_els.editBody, _pm.formList);
		},
		setValues : function( obj ) {
			$aWg.makeForm.setFormValues(_els.editBody, _pm.formList, obj);
		},
		clearValues : function() {
			_f.setValues({});
		},
		getMainBody : function() {
			return _els.editBody;
		},
	};
			
	_this.initialize  = _f.init;
	_this.render      = _f.render;
	_this.showEditor  = _f.showEditor;
	_this.hideEditor  = _f.hideEditor;
	_this.getMainBody = _f.getMainBody;
	_this.clearValues = _f.clearValues;
	_this.setValues   = _f.setValues;
	_this.getValues   = _f.getValues;
	
	return _this;
	
});