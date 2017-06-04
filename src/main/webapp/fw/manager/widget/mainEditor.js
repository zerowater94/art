define(['mngEvent', 'basicValid', 'wgHelper',
        'text!fw/manager/tmpl/mainEditor.html'
        ], function ($aEvent, $aValid, $aWg, _tmpl) {
	
	'use strict';
	
	var _f = {
		options : {
			title : null,
			direction    : "right", // 'right/bottom'
			isWritable   : false,
			titleIcon    : null,
			showToolbar  : true,
			buttons      : [],
			formList     : [],
			callBackHide : null,
			callBackShow : null
		},
		showOptions : {
			data : {},
			shown : null,
			isInputMode : false,
			title : null
		},
		els : {},
		msg : {
			close:"close"
		},
		init : function() {
			_f.els.areaMain   = $aWg.els.areaMain;
			_f.els.areaEditor = $aWg.els.areaEditor;
			
			_f.els.areaEditor.html(_.template(_tmpl));
			
			_f.els.mainContents = _f.els.areaMain.closest(".area-inner");
			_f.els.editPanel = _f.els.areaEditor.find(".panel");
			_f.els.editTitle = _f.els.editPanel.find(".panel-title");
			_f.els.editBody = _f.els.editPanel.find(".panel-body");
			_f.els.editToolbar = _f.els.editPanel.find(".panel-toolbar");
			_f.els.btnChgLocation = _f.els.editPanel.find(".location");
			_f.els.btnChgLocationImg = _f.els.btnChgLocation.find("i");
			$aEvent.addEvent(_f.els.editPanel.find(".close"), "click", _f.hideEditorAndMainArea);
			$aEvent.addEvent(_f.els.editPanel.find(".location"),"click",_f.changeLocation);
			
		},
		initMsg : function(msgObj) {
			$.extend(true, _f.msg, msgObj);
		},
		setTitle : function( title ) {
			_f.els.editTitle.html(title+"&nbsp;&nbsp;<i class='fa fa-plus-square'></i>");
		},
		setTitleIcon : function( inputMode ) {
			var titleIcon = _f.els.editTitle.find("i");
			titleIcon.removeClass();
			if ( inputMode == undefined ) {
				return;
			}
				
			if ( inputMode == 'I')
				titleIcon.addClass("fa fa-plus-square");
			else if ( inputMode == 'U' )
				titleIcon.addClass("fa fa-pencil-square");
			else if ( inputMode == 'R' )
				titleIcon.addClass("fa fa-registered");
			else
				titleIcon.removeClass();
		},
		setEditorCss : function( isBottom ) {
			
			if( isBottom ) {
				_f.els.areaEditor.removeClass("panel-right").addClass("panel-bottom");
				_f.els.areaMain.addClass("editor-bottom");
				_f.els.btnChgLocationImg.removeClass().addClass("fa fa-arrow-right");
			}else {
				_f.els.areaEditor.removeClass("panel-bottom").addClass("panel-right");
				_f.els.areaMain.removeClass("editor-bottom");
				_f.els.btnChgLocationImg.removeClass().addClass("fa fa-arrow-down");
			}
		},
		setClearEditBody : function() {
			_f.els.editPanel.addClass("panel-default");
			_f.els.editToolbar.empty();
			_f.els.editBody.empty();
		},
		addToolbarButton : function( buttons ) {
			
			for( var idx = 0 ; idx < buttons.length; idx++ ) {
				$aWg.button.render(_f.els.editToolbar, $.extend(true, {btnCls:"btn-default btn-sm"}, buttons[idx]));
			}
			$aWg.button.render(_f.els.editToolbar, $.extend(true, {btnCls:"btn-default btn-sm"}, {
				name : _f.msg.close,
				callbackFunc : _f.hideEditorAndMainArea
			}));
		},
		makeFormEditor : function( formList ) {
			var formObj ; 
			var formLength = formList.length;
			for( var idx =0 ; idx < formLength; idx++ ) {
				formObj = formList[idx];
				if ( !( formObj.type == 'textarea' || formObj.type == 'etc-info' || formObj.type == 'custom') ) {
					
					if ( formObj.formGroupCls == undefined ) {
						formObj.formGroupCls = "input-group multi-rows";
					} else {
						formObj.formGroupCls += " input-group multi-rows";
					}
				}
			}
			
			return $aWg.makeForm.execBatch(_f.els.editBody, formList);
		},
		setValues : function( formList, obj ) {
			$aWg.makeForm.setFormValues(_f.els.editBody, formList, obj);
		},
		isBottom : function( bottomBln ) {
			if( bottomBln == undefined )
				return _f.els.areaEditor.hasClass("panel-bottom");
			return bottomBln;
		},
		showEditorAndMainArea : function( bottomBln ) {
			
			bottomBln = _f.isBottom(bottomBln);
			var formGroupMultiRows = _f.els.editBody.find(".form-group.multi-rows");
			_f.els.areaEditor.show();
			
			if ( bottomBln ) {
				_f.changeAreaEditorStyle(0 , 1, 0 );
				formGroupMultiRows.addClass("bottom");
			} else {
				_f.changeAreaEditorStyle(2 , 1, _f.els.areaEditor.width() );
				formGroupMultiRows.removeClass("bottom");
			}
			$aWg.styleSwitcher.hide();
			$aEvent.execWinResize();
		},
		hideEditorAndMainArea : function( bottomBln ) {
			bottomBln = _f.isBottom(bottomBln);
			if ( bottomBln ) {
				_f.changeAreaEditorStyle(0 , 0, 0 );
			} else {
				_f.changeAreaEditorStyle( -(_f.els.areaMain.width()+10) , 0 , 0);
			}
			_f.els.areaEditor.hide();
			$aWg.styleSwitcher.show();
			$aEvent.execWinResize();
		},
		changeAreaEditorStyle : function( locRight, opacity, contentsMarinRight ) {
		
			_f.els.mainContents.css({
	            marginRight:contentsMarinRight,
	        });
			
			_f.els.areaEditor.css({
	            right   : locRight,
	            opacity : opacity,
	        } );
		},
		changeLocation : function( e ) {
			var isCurrBottom = _f.els.areaEditor.hasClass("panel-bottom") ;
			_f.hideEditorAndMainArea(isCurrBottom);
			_f.setEditorCss(!isCurrBottom);
			_f.showEditorAndMainArea(!isCurrBottom);
			$(this).blur();
			$aEvent.execWinResize();
		},
	};

	var mainEditor = function( param ) {
		
		var isBottom = (param.direction == 'bottom');
		var formObj ; 
		
		_f.setEditorCss(isBottom);
		_f.setTitle(param.title);
		_f.setTitleIcon('U');
		_f.setClearEditBody();
		if ( param.showToolbar && param.buttons != null) {
			_f.addToolbarButton(param.buttons);
		}
		
		formObj = _f.makeFormEditor(param.formList);
		_f.hideEditorAndMainArea(isBottom);
		
		return {
			showEditor : function ( paramObj ){
				
				if( !$aWg.styleSwitcher.isActive() )
					return;
				
				var showParam =$.extend(true, {}, _f.showOptions, paramObj );
				_f.showEditorAndMainArea();
				
				if ( showParam.shown != null )
					showParam.shown();
				
				if ( showParam.title != null )
					_f.setTitle(showParam.title);
				
				if ( showParam.isInputMode  ) {
					_f.setTitleIcon('I');
				} else {
					_f.setTitleIcon('U');
				}

				_f.setValues(param.formList, showParam.data);
			},
			hideEditor : function() {
				_f.hideEditorAndMainArea(isBottom);

				if ( param.callBackHide != null )
					param.callBackHide();
			},
			setTitle : _f.setTitle,
			getMainBody : function() {
				return _f.els.editBody;
			},
			clearValues : function() {
				_f.setValues(param.formList, {});
			},
			setValues   : function( obj ) {
				_f.setValues(param.formList, obj);
			},
			getValues   : function() {
				return $aWg.makeForm.getFormValues(_f.els.editBody, param.formList);
			},
			getForms    : function() {
				return formObj;
			},
			isValidFormData : function() {
				return $aValid.isValidBatchData(_f.els.editBody); 
			}
		};
	};
	
	
	return {
		initialize : _f.init,
		initMsg : _f.initMsg,
		render : function(paramObj ) {
			var param = $.extend(true, {}, _f.options, paramObj);
			var editor = new mainEditor(param );
			return editor;
		},
		hideEditor : function() {
			_f.hideEditorAndMainArea( false );
		},
	};
});