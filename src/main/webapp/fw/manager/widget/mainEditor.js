define(['mngEvent', 'basicValid', 'wgHelper',
        'text!fw/manager/tmpl/mainEditor.html'
        ], function ($aEvent, $aValid, $aWg, _tmpl) {
	
	'use strict';
	
		
	var _this = {};
	
	var _pm = {
		title : null,
		direction    : "right",
		isWritable   : false,
		titleIcon    : null,
		showToolbar  : true,
		buttons      : null,
		formList     : null,
		callBackHide : null,
		callBackShow : null
	} ; // param
	
	var _els = {} ; // elements
	var _dts = {
		isBottom : false
	};

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
		init : function() {

			_els.areaMain   = $aWg.els.areaMain;
			_els.areaEditor = $aWg.els.areaEditor;
			
			_els.areaEditor.html(_.template(_tmpl));
			
			_els.editPanel = _els.areaEditor.find(".panel");
			_els.editTitle = _els.editPanel.find(".panel-title");
			_els.editBody = _els.editPanel.find(".panel-body");
			_els.editToolbar = _els.editPanel.find(".panel-toolbar");
			_els.btnChgLocation = _els.editPanel.find(".location");
			_els.btnChgLocationImg = _els.btnChgLocation.find("i");
			$aEvent.addEvent(_els.editPanel.find(".close"), "click", _f.hideEditor);
			$aEvent.addEvent(_els.editPanel.find(".location"),"click",_f.changeLocation);
			
		},
		setLocation : function() {
			
			if( _els.areaEditor.hasClass("panel-bottom") ) {
				_dts.isBottom = true;
				_els.areaMain.addClass("editor-bottom");
				_els.btnChgLocationImg.removeClass().addClass("fa fa-arrow-right");
			}else {
				_dts.isBottom = false;
				_els.areaMain.removeClass("editor-bottom");
				_els.btnChgLocationImg.removeClass().addClass("fa fa-arrow-down");
			}
		},
		render : function( obj ) {
			_pm = {
				title : null,
				direction    : "right",
				isWritable   : false,
				titleIcon    : null,
				showToolbar  : true,
				buttons      : [],
				formList     : [],
				callBackHide : null,
				callBackShow : null
			};

			$.extend(true, _pm, obj );
			
			_els.areaEditor.removeClass("panel-right").removeClass("panel-bottom");
			_els.areaEditor.addClass("panel-"+_pm.direction);
			
			_f.setLocation();

			_f.setTitle(_pm.title);
			if(_pm.titleICon != null )
				_f.setTitleIcon('edit');
			_els.editPanel.addClass("panel-default");
			_els.editToolbar.empty();
			_els.editBody.empty();
			
			if ( _pm.showToolbar ) {
				for( var idx = 0 ; idx < _pm.buttons.length; idx++ ) {
					$aWg.button.render(_els.editToolbar, $.extend(true, {btnCls:"btn-default btn-sm"}, _pm.buttons[idx]));
				}
			}
			// 
			var formObj ; 
			for( var idx =0 ; idx < _pm.formList.length; idx++ ) {
				formObj = _pm.formList[idx];

				if ( !( formObj.type == 'textarea' || formObj.type == 'etc-info' || formObj.type == 'custom') ) {
					
					if ( formObj.formGroupCls == undefined ) {
						formObj.formGroupCls = "input-group multi-rows";
					} else {
						formObj.formGroupCls += " input-group multi-rows";
					}
				}
			}
			
			var rtnObj = $aWg.makeForm.execBatch(_els.editBody, _pm.formList);
			
			_els.areaEditor.css({
				right : -(_els.areaEditor.width())
			});
			_els.areaEditor.hide();
			return rtnObj;
			
		},
		setTitle : function( title ) {
			_els.editTitle.html(title+"&nbsp;&nbsp;<i class='fa fa-plus-square'></i>");
		},
		setTitleIcon : function( inputMode ) {
			if ( inputMode == undefined ) {
				_els.editTitle.find("i").removeClass();
				return;
			}
				
			if ( inputMode == 'I')
				_els.editTitle.find("i").removeClass().addClass("fa fa-plus-square");
			else if ( inputMode == 'U' )
				_els.editTitle.find("i").removeClass().addClass("fa fa-pencil-square");
			else if ( inputMode == 'R' )
				_els.editTitle.find("i").removeClass().addClass("fa fa-registered");
			else
				_els.editTitle.find("i").removeClass();
		},
		showEditor : function(obj){
			
			
			_els.areaEditor.show();
			
			_f.resizeMainArea(true);
			_f.showHideEditor(true);

			
			if ( _pm.callBackShow != null )
				_pm.callBackShow();
			
			
			
			if( obj == undefined || obj == null ) {
				_f.clearValues();
				_f.setTitleIcon('I');
			} else {

				if ( obj.shown !== undefined )
					obj.shown();
				
				_f.setValues(obj);
				if ( obj.title != undefined )
					_f.setTitle(obj.title);
				
				if ( obj.isInputMode != undefined && obj.isInputMode  )
					_f.setTitleIcon('I');
				else
					_f.setTitleIcon('U');
				
			}
			
			$aEvent.execWinResize();
		},
		hideEditor : function() {
			
			_f.resizeMainArea(false);
			_f.showHideEditor(false);

			if ( _pm.callBackHide != null )
				_pm.callBackHide();
			_els.areaEditor.hide();
			
			$aEvent.execWinResize();
		},
		showHideEditor : function( isShow ) {
			
			if ( isShow ) {
				_els.areaEditor.show();
				if( _dts.isBottom) {
					_els.areaEditor.css({
			            right  :"0px",
			            opacity:1,
			        } );
					_els.editBody.find(".form-group.multi-rows").addClass("bottom");
					
				} else {
					_els.areaEditor.css({
			            right  : 2,
			            opacity:1,
			        } );
					_els.editBody.find(".form-group.bottom").removeClass("bottom");
				}

			} else {

				if( _dts.isBottom) {
					_els.areaEditor.css({
			            right  :"0px",
			            opacity:0,
			        } );
				} else {
					_els.areaEditor.css({
			            right  : -(_els.areaMain.width()+10),
			            opacity:0,
			        } );
				}
			}
		},
		resizeMainArea : function( isEditorShow ) {
			
			var rightMargin = "0px";

			if ( isEditorShow && !_dts.isBottom ) {
				rightMargin = _els.areaEditor.width();
			}
			_els.areaMain.closest(".area-inner").css({
	            marginRight: rightMargin,
	        });
			
		},
		changeLocation : function( e ) {
			
			_f.showHideEditor(false);
			if( _els.areaEditor.hasClass("panel-right") ) {
				_els.areaEditor.removeClass("panel-right").addClass("panel-bottom");
			}else {
				_els.areaEditor.removeClass("panel-bottom").addClass("panel-right");
			}
			_f.setLocation();
			_f.showHideEditor(true);
			_f.resizeMainArea(true);
			$(this).blur();
			
			$aEvent.execWinResize();
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
		isValidFormData : function() {
			return $aValid.isValidBatchData(_els.editBody); 
		},
	};
			
	_this.initialize  = _f.init;
	_this.render      = _f.render;
	_this.setTitle    = _f.setTitle;
	_this.showEditor  = _f.showEditor;
	_this.hideEditor  = _f.hideEditor;
	_this.getMainBody = _f.getMainBody;
	_this.clearValues = _f.clearValues;
	_this.setValues   = _f.setValues;
	_this.getValues   = _f.getValues;
	_this.isValidFormData = _f.isValidFormData;
	
	return _this;
	
});